import {
  Player,
  Pet,
  InputState,
  GameStats,
  GameSettings,
  PetType,
  CharacterId,
} from '../types/game';
import { updatePlayerPhysics, checkAABB, Rect } from './physics';
import { ParticleSystem } from './particles';
import { GameRenderer } from './renderer';
import { LevelData, getLevel, createInitialPlayer } from './levelData';
import { soundManager } from '../sound/soundEngine';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private isMenuMode: boolean = false;

  // Entidades e Nível
  private level: LevelData;
  private player: Player;
  private pets: Pet[] = [];
  private particles: ParticleSystem;

  // Ponto de Respawn Seguro (evita loop de queda no abismo)
  private lastSafePosition: { x: number; y: number; gravityInverted: boolean } = {
    x: 100,
    y: 480,
    gravityInverted: false,
  };

  // Câmera
  public cameraX: number = 0;
  public cameraY: number = 0;

  // Input
  private input: InputState = {
    left: false,
    right: false,
    jump: false,
    boost: false,
    down: false,
  };

  // Estatísticas e Configurações
  private stats: GameStats = {
    score: 0,
    highScore: 0,
    coins: 0,
    totalCoins: 0,
    portalsUsed: 0,
    speed: 0,
    currentLevel: 1,
    maxLevels: 6,
    timeElapsed: 0,
  };

  private settings: GameSettings;

  // Callbacks para sincronizar com React
  private onStatsChange?: (stats: GameStats) => void;
  private onGameOver?: () => void;
  private onVictory?: () => void;
  private onLevelAdvance?: (level: number, name: string, difficulty: string) => void;
  private onGravityChange?: (inverted: boolean) => void;
  private onPetAcquire?: (pet: Pet) => void;

  private selectedCharacter: CharacterId = 'dk';

  constructor(
    canvas: HTMLCanvasElement,
    settings: GameSettings,
    highScore: number = 0,
    characterId: CharacterId = 'dk',
    callbacks?: {
      onStatsChange?: (stats: GameStats) => void;
      onGameOver?: () => void;
      onVictory?: () => void;
      onLevelAdvance?: (level: number, name: string, difficulty: string) => void;
      onGravityChange?: (inverted: boolean) => void;
      onPetAcquire?: (pet: Pet) => void;
    }
  ) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Não foi possível obter o contexto 2D do Canvas.');
    this.ctx = context;

    this.settings = settings;
    this.stats.highScore = highScore;
    this.selectedCharacter = characterId;
    this.level = getLevel(1);
    this.player = createInitialPlayer(this.level.spawnPoint.x, this.level.spawnPoint.y, characterId);
    this.lastSafePosition = {
      x: this.level.spawnPoint.x,
      y: this.level.spawnPoint.y,
      gravityInverted: false,
    };
    this.particles = new ParticleSystem(400);

    if (callbacks) {
      this.onStatsChange = callbacks.onStatsChange;
      this.onGameOver = callbacks.onGameOver;
      this.onVictory = callbacks.onVictory;
      this.onLevelAdvance = callbacks.onLevelAdvance;
      this.onGravityChange = callbacks.onGravityChange;
      this.onPetAcquire = callbacks.onPetAcquire;
    }

    this.centerCameraImmediate();
  }

  public setCharacter(charId: CharacterId) {
    this.selectedCharacter = charId;
    this.player.characterId = charId;
  }

  public setMenuMode(val: boolean) {
    this.isMenuMode = val;
    if (val) {
      // No menu, garante que a música procedural toque relaxadamente se estiver habilitada
      soundManager.startMusic();
    }
  }

  public setInput(input: InputState) {
    this.input = input;
  }

  public setSettings(settings: GameSettings) {
    this.settings = settings;
    soundManager.setSoundEnabled(settings.soundEnabled);
    soundManager.setMusicEnabled(settings.musicEnabled);
    soundManager.setSfxVolume(settings.sfxVolume);
    soundManager.setMusicVolume(settings.musicVolume);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    soundManager.startMusic();
    this.loop(this.lastTime);
  }

  public pause() {
    this.isPaused = true;
    soundManager.stopMusic();
  }

  public resume() {
    if (!this.isRunning) {
      this.start();
      return;
    }
    this.isPaused = false;
    this.lastTime = performance.now();
    soundManager.startMusic();
    this.loop(this.lastTime);
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    soundManager.stopMusic();
  }

  public restart() {
    this.stats.currentLevel = 1;
    this.stats.score = 0;
    this.stats.coins = 0;
    this.stats.portalsUsed = 0;
    this.stats.timeElapsed = 0;
    this.stats.speed = 0;
    this.pets = [];
    this.particles.clear();
    this.loadLevel(1);
    this.resume();
  }

  public loadLevel(levelNumber: number) {
    this.stats.currentLevel = levelNumber;
    this.level = getLevel(levelNumber);
    this.player = createInitialPlayer(this.level.spawnPoint.x, this.level.spawnPoint.y, this.selectedCharacter);
    this.player.gravityInverted = false;
    this.lastSafePosition = {
      x: this.level.spawnPoint.x,
      y: this.level.spawnPoint.y,
      gravityInverted: false,
    };
    this.centerCameraImmediate();
    this.notifyStats();
    if (this.onGravityChange) {
      this.onGravityChange(false);
    }
  }

  private centerCameraImmediate() {
    this.cameraX = Math.max(0, Math.min(this.player.x - this.canvas.width * 0.35, this.level.worldWidth - this.canvas.width));
    this.cameraY = Math.max(-50, Math.min(this.player.y - this.canvas.height * 0.5, this.level.worldHeight - this.canvas.height + 50));
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning || this.isPaused) return;

    // Delta Time robusto e estável a 60 FPS
    let dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Clamping para evitar teletransporte / spiral of death
    if (dt > 0.05) dt = 0.05;
    if (dt < 0.001) dt = 0.001;

    this.update(dt);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    if (this.isMenuMode) {
      // No modo Menu: Cenário, moedas e herói continuam ativos e vivos ao fundo
      this.player.vx = 0;
      this.player.vy = 0;
      this.player.animTimer += dt;
      if (this.player.animTimer > 0.15) {
        this.player.animTimer = 0;
        this.player.animFrame = (this.player.animFrame + 1) % 8;
      }
      this.updateCamera(dt);
      this.particles.update(dt);
      return;
    }

    this.stats.timeElapsed += dt;

    // 1. Atualiza Física do Jogador
    const hasFlyPet = this.pets.some((p) => p.type === 'FLY');
    const { hitBlock, jumped, doubleJumped } = updatePlayerPhysics(
      this.player,
      this.input,
      dt,
      this.level.platforms,
      this.level.blocks,
      hasFlyPet
    );

    // 1.1 Atualiza ponto de respawn seguro sempre que estiver firmemente estabilizado
    if (this.player.isGrounded && Math.abs(this.player.vy) < 25) {
      const footY = this.player.gravityInverted ? this.player.y : this.player.y + this.player.height;
      if (footY > 60 && footY < this.level.worldHeight - 60) {
        this.lastSafePosition = {
          x: this.player.x,
          y: this.player.y,
          gravityInverted: this.player.gravityInverted,
        };
      }
    }

    // Efeitos Sonoros & Partículas de Pulo
    if (jumped) {
      soundManager.playJump();
      this.particles.emitJumpDust(
        this.player.x + this.player.width / 2,
        this.player.gravityInverted ? this.player.y : this.player.y + this.player.height,
        this.player.gravityInverted
      );
    } else if (doubleJumped) {
      soundManager.playDoubleJump();
      this.particles.emitPortalBurst(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
    }

    // Efeito de rastro Sonic Boost
    if (this.player.isBoosting || Math.abs(this.player.vx) > 500) {
      this.particles.emitBoostTrail(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height / 2,
        this.player.facing
      );
    }

    // 2. Colisão com Blocos Misteriosos "?" (Mario Style & Itens Clássicos)
    if (hitBlock) {
      hitBlock.bumpOffset = 10;
      hitBlock.hitsLeft--;
      hitBlock.spent = true;
      soundManager.playBlockHit();
      this.particles.emitBlockHit(hitBlock.x + hitBlock.width / 2, hitBlock.y + hitBlock.height / 2);

      // Trait do Mario: pontuação em dobro ao bater em blocos
      const marioBonus = this.player.characterId === 'mario' ? 200 : 0;
      if (marioBonus > 0) {
        this.stats.score += marioBonus;
      }

      if (hitBlock.contains === 'coin') {
        this.collectCoinDirect(hitBlock.x + 10, hitBlock.y - 20, 200);
      } else if (hitBlock.contains === 'mushroom') {
        // Cogumelo de Vida (Mario Style 🍄)
        this.player.health = Math.min(this.player.maxHealth, this.player.health + 1);
        this.stats.score += 300;
        soundManager.playPowerUp();
        this.particles.emitPortalBurst(hitBlock.x + 10, hitBlock.y - 20);
      } else if (hitBlock.contains === 'star') {
        // Estrela de Invencibilidade Cósmica (Starman ⭐)
        this.player.starPowerTime = 7.0;
        this.player.invulnerableTime = 7.0;
        this.stats.score += 500;
        soundManager.playPowerUp();
        this.particles.emitCoinSparkles(hitBlock.x + 10, hitBlock.y - 20);
      } else if (hitBlock.contains === 'dragon_ball') {
        // Esfera do Dragão (Dragon Ball 🔮): +1000 pts e onda de choque que elimina drones
        this.stats.score += 1000;
        soundManager.playDragonBall();
        this.particles.emitPortalBurst(hitBlock.x + 20, hitBlock.y + 20);
        // Elimina inimigos no raio de visão
        for (const enemy of this.level.enemies) {
          if (enemy.alive && Math.abs(enemy.x - this.player.x) < 800) {
            enemy.alive = false;
            this.stats.score += 300;
            this.particles.emitPortalBurst(enemy.x, enemy.y);
          }
        }
      } else if (hitBlock.contains === 'triforce') {
        // Triforce da Coragem (Zelda 🔺): Salto ampliado e escudo
        this.player.jumpBoostTime = 8.0;
        this.player.invulnerableTime = 3.0;
        this.stats.score += 600;
        soundManager.playPowerUp();
        this.particles.emitCoinSparkles(hitBlock.x + 10, hitBlock.y - 20);
      } else if (hitBlock.contains === 'ring') {
        // Anel Especial (Sonic 💍): +500 pts e recarga de Boost
        this.stats.score += 500;
        this.player.isBoosting = true;
        this.player.boostTimeLeft = 0.8;
        soundManager.playRing();
        this.particles.emitBoostTrail(hitBlock.x, hitBlock.y, this.player.facing);
      } else if (hitBlock.contains.startsWith('pet_')) {
        const petType = hitBlock.contains.replace('pet_', '').toUpperCase() as PetType;
        this.addPet(petType, hitBlock.x, hitBlock.y);
      }
    }

    // Resfriamento do bump dos blocos
    for (const b of this.level.blocks) {
      if (b.bumpOffset > 0) {
        b.bumpOffset = Math.max(0, b.bumpOffset - dt * 40);
      }
    }

    // 3. Mecânica Pokémon: Atualização dos Pocket Pets que seguem o herói
    this.updatePets(dt);

    // 4. Boost Pads (Sonic Style)
    this.updateBoostPads(dt);

    // 5. Portais de Gravidade Zero (Twist Central Antigravity)
    this.updatePortals(dt);

    // 6. Coleta de Moedas (Mario Style) + Efeito do Pet Magnético
    this.updateCoins(dt);

    // 7. Inimigos / Drones Glitch
    this.updateEnemies(dt);

    // 8. Partículas
    this.particles.update(dt);

    // 9. Câmera com interpolação suave (Lerp)
    this.updateCamera(dt);

    // 10. Verificação de Queda no Abismo Cósmico
    this.checkAbyssFall();

    // 11. Verificação de Chegada ao Goal / Conclusão de Fase
    if (this.player.x >= this.level.goalX) {
      this.handleGoalReached();
    }

    // Atualiza estatísticas para a HUD
    this.stats.speed = Math.round(Math.abs(this.player.vx));
    this.notifyStats();
  }

  private updatePets(dt: number) {
    const hasMagnetPet = this.pets.some((p) => p.type === 'MAGNET');
    const isAsh = this.player.characterId === 'ash';

    this.pets.forEach((pet, index) => {
      // Posiciona os pets em formação orbital suave ao redor do Jogador
      const angleOffset = (index * (Math.PI * 2)) / Math.max(1, this.pets.length);
      const targetX = this.player.x + this.player.width / 2 - (this.player.facing === 'right' ? 35 : -35) + Math.cos(Date.now() * 0.003 + angleOffset) * 12;
      const targetY = this.player.y + (this.player.gravityInverted ? 30 : -20) + Math.sin(Date.now() * 0.004 + angleOffset) * 10;

      // Movimento de interpolação elástica
      pet.x += (targetX - pet.x) * dt * 8;
      pet.y += (targetY - pet.y) * dt * 8;

      // Efeito de rastro
      this.particles.emitPetTrail(pet.x, pet.y, pet.glowColor);
    });

    // Se tiver Pet Magnético ou se o herói for o Ash (Pokémon), atrai moedas
    if (hasMagnetPet || isAsh) {
      const magnetRadius = hasMagnetPet && isAsh ? 360 : (hasMagnetPet ? 240 : 160);
      const pullSpeed = isAsh ? 520 : 400;
      for (const coin of this.level.coins) {
        if (!coin.collected) {
          const dx = (this.player.x + this.player.width / 2) - coin.x;
          const dy = (this.player.y + this.player.height / 2) - coin.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < magnetRadius) {
            coin.x += (dx / dist) * pullSpeed * dt;
            coin.y += (dy / dist) * pullSpeed * dt;
          }
        }
      }
    }
  }

  private addPet(type: PetType, x: number, y: number) {
    // Evita duplicatas do mesmo tipo de pet
    if (this.pets.some((p) => p.type === type)) {
      this.collectCoinDirect(x, y, 300);
      return;
    }

    let name = 'Aero';
    let color = '#38bdf8';
    let glowColor = '#0ea5e9';
    let desc = 'Concede Pulo Duplo no Ar!';

    if (type === 'FIRE') {
      name = 'Sparky';
      color = '#f97316';
      glowColor = '#ea580c';
      desc = 'Aura Ígnea: Destrói Inimigos em Contato!';
    } else if (type === 'MAGNET') {
      name = 'Volt';
      color = '#fbbf24';
      glowColor = '#d97706';
      desc = 'Campo Magnético: Atrai Moedas Próximas!';
    }

    const newPet: Pet = {
      id: `pet-${type.toLowerCase()}-${Date.now()}`,
      type,
      name,
      color,
      glowColor,
      x,
      y,
      targetX: x,
      targetY: y,
      size: 11,
      angle: 0,
      description: desc,
    };

    this.pets.push(newPet);
    soundManager.playPetGet();
    this.particles.emitPortalBurst(x, y);

    if (this.onPetAcquire) {
      this.onPetAcquire(newPet);
    }
  }

  private updateBoostPads(dt: number) {
    const playerRect: Rect = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    };

    for (const pad of this.level.boostPads) {
      if (pad.cooldown > 0) {
        pad.cooldown -= dt;
      }

      const padRect: Rect = {
        x: pad.x,
        y: pad.y,
        width: pad.width,
        height: pad.height,
      };

      if (pad.cooldown <= 0 && checkAABB(playerRect, padRect)) {
        // Ativação do Boost Pad estilo Sonic
        this.player.isBoosting = true;
        this.player.boostTimeLeft = 0.8;
        this.player.vx = pad.power;
        this.player.facing = 'right';
        pad.cooldown = 0.5;

        soundManager.playBoost();
        this.particles.emitBoostTrail(pad.x + pad.width / 2, pad.y, 'right');
      }
    }
  }

  private updatePortals(dt: number) {
    const playerRect: Rect = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    };

    for (const portal of this.level.portals) {
      if (portal.cooldown > 0) {
        portal.cooldown -= dt;
      }

      const portalRect: Rect = {
        x: portal.x,
        y: portal.y,
        width: portal.width,
        height: portal.height,
      };

      if (portal.cooldown <= 0 && checkAABB(playerRect, portalRect)) {
        // Inverte a gravidade!
        this.player.gravityInverted = portal.targetGravityInverted;
        portal.cooldown = 1.0;
        this.stats.portalsUsed++;

        // Dá um impulso vertical para descolar da superfície anterior
        this.player.vy = this.player.gravityInverted ? -250 : 250;

        soundManager.playGravityFlip();
        this.particles.emitPortalBurst(portal.x + portal.width / 2, portal.y + portal.height / 2);

        if (this.onGravityChange) {
          this.onGravityChange(this.player.gravityInverted);
        }
      }
    }
  }

  private updateCoins(_dt: number) {
    const playerCenter = {
      x: this.player.x + this.player.width / 2,
      y: this.player.y + this.player.height / 2,
    };

    for (const coin of this.level.coins) {
      if (!coin.collected) {
        const dx = playerCenter.x - coin.x;
        const dy = playerCenter.y - coin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Raio de coleta
        if (dist < coin.radius + this.player.width * 0.45) {
          coin.collected = true;
          this.stats.coins++;
          this.stats.totalCoins++;
          this.stats.score += coin.value;
          if (this.stats.score > this.stats.highScore) {
            this.stats.highScore = this.stats.score;
          }
          soundManager.playCoin();
          this.particles.emitCoinSparkles(coin.x, coin.y);
        }
      }
    }
  }

  private collectCoinDirect(x: number, y: number, value: number) {
    this.stats.coins++;
    this.stats.totalCoins++;
    this.stats.score += value;
    if (this.stats.score > this.stats.highScore) {
      this.stats.highScore = this.stats.score;
    }
    soundManager.playCoin();
    this.particles.emitCoinSparkles(x, y);
  }

  private updateEnemies(dt: number) {
    const hasFirePet = this.pets.some((p) => p.type === 'FIRE');
    const playerRect: Rect = {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    };

    for (const enemy of this.level.enemies) {
      if (!enemy.alive) continue;

      // Patrulha horizontal
      enemy.x += enemy.vx * dt;
      if (enemy.x > enemy.patrolMaxX) {
        enemy.x = enemy.patrolMaxX;
        enemy.vx = -Math.abs(enemy.vx);
      } else if (enemy.x < enemy.patrolMinX) {
        enemy.x = enemy.patrolMinX;
        enemy.vx = Math.abs(enemy.vx);
      }

      const enemyRect: Rect = {
        x: enemy.x,
        y: enemy.y,
        width: enemy.width,
        height: enemy.height,
      };

      // Colisão com Jogador
      if (checkAABB(playerRect, enemyRect)) {
        // Se estiver no Boost, tiver o Pet de Fogo, invencibilidade estelar OU for Goku com Ki, elimina o inimigo
        const isInvincible = this.player.starPowerTime > 0;
        const isGokuKi = this.player.characterId === 'goku' && (this.player.isBoosting || Math.abs(this.player.vx) > 350);

        if (this.player.isBoosting || hasFirePet || isInvincible || isGokuKi) {
          enemy.alive = false;
          this.stats.score += 500;
          soundManager.playBlockHit();
          this.particles.emitPortalBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        } else if (this.player.invulnerableTime <= 0) {
          // Toma dano
          this.player.health--;
          this.player.invulnerableTime = 1.5;
          soundManager.playHurt();

          // Recuo (Knockback)
          this.player.vx = this.player.facing === 'right' ? -250 : 250;
          this.player.vy = this.player.gravityInverted ? 200 : -200;

          if (this.player.health <= 0) {
            this.handleGameOver();
          }
        }
      }
    }
  }

  private checkAbyssFall() {
    // Queda no abismo inferior em gravidade normal
    if (!this.player.gravityInverted && this.player.y > this.level.worldHeight + 100) {
      this.handlePlayerDeath();
    }
    // Queda no abismo superior (céu aberto) em gravidade invertida
    else if (this.player.gravityInverted && this.player.y < -150) {
      this.handlePlayerDeath();
    }
  }

  private handlePlayerDeath() {
    this.player.health--;
    soundManager.playHurt();
    if (this.player.health <= 0) {
      this.handleGameOver();
    } else {
      // Respawn 100% seguro na última superfície estável registrada (nunca mais cai no buraco)
      this.player.x = this.lastSafePosition.x;
      this.player.y = this.lastSafePosition.y;
      this.player.gravityInverted = this.lastSafePosition.gravityInverted;
      this.player.vx = 0;
      this.player.vy = 0;
      this.player.invulnerableTime = 2.5;

      if (this.onGravityChange) {
        this.onGravityChange(this.player.gravityInverted);
      }

      this.centerCameraImmediate();
      this.particles.emitPortalBurst(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
    }
  }

  private handleGameOver() {
    this.stop();
    soundManager.playGameOver();
    if (this.onGameOver) {
      this.onGameOver();
    }
  }

  private handleGoalReached() {
    if (this.stats.currentLevel < this.stats.maxLevels) {
      const nextLevel = this.stats.currentLevel + 1;
      this.stats.score += 1500;
      if (this.stats.score > this.stats.highScore) {
        this.stats.highScore = this.stats.score;
      }
      soundManager.playVictory();
      this.particles.emitPortalBurst(this.player.x, this.player.y);
      this.loadLevel(nextLevel);

      if (this.onLevelAdvance) {
        this.onLevelAdvance(nextLevel, this.level.name, this.level.difficultyTitle);
      }
    } else {
      // Concluiu a fase final (Fase 6)!
      this.handleVictory();
    }
  }

  private handleVictory() {
    this.stop();
    this.stats.score += 5000;
    if (this.stats.score > this.stats.highScore) {
      this.stats.highScore = this.stats.score;
    }
    soundManager.playVictory();
    if (this.onVictory) {
      this.onVictory();
    }
  }

  private updateCamera(dt: number) {
    const targetX = this.player.x - this.canvas.width * 0.35;
    const targetY = this.player.y - this.canvas.height * 0.5;

    // Interpolação suave (Lerp)
    const smoothing = this.settings.cameraSmoothing || 8;
    this.cameraX += (targetX - this.cameraX) * dt * smoothing;
    this.cameraY += (targetY - this.cameraY) * dt * smoothing;

    // Limites da câmera no mundo
    this.cameraX = Math.max(0, Math.min(this.cameraX, this.level.worldWidth - this.canvas.width));
    this.cameraY = Math.max(-50, Math.min(this.cameraY, this.level.worldHeight - this.canvas.height + 50));
  }

  private render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // 1. Fundo Cósmico & Grade Sci-Fi com Atmosfera Única da Fase
    GameRenderer.renderBackground(this.ctx, width, height, this.cameraX, this.cameraY, this.stats.currentLevel);

    // 2. Plataformas
    for (const plat of this.level.platforms) {
      GameRenderer.renderPlatform(this.ctx, plat, this.cameraX, this.cameraY);
    }

    // 3. Blocos Misteriosos "?"
    for (const block of this.level.blocks) {
      GameRenderer.renderMysteryBlock(this.ctx, block, this.cameraX, this.cameraY);
    }

    // 4. Boost Pads
    for (const pad of this.level.boostPads) {
      GameRenderer.renderBoostPad(this.ctx, pad, this.cameraX, this.cameraY);
    }

    // 5. Portais de Gravidade Zero
    for (const portal of this.level.portals) {
      GameRenderer.renderGravityPortal(this.ctx, portal, this.cameraX, this.cameraY);
    }

    // 6. Moedas
    for (const coin of this.level.coins) {
      GameRenderer.renderCoin(this.ctx, coin, this.cameraX, this.cameraY);
    }

    // 7. Inimigos
    for (const enemy of this.level.enemies) {
      GameRenderer.renderEnemy(this.ctx, enemy, this.cameraX, this.cameraY);
    }

    // 8. Partículas
    this.particles.draw(this.ctx, this.cameraX, this.cameraY);

    // 9. Donkey Kong e Heróis Cósmicos (Personagem Principal)
    GameRenderer.renderPlayer(this.ctx, this.player, this.cameraX, this.cameraY);

    // 10. Pocket Pets Flutuantes
    for (const pet of this.pets) {
      GameRenderer.renderPet(this.ctx, pet, this.cameraX, this.cameraY);
    }

    // 11. Linha do Goal (Portal de Vitória Cósmico)
    this.renderGoalPortal();
  }

  private renderGoalPortal() {
    const goalX = this.level.goalX - this.cameraX;
    const goalY = 400 - this.cameraY;

    this.ctx.save();
    this.ctx.translate(goalX, goalY);

    // Glow verde esmeralda de vitória
    this.ctx.shadowColor = '#10b981';
    this.ctx.shadowBlur = 30;

    // Grande portal circular de término
    this.ctx.strokeStyle = '#10b981';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 50, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.strokeStyle = '#fbbf24';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 35, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 14px "JetBrains Mono", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('PORTAL META', 0, 0);

    this.ctx.restore();
  }

  private notifyStats() {
    if (this.onStatsChange) {
      this.onStatsChange({ ...this.stats });
    }
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getPets(): Pet[] {
    return this.pets;
  }
}
