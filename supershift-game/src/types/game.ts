export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'VICTORY';

export type CharacterId = 'dk' | 'ash' | 'link' | 'mario' | 'sonic' | 'goku';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  title: string;
  franchise: string;
  description: string;
  trait: string;
  badgeColor: string;
}

export type PetType = 'FIRE' | 'FLY' | 'MAGNET';

export interface Pet {
  id: string;
  type: PetType;
  name: string;
  color: string;
  glowColor: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  angle: number;
  description: string;
}

export interface Player {
  characterId: CharacterId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  isBoosting: boolean;
  boostTimeLeft: number;
  canDoubleJump: boolean;
  hasDoubleJumped: boolean;
  gravityInverted: boolean;
  invulnerableTime: number;
  starPowerTime: number; // Invencibilidade Cósmica (Star / Super)
  jumpBoostTime: number; // Impulso vertical Triforce
  health: number;
  maxHealth: number;
  // Animação
  animFrame: number;
  animTimer: number;
  state: 'idle' | 'running' | 'jumping' | 'falling';
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'standard' | 'metal' | 'hazard' | 'ice' | 'bouncy';
  color?: string;
}

export interface MysteryBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hitsLeft: number;
  bumpOffset: number;
  contains: 'coin' | 'pet_fire' | 'pet_fly' | 'pet_magnet' | 'star' | 'mushroom' | 'dragon_ball' | 'triforce' | 'ring';
  spent: boolean;
}

export interface Coin {
  id: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  animOffset: number;
  value: number;
}

export interface BoostPad {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  direction: 'right' | 'left' | 'up' | 'down';
  power: number;
  cooldown: number;
}

export interface GravityPortal {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetGravityInverted: boolean; // se inverte ou se define o estado
  active: boolean;
  cooldown: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  vx: number;
  width: number;
  height: number;
  patrolMinX: number;
  patrolMaxX: number;
  alive: boolean;
  color: string;
  type: 'glitch_drone' | 'spiky_void';
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape?: 'circle' | 'square' | 'spark' | 'ring';
  active: boolean;
}

export interface InputState {
  left: boolean;
  right: boolean;
  jump: boolean;
  boost: boolean;
  down: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;
  showTouchControls: boolean;
  cameraSmoothing: number;
  particlesIntensity: 'low' | 'medium' | 'high';
  crtScanlines: boolean;
  glowEffects: boolean;
  showFps: boolean;
}

export interface GameStats {
  score: number;
  highScore: number;
  coins: number;
  totalCoins: number;
  portalsUsed: number;
  speed: number;
  currentLevel: number;
  maxLevels: number;
  timeElapsed: number;
}
