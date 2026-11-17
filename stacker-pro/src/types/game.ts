export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export interface Block {
  id: number;
  floor: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  glowColor: string;
  isMoving: boolean;
  speed: number;
  direction: 1 | -1;
  isPerfect?: boolean;
}

export interface SlicedPiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  color: string;
  alpha: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  scale: number;
  alpha: number;
  life: number;
}

export type UrbanZoneName = 
  | 'Ground Zero (Subsolo Cyber)'
  | 'Neon Midtown (Avenida Neon)'
  | 'High-Tech District (Centro Financeiro)'
  | 'Skyline Spires (Arranta-Céus)'
  | 'Stratosphere Apex (Camada de Nuvens)'
  | 'Orbital Elevator (Estação Espacial)';

export interface UrbanZone {
  minFloor: number;
  name: UrbanZoneName;
  skyColorTop: string;
  skyColorBottom: string;
  gridColor: string;
  buildingTheme: string;
  accentColor: string;
}

export interface GameStats {
  score: number;
  highScore: number;
  height: number;        // Andar atual (ex: 42)
  maxHeight: number;     // Maior andar alcançado
  combo: number;         // Combo atual de Perfects seguidos
  maxCombo: number;
  perfectDrops: number;  // Quantidade de encaixes perfeitos
  lives: number;         // Vidas restantes (padrão: 3)
  maxLives: number;
  zone: UrbanZoneName;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;
  showTouchControls: boolean;
  hapticFeedback: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.8,
  musicVolume: 0.5,
  showTouchControls: true,
  hapticFeedback: true,
};
