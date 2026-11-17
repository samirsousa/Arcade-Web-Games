import React, { useRef, useEffect } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { GameSettings, GameStats, GameState } from '../types/game';

interface CanvasGameEngineProps {
  settings: GameSettings;
  highScore: number;
  gameState: GameState;
  onStatsChange: (stats: GameStats) => void;
  onGameOver: () => void;
  engineRef?: React.MutableRefObject<GameEngine | null>;
}

export const CanvasGameEngine: React.FC<CanvasGameEngineProps> = ({
  settings,
  highScore,
  gameState,
  onStatsChange,
  onGameOver,
  engineRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const internalEngineRef = useRef<GameEngine | null>(null);

  // Inicialização do Motor do Jogo
  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new GameEngine(canvasRef.current, settings, highScore, {
      onStatsChange,
      onGameOver,
    });

    internalEngineRef.current = engine;
    if (engineRef) {
      engineRef.current = engine;
    }

    engine.start();

    // Redimensionamento responsivo
    const handleResize = () => {
      engine.handleResize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.stop();
      internalEngineRef.current = null;
      if (engineRef) {
        engineRef.current = null;
      }
    };
  }, []);

  // Sincronização de configurações
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setSettings(settings);
    }
  }, [settings]);

  // Sincronização de estado de jogo (Menu, Playing, Paused, GameOver)
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setState(gameState);
    }
  }, [gameState]);

  // Manipulador de clique no Canvas para soltar bloco
  const handleCanvasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameState === 'PLAYING' && internalEngineRef.current) {
      internalEngineRef.current.dropBlock();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full block cursor-pointer select-none touch-none"
    />
  );
};
