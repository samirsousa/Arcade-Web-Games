import { Block, SlicedPiece, Particle, FloatingText, GameStats, GameSettings, GameState } from '../types/game';
import { PHYSICS, calculateBlockSlice, updateParticles, updateSlicedPieces, updateFloatingTexts } from './physics';
import { GameRenderer } from './renderer';
import { soundManager } from '../sound/soundEngine';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private settings: GameSettings;

  // Dimensões Virtuais
  private width: number = 480;
  private height: number = 720;

  // Estado do Jogo
  private state: GameState = 'MENU';
  private animationFrameId: number | null = null;
  private lastTime: number = 0;

  // Câmera Vertical
  private cameraY: number = 0;
  private targetCameraY: number = 0;

  // Elementos do Jogo
  private baseY: number = 580;
  private currentFloor: number = 1;
  private stackedBlocks: Block[] = [];
  private movingBlock: Block | null = null;
  private slicedPieces: SlicedPiece[] = [];
  private particles: Particle[] = [];
  private floatingTexts: FloatingText[] = [];

  // Estatísticas
  private stats: GameStats = {
    score: 0,
    highScore: 0,
    height: 1,
    maxHeight: 1,
    combo: 0,
    maxCombo: 0,
    perfectDrops: 0,
    lives: 3,
    maxLives: 3,
    zone: 'Ground Zero (Subsolo Cyber)',
  };

  // Callbacks para sincronização com o React
  private onStatsChange?: (stats: GameStats) => void;
  private onGameOverCallback?: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    settings: GameSettings,
    highScore: number = 0,
    callbacks?: {
      onStatsChange?: (stats: GameStats) => void;
      onGameOver?: () => void;
    }
  ) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Não foi possível obter o contexto 2D do Canvas.');
    this.ctx = context;

    this.settings = settings;
    this.stats.highScore = highScore;

    if (callbacks) {
      this.onStatsChange = callbacks.onStatsChange;
      this.onGameOverCallback = callbacks.onGameOver;
    }

    this.handleResize();
    this.initGame();
  }

  public handleResize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  public setSettings(newSettings: GameSettings) {
    this.settings = newSettings;
    soundManager.setSoundEnabled(newSettings.soundEnabled);
    soundManager.setMusicEnabled(newSettings.musicEnabled);
    soundManager.setSfxVolume(newSettings.sfxVolume);
    soundManager.setMusicVolume(newSettings.musicVolume);
  }

  public setState(newState: GameState) {
    this.state = newState;
    if (newState === 'PLAYING') {
      soundManager.startMusic();
    } else if (newState === 'PAUSED' || newState === 'GAME_OVER') {
      soundManager.stopMusic();
    }
  }

  public initGame() {
    this.currentFloor = 1;
    this.slicedPieces = [];
    this.particles = [];
    this.floatingTexts = [];

    this.baseY = this.height - 140;

    // Bloco Fundacional Inicial (Base onde a pilha começa)
    const baseWidth = Math.min(PHYSICS.INITIAL_WIDTH, this.width * 0.65);
    const baseX = (this.width - baseWidth) / 2;
    const basePalette = GameRenderer.getBlockColor(0);

    const foundationBlock: Block = {
      id: 0,
      floor: 0,
      x: baseX,
      y: this.baseY - PHYSICS.BLOCK_HEIGHT,
      width: baseWidth,
      height: PHYSICS.BLOCK_HEIGHT,
      color: basePalette.color,
      glowColor: basePalette.glowColor,
      isMoving: false,
      speed: 0,
      direction: 1,
    };

    this.stackedBlocks = [foundationBlock];

    // Cria o primeiro bloco oscilante
    this.spawnMovingBlock();

    // Reset de Estatísticas
    this.stats = {
      ...this.stats,
      score: 0,
      height: 1,
      combo: 0,
      perfectDrops: 0,
      lives: 3,
      zone: GameRenderer.getZone(1).name,
    };

    this.cameraY = 0;
    this.targetCameraY = 0;

    if (this.onStatsChange) {
      this.onStatsChange({ ...this.stats });
    }
  }

  private spawnMovingBlock() {
    const prevBlock = this.stackedBlocks[this.stackedBlocks.length - 1];
    const floor = this.currentFloor;
    const palette = GameRenderer.getBlockColor(floor);

    // Velocidade progressiva com limite máximo
    const speed = Math.min(
      PHYSICS.MAX_SPEED,
      PHYSICS.BASE_SPEED + (floor - 1) * PHYSICS.SPEED_INCREMENT
    );

    // Alterna a direção inicial
    const direction = floor % 2 === 0 ? -1 : 1;
    const startX = direction === 1 ? -prevBlock.width : this.width;
    const blockY = prevBlock.y - PHYSICS.BLOCK_HEIGHT;

    this.movingBlock = {
      id: floor,
      floor,
      x: startX,
      y: blockY,
      width: prevBlock.width,
      height: PHYSICS.BLOCK_HEIGHT,
      color: palette.color,
      glowColor: palette.glowColor,
      isMoving: true,
      speed,
      direction,
    };

    // Ajusta a câmera alvo suavemente para acompanhar a ascensão da torre
    const idealScreenY = this.height * 0.58;
    this.targetCameraY = blockY - idealScreenY;
  }

  /**
   * Dispara a ação de soltar / empilhar o bloco
   */
  public dropBlock() {
    if (this.state !== 'PLAYING' || !this.movingBlock) return;

    const prevBlock = this.stackedBlocks[this.stackedBlocks.length - 1];
    const currentCombo = this.stats.combo;
    const palette = GameRenderer.getBlockColor(this.currentFloor);

    // Calcula colisão e corte
    const result = calculateBlockSlice(this.movingBlock, prevBlock, currentCombo, palette);

    if (result.isMiss) {
      // 1. ERRO TOTAL: O bloco não tocou em nada e caiu no abismo
      if (result.slicedPiece) {
        this.slicedPieces.push(result.slicedPiece);
      }
      this.movingBlock = null;

      soundManager.playLifeLost();

      // Perde 1 vida
      const remainingLives = this.stats.lives - 1;
      this.stats.lives = remainingLives;
      this.stats.combo = 0;

      // Dispara feedback tátil caso suportado
      if (this.settings.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate([80, 50, 80]);
      }

      if (remainingLives <= 0) {
        // Fim de jogo
        this.state = 'GAME_OVER';
        soundManager.playGameOver();
        if (this.onGameOverCallback) {
          this.onGameOverCallback();
        }
      } else {
        // Continua na mesma altura com um novo bloco oscilante
        setTimeout(() => {
          this.spawnMovingBlock();
        }, 300);
      }

      if (this.onStatsChange) {
        this.onStatsChange({ ...this.stats });
      }
      return;
    }

    // 2. ENCAIXE COM SUCESSO (Perfeito ou Parcial)
    if (result.placedBlock) {
      this.stackedBlocks.push(result.placedBlock);
    }
    if (result.slicedPiece) {
      this.slicedPieces.push(result.slicedPiece);
      soundManager.playSlice();
    }

    if (result.isPerfect) {
      // ENCAIXE PERFEITO!
      const combo = result.combo;
      this.stats.combo = combo;
      this.stats.perfectDrops++;
      if (combo > this.stats.maxCombo) {
        this.stats.maxCombo = combo;
      }

      soundManager.playPerfect(combo);

      // Pontuação especial por combo
      const comboBonus = combo * 250;
      const floorPoints = this.currentFloor * 100;
      const totalPoints = floorPoints + comboBonus;
      this.stats.score += totalPoints;

      // Partículas explosivas douradas/neon
      this.spawnSparks(result.placedBlock!.x, result.placedBlock!.y, result.placedBlock!.width, true);

      // Texto flutuante
      this.floatingTexts.push({
        id: Date.now(),
        text: `PERFECT! x${combo} (+${totalPoints})`,
        x: result.placedBlock!.x + result.placedBlock!.width / 2,
        y: result.placedBlock!.y - 12,
        color: '#fef08a',
        scale: 1,
        alpha: 1,
        life: 0.8,
      });

      if (this.settings.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(40);
      }
    } else {
      // ENCAIXE PARCIAL COM CORTE
      this.stats.combo = 0;
      const points = this.currentFloor * 50;
      this.stats.score += points;

      soundManager.playDrop();

      // Partículas no ponto do corte
      this.spawnSparks(result.placedBlock!.x, result.placedBlock!.y, result.placedBlock!.width, false);

      this.floatingTexts.push({
        id: Date.now(),
        text: `+${points}`,
        x: result.placedBlock!.x + result.placedBlock!.width / 2,
        y: result.placedBlock!.y - 8,
        color: palette.color,
        scale: 0.85,
        alpha: 1,
        life: 0.6,
      });

      if (this.settings.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
    }

    // Atualiza Recorde e Andar
    this.currentFloor++;
    this.stats.height = this.currentFloor;
    if (this.currentFloor > this.stats.maxHeight) {
      this.stats.maxHeight = this.currentFloor;
    }
    if (this.stats.score > this.stats.highScore) {
      this.stats.highScore = this.stats.score;
    }
    this.stats.zone = GameRenderer.getZone(this.currentFloor).name;

    if (this.onStatsChange) {
      this.onStatsChange({ ...this.stats });
    }

    // Gera o próximo bloco no topo da torre
    this.spawnMovingBlock();
  }

  private spawnSparks(x: number, y: number, width: number, isPerfect: boolean) {
    const count = isPerfect ? 24 : 12;
    const colors = isPerfect ? ['#fef08a', '#38bdf8', '#ffffff'] : ['#06b6d4', '#ec4899', '#ffffff'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (isPerfect ? 180 : 100) + 40;
      this.particles.push({
        x: x + Math.random() * width,
        y: y + Math.random() * PHYSICS.BLOCK_HEIGHT,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0.5,
        maxLife: 0.5,
      });
    }
  }

  // GAME LOOP
  public start() {
    if (this.animationFrameId !== null) return;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    soundManager.stopMusic();
  }

  private loop = (currentTime: number) => {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    // 1. Atualiza Movimento do Bloco Oscilante
    if (this.movingBlock && (this.state === 'PLAYING' || this.state === 'MENU')) {
      const mb = this.movingBlock;
      mb.x += mb.speed * mb.direction * dt;

      // Inverte direção ao bater nas bordas
      const leftLimit = -mb.width * 0.4;
      const rightLimit = this.width - mb.width * 0.6;

      if (mb.x <= leftLimit) {
        mb.x = leftLimit;
        mb.direction = 1;
      } else if (mb.x >= rightLimit) {
        mb.x = rightLimit;
        mb.direction = -1;
      }
    }

    // 2. Interpolação suave da câmera (Dampening)
    this.cameraY += (this.targetCameraY - this.cameraY) * 0.08;

    // 3. Atualiza Pedaços Cortados, Partículas e Textos
    this.slicedPieces = updateSlicedPieces(this.slicedPieces, dt, this.cameraY, this.height);
    this.particles = updateParticles(this.particles, dt);
    this.floatingTexts = updateFloatingTexts(this.floatingTexts, dt);
  }

  private render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Fundo Urbano Cyberpunk com Paralaxe Vertical
    GameRenderer.renderBackground(ctx, w, h, this.cameraY, this.currentFloor);

    // 2. Base Estrutural da Cidade
    GameRenderer.renderBase(ctx, w, this.baseY, this.cameraY);

    // 3. Laser Guia de Alinhamento
    if (this.movingBlock && this.stackedBlocks.length > 0) {
      const topPlaced = this.stackedBlocks[this.stackedBlocks.length - 1];
      GameRenderer.renderLaserGuide(ctx, this.movingBlock, topPlaced.y, this.cameraY);
    }

    // 4. Blocos Empilhados
    for (const block of this.stackedBlocks) {
      GameRenderer.renderBlock(ctx, block, this.cameraY);
    }

    // 5. Bloco Oscilante em Movimento
    if (this.movingBlock) {
      GameRenderer.renderBlock(ctx, this.movingBlock, this.cameraY);
    }

    // 6. Pedaços Cortados em Queda
    GameRenderer.renderSlicedPieces(ctx, this.slicedPieces, this.cameraY);

    // 7. Partículas Neon
    GameRenderer.renderParticles(ctx, this.particles, this.cameraY);

    // 8. Textos Flutuantes
    GameRenderer.renderFloatingTexts(ctx, this.floatingTexts, this.cameraY);
  }

  public getStats(): GameStats {
    return { ...this.stats };
  }
}
