import { useEffect, useState, useCallback } from 'react';
import { InputState } from '../types/game';

interface UseGameControlsProps {
  onPauseToggle?: () => void;
  onRestart?: () => void;
  enabled?: boolean;
}

export function useGameControls({
  onPauseToggle,
  onRestart,
  enabled = true,
}: UseGameControlsProps = {}) {
  const [input, setInput] = useState<InputState>({
    left: false,
    right: false,
    jump: false,
    boost: false,
    down: false,
  });

  // Atualização direta por touch UI
  const setTouchInput = useCallback((key: keyof InputState, value: boolean) => {
    setInput((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita rolagem da página com Espaço e Setas
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setInput((prev) => ({ ...prev, left: true }));
          break;
        case 'ArrowRight':
        case 'KeyD':
          setInput((prev) => ({ ...prev, right: true }));
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          setInput((prev) => ({ ...prev, jump: true }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyK':
        case 'KeyJ':
          setInput((prev) => ({ ...prev, boost: true }));
          break;
        case 'ArrowDown':
        case 'KeyS':
          setInput((prev) => ({ ...prev, down: true }));
          break;
        case 'KeyP':
        case 'Escape':
          if (onPauseToggle) onPauseToggle();
          break;
        case 'KeyR':
          if (onRestart) onRestart();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setInput((prev) => ({ ...prev, left: false }));
          break;
        case 'ArrowRight':
        case 'KeyD':
          setInput((prev) => ({ ...prev, right: false }));
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          setInput((prev) => ({ ...prev, jump: false }));
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyK':
        case 'KeyJ':
          setInput((prev) => ({ ...prev, boost: false }));
          break;
        case 'ArrowDown':
        case 'KeyS':
          setInput((prev) => ({ ...prev, down: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, onPauseToggle, onRestart]);

  return { input, setTouchInput };
}
