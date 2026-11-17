import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, GameStats, GameSettings, DEFAULT_SETTINGS } from './types/game';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CanvasGameEngine } from './components/CanvasGameEngine';
import { HUD } from './components/HUD';
import { MenuPrincipal } from './components/MenuPrincipal';
import { ModalGameOver } from './components/ModalGameOver';
import { ModalConfiguracoes } from './components/ModalConfiguracoes';
import { ModalComandos } from './components/ModalComandos';
import { TouchControls } from './components/TouchControls';
import { GameEngine } from './engine/GameEngine';
import { soundManager } from './sound/soundEngine';
import { Play, RotateCcw, Home } from 'lucide-react';

export const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isCommandsOpen, setIsCommandsOpen] = useState<boolean>(false);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  // Persistência com LocalStorage
  const [highScore, setHighScore] = useLocalStorage<number>('stacker_highscore', 0);
  const [maxHeight, setMaxHeight] = useLocalStorage<number>('stacker_maxheight', 1);
  const [settings, setSettings] = useLocalStorage<GameSettings>('stacker_settings', DEFAULT_SETTINGS);

  // Estatísticas em tempo real
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: highScore,
    height: 1,
    maxHeight: maxHeight,
    combo: 0,
    maxCombo: 0,
    perfectDrops: 0,
    lives: 3,
    maxLives: 3,
    zone: 'Ground Zero (Subsolo Cyber)',
  });

  const engineRef = useRef<GameEngine | null>(null);

  // Sincronização de Estatísticas
  const handleStatsChange = useCallback((newStats: GameStats) => {
    setStats(newStats);
    if (newStats.score > highScore) {
      setHighScore(newStats.score);
      setIsNewRecord(true);
    }
    if (newStats.height > maxHeight) {
      setMaxHeight(newStats.height);
    }
  }, [highScore, maxHeight, setHighScore, setMaxHeight]);

  // Game Over
  const handleGameOver = useCallback(() => {
    setGameState('GAME_OVER');
  }, []);

  // Iniciar Nova Partida
  const handleStartGame = useCallback(() => {
    setIsNewRecord(false);
    if (engineRef.current) {
      engineRef.current.initGame();
    }
    setGameState('PLAYING');
  }, []);

  // Reiniciar Partida
  const handleRestart = useCallback(() => {
    setIsNewRecord(false);
    if (engineRef.current) {
      engineRef.current.initGame();
    }
    setGameState('PLAYING');
  }, []);

  // Alternar Pausa
  const handlePauseToggle = useCallback(() => {
    setGameState((prev) => {
      if (prev === 'PLAYING') return 'PAUSED';
      if (prev === 'PAUSED') return 'PLAYING';
      return prev;
    });
  }, []);

  const handleGoToMenu = useCallback(() => {
    setGameState('MENU');
  }, []);

  // Ação de Soltar Bloco (Drop)
  const handleDrop = useCallback(() => {
    if (gameState === 'PLAYING' && engineRef.current) {
      engineRef.current.dropBlock();
    }
  }, [gameState]);

  // Controles Globais de Teclado (Espaço / Enter / P / Esc / R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora atalhos se algum modal de configuração/comandos estiver aberto
      if (isSettingsOpen || isCommandsOpen) {
        if (e.code === 'Escape') {
          setIsSettingsOpen(false);
          setIsCommandsOpen(false);
        }
        return;
      }

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (gameState === 'MENU') {
          soundManager.playGameStart();
          handleStartGame();
        } else if (gameState === 'PLAYING') {
          handleDrop();
        } else if (gameState === 'GAME_OVER') {
          handleRestart();
        }
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
          handlePauseToggle();
        }
      } else if (e.code === 'KeyR' && gameState === 'PLAYING') {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isSettingsOpen, isCommandsOpen, handleStartGame, handleDrop, handleRestart, handlePauseToggle]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b14] select-none touch-none">
      {/* 1. MOTOR DO JOGO NO CANVAS (SEMPRE ATIVO NO FUNDO) */}
      <CanvasGameEngine
        settings={settings}
        highScore={highScore}
        gameState={gameState}
        onStatsChange={handleStatsChange}
        onGameOver={handleGameOver}
        engineRef={engineRef}
      />

      {/* 2. EFEITO VINTAGE DE SCANLINES CYBERPUNK ARCADE */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-70" />

      {/* 3. TELA INICIAL (MENU PRINCIPAL SOBREPOSTO) */}
      {gameState === 'MENU' && (
        <MenuPrincipal
          highScore={highScore}
          maxHeight={maxHeight}
          onStartGame={handleStartGame}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenCommands={() => setIsCommandsOpen(true)}
        />
      )}

      {/* 4. HUD EM TEMPO REAL & CONTROLES TÁTEIS (EM PARTIDA OU PAUSA) */}
      {gameState !== 'MENU' && (
        <>
          <HUD
            stats={stats}
            onPause={handlePauseToggle}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          <TouchControls
            onDrop={handleDrop}
            visible={settings.showTouchControls && gameState === 'PLAYING'}
          />
        </>
      )}

      {/* 5. MODAL DE PAUSA */}
      {gameState === 'PAUSED' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-black font-display text-white tracking-wider mb-1">
              JOGO PAUSADO
            </h2>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Pressione P ou Esc no teclado para continuar
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePauseToggle}
                className="w-full py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black font-display text-sm tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>CONTINUAR CONSTRUÇÃO</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REINICIAR (R)</span>
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

      {/* 6. MODAL: FIM DE PARTIDA (GAME OVER) */}
      {gameState === 'GAME_OVER' && (
        <ModalGameOver
          stats={stats}
          isNewRecord={isNewRecord}
          onRestart={handleRestart}
          onGoToMenu={handleGoToMenu}
        />
      )}

      {/* 7. MODAL: CONFIGURAÇÕES */}
      {isSettingsOpen && (
        <ModalConfiguracoes
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* 8. MODAL: COMANDOS & MANUAL */}
      {isCommandsOpen && (
        <ModalComandos
          onClose={() => setIsCommandsOpen(false)}
        />
      )}
    </div>
  );
};
