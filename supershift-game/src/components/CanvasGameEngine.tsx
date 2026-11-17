import React, { useRef, useEffect } from 'react';
import { GameEngine } from '../engine/gameEngine';
import { InputState, GameSettings, GameStats, Pet, CharacterId } from '../types/game';

interface CanvasGameEngineProps {
  input: InputState;
  settings: GameSettings;
  highScore: number;
  characterId?: CharacterId;
  isPaused: boolean;
  isMenuMode?: boolean;
  onStatsChange: (stats: GameStats) => void;
  onGameOver: () => void;
  onVictory: () => void;
  onLevelAdvance?: (level: number, name: string, difficulty: string) => void;
  onGravityChange: (inverted: boolean) => void;
  onPetAcquire: (pet: Pet) => void;
  engineRef?: React.MutableRefObject<GameEngine | null>;
}

export const CanvasGameEngine: React.FC<CanvasGameEngineProps> = ({
  input,
  settings,
  highScore,
  characterId = 'dk',
  isPaused,
  isMenuMode = false,
  onStatsChange,
  onGameOver,
  onVictory,
  onLevelAdvance,
  onGravityChange,
  onPetAcquire,
  engineRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const internalEngineRef = useRef<GameEngine | null>(null);

  // Inicialização do GameEngine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensões nativas de alta resolução
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap em 2x para alta performance
      const displayWidth = parent.clientWidth;
      const displayHeight = parent.clientHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();

    const engine = new GameEngine(canvas, settings, highScore, characterId, {
      onStatsChange,
      onGameOver,
      onVictory,
      onLevelAdvance,
      onGravityChange,
      onPetAcquire,
    });

    internalEngineRef.current = engine;
    if (engineRef) {
      engineRef.current = engine;
    }

    engine.start();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      engine.stop();
      internalEngineRef.current = null;
      if (engineRef) {
        engineRef.current = null;
      }
    };
  }, []); // Executa na montagem

  // Sincroniza inputs em tempo real
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setInput(input);
    }
  }, [input]);

  // Sincroniza configurações em tempo real
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setSettings(settings);
    }
  }, [settings]);

  // Sincroniza personagem selecionado
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setCharacter(characterId);
    }
  }, [characterId]);

  // Sincroniza modo menu / jogo ativo
  useEffect(() => {
    if (internalEngineRef.current) {
      internalEngineRef.current.setMenuMode(isMenuMode);
    }
  }, [isMenuMode]);

  // Sincroniza pausa
  useEffect(() => {
    if (!internalEngineRef.current) return;
    if (isPaused) {
      internalEngineRef.current.pause();
    } else {
      internalEngineRef.current.resume();
    }
  }, [isPaused]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#090d16] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-crosshair"
      />
    </div>
  );
};
