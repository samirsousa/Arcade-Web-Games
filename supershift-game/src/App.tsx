import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GameState, GameStats, GameSettings, Pet, CharacterId } from './types/game';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGameControls } from './hooks/useGameControls';
import { CanvasGameEngine } from './components/CanvasGameEngine';
import { HUDInGame } from './components/HUDInGame';
import { MenuPrincipal } from './components/MenuPrincipal';
import { ModalGameOver } from './components/ModalGameOver';
import { PainelConfiguracoes } from './components/PainelConfiguracoes';
import { ModalGraficos } from './components/ModalGraficos';
import { ModalComandos } from './components/ModalComandos';
import { ModalSelecaoPersonagem } from './components/ModalSelecaoPersonagem';
import { TouchControls } from './components/TouchControls';
import { BannerTransicaoFase } from './components/BannerTransicaoFase';
import { GameEngine } from './engine/gameEngine';
import { soundManager } from './sound/soundEngine';
import { Play, RotateCcw, Home } from 'lucide-react';

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.5,
  musicVolume: 0.25,
  showTouchControls: true,
  cameraSmoothing: 8,
  particlesIntensity: 'high',
  crtScanlines: false,
  glowEffects: true,
  showFps: false,
};

export const App: React.FC = () => {
  // Estado Principal da Aplicação
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isGraphicsOpen, setIsGraphicsOpen] = useState<boolean>(false);
  const [isCommandsOpen, setIsCommandsOpen] = useState<boolean>(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState<boolean>(false);

  const [selectedCharacter, setSelectedCharacter] = useLocalStorage<CharacterId>('supershift_character', 'dk');

  // Migra suavemente qualquer sessão anterior com 'miguel' no localStorage para 'dk'
  useEffect(() => {
    if ((selectedCharacter as string) === 'miguel') {
      setSelectedCharacter('dk');
    }
  }, [selectedCharacter, setSelectedCharacter]);
  const [gravityInverted, setGravityInverted] = useState<boolean>(false);
  const [activePets, setActivePets] = useState<Pet[]>([]);
  const [fps, setFps] = useState<number>(60);
  const [levelTransition, setLevelTransition] = useState<{
    visible: boolean;
    level: number;
    name: string;
    difficulty: string;
  } | null>(null);

  // Persistência com LocalStorage
  const [highScore, setHighScore] = useLocalStorage<number>('supershift_highscore', 0);
  const [settings, setSettings] = useLocalStorage<GameSettings>('supershift_settings', DEFAULT_SETTINGS);

  // Estatísticas em tempo real
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: highScore,
    coins: 0,
    totalCoins: 0,
    portalsUsed: 0,
    speed: 0,
    currentLevel: 1,
    maxLevels: 1,
    timeElapsed: 0,
  });

  const engineRef = useRef<GameEngine | null>(null);

  // Monitor de FPS simples para exibição opcional
  useEffect(() => {
    if (!settings.showFps) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, [settings.showFps]);

  // Ações de fluxo do jogo
  const handleStartGame = () => {
    setActivePets([]);
    setGravityInverted(false);
    if (engineRef.current) {
      engineRef.current.restart();
    }
    setGameState('PLAYING');
  };

  const handlePauseToggle = useCallback(() => {
    setGameState((prev) => {
      if (prev === 'PLAYING') return 'PAUSED';
      if (prev === 'PAUSED') return 'PLAYING';
      return prev;
    });
  }, []);

  const handleRestart = useCallback(() => {
    setActivePets([]);
    setGravityInverted(false);
    if (engineRef.current) {
      engineRef.current.restart();
    }
    setGameState('PLAYING');
  }, []);

  const handleGoToMenu = () => {
    setGameState('MENU');
  };

  // Atalho do teclado para iniciar o jogo diretamente a partir do Menu (Espaço ou Enter)
  useEffect(() => {
    const handleMenuKey = (e: KeyboardEvent) => {
      if (gameState === 'MENU' && !isConfigOpen && !isGraphicsOpen && !isCommandsOpen) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          soundManager.playGameStart();
          handleStartGame();
        }
      }
    };
    window.addEventListener('keydown', handleMenuKey);
    return () => window.removeEventListener('keydown', handleMenuKey);
  }, [gameState, isConfigOpen, isGraphicsOpen, isCommandsOpen]);

  // Controles de Jogo (Teclado + Touch)
  const { input, setTouchInput } = useGameControls({
    onPauseToggle: handlePauseToggle,
    onRestart: handleRestart,
    enabled: gameState === 'PLAYING',
  });

  // Callbacks disparados pelo GameEngine
  const handleStatsChange = useCallback((newStats: GameStats) => {
    setStats(newStats);
    if (newStats.score > highScore) {
      setHighScore(newStats.score);
    }
  }, [highScore, setHighScore]);

  const handleGameOver = useCallback(() => {
    setGameState('GAME_OVER');
  }, []);

  const handleVictory = useCallback(() => {
    setGameState('VICTORY');
  }, []);

  const handleLevelAdvance = useCallback((level: number, name: string, difficulty: string) => {
    setLevelTransition({
      visible: true,
      level,
      name,
      difficulty,
    });
    setTimeout(() => {
      setLevelTransition(null);
    }, 3800);
  }, []);

  const handleGravityChange = useCallback((inverted: boolean) => {
    setGravityInverted(inverted);
  }, []);

  const handlePetAcquire = useCallback((newPet: Pet) => {
    setActivePets((prev) => [...prev, newPet]);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090d16] font-sans select-none">
      {/* 1. MOTOR DO JOGO (HTML5 CANVAS) - SEMPRE VISÍVEL E ATIVO AO FUNDO */}
      <div className="absolute inset-0 z-0">
        <CanvasGameEngine
          input={input}
          settings={settings}
          highScore={highScore}
          characterId={selectedCharacter}
          isPaused={gameState === 'PAUSED'}
          isMenuMode={gameState === 'MENU'}
          onStatsChange={handleStatsChange}
          onGameOver={handleGameOver}
          onVictory={handleVictory}
          onLevelAdvance={handleLevelAdvance}
          onGravityChange={handleGravityChange}
          onPetAcquire={handlePetAcquire}
          engineRef={engineRef}
        />
      </div>

      {/* BANNER DE TRANSIÇÃO CINEMATOGRÁFICA DE FASE */}
      {levelTransition && levelTransition.visible && (
        <BannerTransicaoFase
          levelNumber={levelTransition.level}
          levelName={levelTransition.name}
          difficultyTitle={levelTransition.difficulty}
        />
      )}

      {/* 2. OVERLAY CRT SCANLINES (OPCIONAL FLIPERAMA RETRÔ) */}
      {settings.crtScanlines && (
        <div className="absolute inset-0 z-20 pointer-events-none crt-overlay crt-vignette" />
      )}

      {/* 3. MONITOR DE FPS (OPCIONAL) */}
      {settings.showFps && (
        <div className="fixed top-2 left-2 z-50 pointer-events-none font-mono text-[11px] font-bold text-emerald-400 bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded shadow">
          {fps} FPS
        </div>
      )}

      {/* 4. TELA INICIAL CLÁSSICA (MENU SOBREPOSTO AO JOGO AO VIVO) */}
      {gameState === 'MENU' && (
        <MenuPrincipal
          highScore={highScore}
          selectedCharacter={selectedCharacter}
          onStartGame={handleStartGame}
          onOpenSettings={() => setIsConfigOpen(true)}
          onOpenGraphics={() => setIsGraphicsOpen(true)}
          onOpenCommands={() => setIsCommandsOpen(true)}
          onOpenCharacters={() => setIsCharactersOpen(true)}
        />
      )}

      {/* 5. HUD IN-GAME & CONTROLES TÁTEIS (QUANDO EM PARTIDA OU PAUSA) */}
      {gameState !== 'MENU' && (
        <>
          <HUDInGame
            stats={stats}
            player={engineRef.current ? engineRef.current.getPlayer() : null}
            pets={activePets}
            gravityInverted={gravityInverted}
            onPause={handlePauseToggle}
            onOpenSettings={() => setIsConfigOpen(true)}
          />

          <TouchControls
            onInput={setTouchInput}
            visible={settings.showTouchControls && gameState === 'PLAYING'}
          />
        </>
      )}

      {/* 6. MODAL: PAUSA */}
      {gameState === 'PAUSED' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-black font-sans text-white tracking-wider mb-2">
              JOGO PAUSADO
            </h2>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Pressione P ou Esc no teclado para continuar
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePauseToggle}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black font-mono text-sm tracking-wider hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>CONTINUAR</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REINICIAR FASE (R)</span>
              </button>

              <button
                type="button"
                onClick={handleGoToMenu}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>MENU PRINCIPAL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: GAME OVER / VITÓRIA */}
      {(gameState === 'GAME_OVER' || gameState === 'VICTORY') && (
        <ModalGameOver
          isVictory={gameState === 'VICTORY'}
          stats={stats}
          onRestart={handleRestart}
          onGoToMenu={handleGoToMenu}
        />
      )}

      {/* 8. MODAL: CONFIGURAÇÕES DE ÁUDIO */}
      {isConfigOpen && (
        <PainelConfiguracoes
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsConfigOpen(false)}
        />
      )}

      {/* 9. MODAL: CONFIGURAÇÕES DE GRÁFICOS */}
      {isGraphicsOpen && (
        <ModalGraficos
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsGraphicsOpen(false)}
        />
      )}

      {/* 10. MODAL: COMANDOS E MECÂNICAS */}
      {isCommandsOpen && (
        <ModalComandos
          onClose={() => setIsCommandsOpen(false)}
        />
      )}

      {/* 11. MODAL: SELEÇÃO DE HERÓIS CÓSMICOS */}
      {isCharactersOpen && (
        <ModalSelecaoPersonagem
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
          onClose={() => setIsCharactersOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
