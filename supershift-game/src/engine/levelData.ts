import { Platform, MysteryBlock, Coin, BoostPad, GravityPortal, Enemy, Player, CharacterId } from '../types/game';

export interface LevelData {
  levelNumber: number;
  name: string;
  difficultyTitle: string;
  difficultyStars: number;
  worldWidth: number;
  worldHeight: number;
  spawnPoint: { x: number; y: number };
  goalX: number;
  platforms: Platform[];
  blocks: MysteryBlock[];
  coins: Coin[];
  boostPads: BoostPad[];
  portals: GravityPortal[];
  enemies: Enemy[];
}

export function createInitialPlayer(
  spawnX: number = 100,
  spawnY: number = 400,
  characterId: CharacterId = 'dk'
): Player {
  return {
    characterId,
    x: spawnX,
    y: spawnY,
    vx: 0,
    vy: 0,
    width: 36,
    height: 52,
    isGrounded: false,
    facing: 'right',
    isBoosting: false,
    boostTimeLeft: 0,
    canDoubleJump: false,
    hasDoubleJumped: false,
    gravityInverted: false,
    invulnerableTime: 0,
    starPowerTime: 0,
    jumpBoostTime: 0,
    health: 3,
    maxHealth: 3,
    animFrame: 0,
    animTimer: 0,
    state: 'idle',
  };
}

// ==========================================
// FASE 1: SETOR 01 - A FENDA GRAVITACIONAL
// Dificuldade: ★☆☆☆☆ (Tutorial / Iniciação)
// ==========================================
export function generateLevel1(): LevelData {
  const worldWidth = 5000;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l1-g1', x: 0, y: 560, width: 850, height: 60, type: 'standard', color: '#1e293b' },
    { id: 'l1-p1', x: 350, y: 440, width: 140, height: 25, type: 'standard' },
    { id: 'l1-p2', x: 550, y: 340, width: 160, height: 25, type: 'standard' },
    { id: 'l1-sonic', x: 920, y: 560, width: 500, height: 60, type: 'metal', color: '#0f172a' },
    { id: 'l1-app-portal', x: 1500, y: 520, width: 220, height: 25, type: 'standard' },

    // Zona de gravidade invertida (teto)
    { id: 'l1-ceil-1', x: 1800, y: 120, width: 1300, height: 50, type: 'metal', color: '#1e1b4b' },
    { id: 'l1-inv-p1', x: 2100, y: 240, width: 180, height: 25, type: 'standard', color: '#312e81' },
    { id: 'l1-inv-p2', x: 2400, y: 320, width: 160, height: 25, type: 'standard', color: '#312e81' },
    { id: 'l1-inv-p3', x: 2700, y: 220, width: 200, height: 25, type: 'standard', color: '#312e81' },
    { id: 'l1-pit-1', x: 1950, y: 860, width: 1000, height: 40, type: 'hazard', color: '#450a0a' },

    // Retorno à gravidade normal
    { id: 'l1-g-ret', x: 3200, y: 580, width: 450, height: 60, type: 'metal' },
    { id: 'l1-fin-1', x: 3750, y: 500, width: 140, height: 25, type: 'standard' },
    { id: 'l1-fin-2', x: 3980, y: 410, width: 140, height: 25, type: 'standard' },
    { id: 'l1-fin-3', x: 4200, y: 320, width: 160, height: 25, type: 'metal' },
    { id: 'l1-g-goal', x: 4450, y: 480, width: 550, height: 80, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l1-b1', x: 400, y: 300, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'mushroom', spent: false }, // Cogumelo Vida
    { id: 'l1-b2', x: 620, y: 200, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'pet_fly', spent: false },
    { id: 'l1-b3', x: 1180, y: 400, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'star', spent: false }, // Estrela Invencível
    { id: 'l1-b4', x: 2300, y: 200, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'pet_magnet', spent: false },
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 6; i++) {
    coins.push({ id: `l1-c-${i}`, x: 200 + i * 40, y: 500 - Math.sin((i / 5) * Math.PI) * 50, radius: 12, collected: false, animOffset: i * 0.4, value: 100 });
  }
  for (let i = 0; i < 8; i++) {
    coins.push({ id: `l1-c-sonic-${i}`, x: 980 + i * 50, y: 510, radius: 12, collected: false, animOffset: i * 0.2, value: 150 });
  }
  for (let i = 0; i < 10; i++) {
    coins.push({ id: `l1-c-inv-${i}`, x: 1950 + i * 80, y: 190 + Math.sin(i * 0.8) * 35, radius: 12, collected: false, animOffset: i * 0.5, value: 200 });
  }
  for (let i = 0; i < 6; i++) {
    coins.push({ id: `l1-c-fin-${i}`, x: 4500 + i * 45, y: 430, radius: 12, collected: false, animOffset: i * 0.3, value: 250 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l1-pad1', x: 960, y: 545, width: 80, height: 15, direction: 'right', power: 750, cooldown: 0 },
    { id: 'l1-pad2', x: 2750, y: 170, width: 80, height: 15, direction: 'right', power: 780, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l1-port1', x: 1700, y: 440, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l1-port2', x: 3100, y: 170, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l1-e1', x: 720, y: 525, vx: 70, width: 32, height: 32, patrolMinX: 660, patrolMaxX: 840, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l1-e2', x: 2300, y: 180, vx: 80, width: 32, height: 32, patrolMinX: 2150, patrolMaxX: 2450, alive: true, color: '#a855f7', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 1,
    name: 'Setor 01: Mushroom Kingdom (Reino dos Cogumelos)',
    difficultyTitle: 'Iniciação Clássica',
    difficultyStars: 1,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 4850,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

// ==========================================
// FASE 2: SETOR 02 - A ÓRBITA ESMERALDA
// Dificuldade: ★★☆☆☆ (Plataformas Móveis e Saltos Maiores)
// ==========================================
export function generateLevel2(): LevelData {
  const worldWidth = 5400;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l2-g1', x: 0, y: 560, width: 600, height: 60, type: 'standard', color: '#064e3b' },
    // Salto sobre o primeiro abismo usando plataformas elevadas
    { id: 'l2-p1', x: 700, y: 480, width: 110, height: 25, type: 'standard', color: '#10b981' },
    { id: 'l2-p2', x: 920, y: 400, width: 110, height: 25, type: 'standard', color: '#10b981' },
    { id: 'l2-p3', x: 1140, y: 320, width: 120, height: 25, type: 'metal' },

    // Pista de aceleração Sonic
    { id: 'l2-sonic', x: 1360, y: 550, width: 500, height: 50, type: 'metal' },

    // Zona de gravidade invertida mais desafiadora
    { id: 'l2-ceil-1', x: 2000, y: 130, width: 1400, height: 45, type: 'metal', color: '#047857' },
    { id: 'l2-inv-1', x: 2250, y: 260, width: 120, height: 22, type: 'standard', color: '#059669' },
    { id: 'l2-inv-2', x: 2480, y: 350, width: 130, height: 22, type: 'standard', color: '#059669' },
    { id: 'l2-inv-3', x: 2720, y: 250, width: 140, height: 22, type: 'standard', color: '#059669' },
    { id: 'l2-inv-4', x: 3000, y: 340, width: 120, height: 22, type: 'metal' },

    // Abismo no chão
    { id: 'l2-pit', x: 2000, y: 860, width: 1400, height: 40, type: 'hazard', color: '#991b1b' },

    // Retorno com plataformas escalonadas
    { id: 'l2-ret-1', x: 3550, y: 540, width: 250, height: 50, type: 'metal' },
    { id: 'l2-ret-2', x: 3900, y: 450, width: 130, height: 25, type: 'standard' },
    { id: 'l2-ret-3', x: 4150, y: 360, width: 140, height: 25, type: 'standard' },
    { id: 'l2-ret-4', x: 4400, y: 280, width: 150, height: 25, type: 'metal' },

    // Plataforma do Goal
    { id: 'l2-goal', x: 4700, y: 460, width: 700, height: 80, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l2-b1', x: 960, y: 260, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'ring', spent: false }, // Anel Sonic
    { id: 'l2-b2', x: 1500, y: 400, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'pet_fire', spent: false }, // Sparky
    { id: 'l2-b3', x: 2520, y: 220, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'mushroom', spent: false }, // Cogumelo Vida
    { id: 'l2-b4', x: 4200, y: 220, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'triforce', spent: false }, // Triforce Zelda
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 5; i++) {
    coins.push({ id: `l2-c-arc-${i}`, x: 740 + i * 90, y: 420 - Math.sin((i / 4) * Math.PI) * 60, radius: 12, collected: false, animOffset: i * 0.3, value: 120 });
  }
  for (let i = 0; i < 8; i++) {
    coins.push({ id: `l2-c-sonic-${i}`, x: 1400 + i * 45, y: 490, radius: 12, collected: false, animOffset: i * 0.2, value: 160 });
  }
  for (let i = 0; i < 12; i++) {
    coins.push({ id: `l2-c-inv-${i}`, x: 2150 + i * 75, y: 210 + Math.sin(i * 0.9) * 45, radius: 12, collected: false, animOffset: i * 0.4, value: 200 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l2-pad1', x: 1400, y: 535, width: 80, height: 15, direction: 'right', power: 800, cooldown: 0 },
    { id: 'l2-pad2', x: 3020, y: 290, width: 80, height: 15, direction: 'right', power: 780, cooldown: 0 },
    { id: 'l2-pad3', x: 3620, y: 525, width: 80, height: 15, direction: 'right', power: 750, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l2-port1', x: 1880, y: 450, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l2-port2', x: 3400, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l2-e1', x: 1550, y: 515, vx: 90, width: 32, height: 32, patrolMinX: 1480, patrolMaxX: 1750, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l2-e2', x: 2350, y: 220, vx: 100, width: 32, height: 32, patrolMinX: 2250, patrolMaxX: 2500, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l2-e3', x: 2850, y: 200, vx: 110, width: 32, height: 32, patrolMinX: 2750, patrolMaxX: 3050, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l2-e4', x: 4000, y: 415, vx: 85, width: 32, height: 32, patrolMinX: 3900, patrolMaxX: 4150, alive: true, color: '#f43f5e', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 2,
    name: 'Setor 02: Green Hill Zone (Costa Supersônica)',
    difficultyTitle: 'Alta Velocidade Sonic',
    difficultyStars: 2,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 5200,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

// ==========================================
// FASE 3: SETOR 03 - O VÓRTICE BIPOLAR
// Dificuldade: ★★★☆☆ (Inversões Rápidas de Gravidade & Espinhos)
// ==========================================
export function generateLevel3(): LevelData {
  const worldWidth = 5600;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l3-g1', x: 0, y: 560, width: 500, height: 60, type: 'standard', color: '#1e1b4b' },
    { id: 'l3-p1', x: 600, y: 470, width: 120, height: 25, type: 'standard' },
    { id: 'l3-p2', x: 800, y: 380, width: 120, height: 25, type: 'standard' },

    // Inversão 1: Teto curto
    { id: 'l3-ceil-1', x: 1050, y: 140, width: 600, height: 40, type: 'metal', color: '#312e81' },
    { id: 'l3-inv-1', x: 1250, y: 250, width: 130, height: 22, type: 'standard' },

    // Desinversão 1: Chão intermediário
    { id: 'l3-mid-g', x: 1800, y: 560, width: 600, height: 50, type: 'standard' },

    // Inversão 2: Vórtice Bipolar (Teto longo com inimigos múltiplos)
    { id: 'l3-ceil-2', x: 2550, y: 130, width: 1100, height: 45, type: 'metal', color: '#312e81' },
    { id: 'l3-inv-2', x: 2750, y: 260, width: 110, height: 22, type: 'standard' },
    { id: 'l3-inv-3', x: 2980, y: 340, width: 120, height: 22, type: 'metal' },
    { id: 'l3-inv-4', x: 3250, y: 250, width: 110, height: 22, type: 'standard' },

    // Abismos
    { id: 'l3-haz-1', x: 950, y: 860, width: 850, height: 40, type: 'hazard', color: '#450a0a' },
    { id: 'l3-haz-2', x: 2450, y: 860, width: 1250, height: 40, type: 'hazard', color: '#450a0a' },

    // Seção final
    { id: 'l3-fin-g', x: 3850, y: 560, width: 450, height: 60, type: 'metal' },
    { id: 'l3-fin-p1', x: 4400, y: 470, width: 120, height: 25, type: 'standard' },
    { id: 'l3-fin-p2', x: 4620, y: 380, width: 130, height: 25, type: 'standard' },
    { id: 'l3-goal', x: 4850, y: 460, width: 750, height: 80, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l3-b1', x: 820, y: 260, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'triforce', spent: false }, // Triforce
    { id: 'l3-b2', x: 1300, y: 180, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'pet_fly', spent: false }, // Aero
    { id: 'l3-b3', x: 2000, y: 420, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'dragon_ball', spent: false }, // Esfera do Dragão!
    { id: 'l3-b4', x: 3000, y: 220, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'star', spent: false },
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 6; i++) {
    coins.push({ id: `l3-c-1-${i}`, x: 650 + i * 60, y: 410, radius: 12, collected: false, animOffset: i * 0.3, value: 150 });
  }
  for (let i = 0; i < 10; i++) {
    coins.push({ id: `l3-c-inv1-${i}`, x: 1100 + i * 55, y: 190, radius: 12, collected: false, animOffset: i * 0.2, value: 200 });
  }
  for (let i = 0; i < 12; i++) {
    coins.push({ id: `l3-c-inv2-${i}`, x: 2600 + i * 70, y: 200 + Math.sin(i) * 40, radius: 12, collected: false, animOffset: i * 0.4, value: 250 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l3-pad1', x: 1900, y: 545, width: 80, height: 15, direction: 'right', power: 820, cooldown: 0 },
    { id: 'l3-pad2', x: 3300, y: 200, width: 80, height: 15, direction: 'right', power: 800, cooldown: 0 },
    { id: 'l3-pad3', x: 3950, y: 545, width: 80, height: 15, direction: 'right', power: 750, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l3-port1', x: 960, y: 400, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l3-port2', x: 1680, y: 190, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
    { id: 'l3-port3', x: 2450, y: 460, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l3-port4', x: 3700, y: 190, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l3-e1', x: 1350, y: 200, vx: 110, width: 32, height: 32, patrolMinX: 1200, patrolMaxX: 1500, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l3-e2', x: 2050, y: 525, vx: 95, width: 32, height: 32, patrolMinX: 1950, patrolMaxX: 2250, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l3-e3', x: 2850, y: 215, vx: 120, width: 32, height: 32, patrolMinX: 2750, patrolMaxX: 3000, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l3-e4', x: 3150, y: 205, vx: 115, width: 32, height: 32, patrolMinX: 3050, patrolMaxX: 3300, alive: true, color: '#a855f7', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 3,
    name: 'Setor 03: Santuário de Hyrule (Picos Sagrados)',
    difficultyTitle: 'Desafio da Triforce',
    difficultyStars: 3,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 5350,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

// ==========================================
// FASE 4: SETOR 04 - TEMPESTADE CIBERNÉTICA
// Dificuldade: ★★★★☆ (Velocidade Extrema & Sonic Pads em Série)
// ==========================================
export function generateLevel4(): LevelData {
  const worldWidth = 5800;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l4-g1', x: 0, y: 560, width: 450, height: 60, type: 'standard', color: '#1e293b' },
    // Salto rápido com boost
    { id: 'l4-p1', x: 550, y: 490, width: 90, height: 22, type: 'standard' },
    { id: 'l4-p2', x: 740, y: 410, width: 90, height: 22, type: 'standard' },
    { id: 'l4-p3', x: 930, y: 330, width: 90, height: 22, type: 'metal' },

    // Longa pista supersônica com inimigos cruzados
    { id: 'l4-sonic-run', x: 1150, y: 550, width: 750, height: 50, type: 'metal', color: '#1e1b4b' },

    // Seção Invertida Aérea: Apenas pequenas plataformas no teto
    { id: 'l4-ceil-1', x: 2100, y: 130, width: 1400, height: 40, type: 'metal' },
    { id: 'l4-inv-step1', x: 2350, y: 260, width: 90, height: 20, type: 'standard' },
    { id: 'l4-inv-step2', x: 2550, y: 340, width: 90, height: 20, type: 'standard' },
    { id: 'l4-inv-step3', x: 2750, y: 240, width: 90, height: 20, type: 'metal' },
    { id: 'l4-inv-step4', x: 2980, y: 330, width: 90, height: 20, type: 'standard' },
    { id: 'l4-inv-step5', x: 3200, y: 240, width: 100, height: 20, type: 'metal' },

    // Abismo duplo gigante
    { id: 'l4-haz-1', x: 2050, y: 860, width: 1550, height: 40, type: 'hazard', color: '#991b1b' },

    // Retorno com saltos de precisão
    { id: 'l4-ret-1', x: 3750, y: 550, width: 200, height: 50, type: 'metal' },
    { id: 'l4-ret-2', x: 4050, y: 460, width: 90, height: 22, type: 'standard' },
    { id: 'l4-ret-3', x: 4250, y: 370, width: 90, height: 22, type: 'standard' },
    { id: 'l4-ret-4', x: 4450, y: 290, width: 100, height: 22, type: 'metal' },
    { id: 'l4-ret-5', x: 4680, y: 390, width: 100, height: 22, type: 'standard' },

    // Plataforma da Meta
    { id: 'l4-goal', x: 4950, y: 460, width: 850, height: 80, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l4-b1', x: 760, y: 290, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'dragon_ball', spent: false }, // Dragon Ball!
    { id: 'l4-b2', x: 1350, y: 410, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'pet_fire', spent: false }, // Sparky contra o enxame
    { id: 'l4-b3', x: 2600, y: 220, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'ring', spent: false }, // Anel Sonic
    { id: 'l4-b4', x: 4300, y: 240, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'mushroom', spent: false }, // Vida
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 10; i++) {
    coins.push({ id: `l4-c-sonic-${i}`, x: 1200 + i * 65, y: 490, radius: 12, collected: false, animOffset: i * 0.2, value: 200 });
  }
  for (let i = 0; i < 12; i++) {
    coins.push({ id: `l4-c-inv-${i}`, x: 2300 + i * 85, y: 210 + Math.sin(i * 1.2) * 45, radius: 12, collected: false, animOffset: i * 0.3, value: 250 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l4-pad1', x: 1180, y: 535, width: 80, height: 15, direction: 'right', power: 850, cooldown: 0 },
    { id: 'l4-pad2', x: 1550, y: 535, width: 80, height: 15, direction: 'right', power: 850, cooldown: 0 },
    { id: 'l4-pad3', x: 3220, y: 190, width: 80, height: 15, direction: 'right', power: 820, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l4-port1', x: 1980, y: 440, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l4-port2', x: 3600, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l4-e1', x: 1400, y: 515, vx: 130, width: 32, height: 32, patrolMinX: 1300, patrolMaxX: 1600, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l4-e2', x: 1650, y: 515, vx: -140, width: 32, height: 32, patrolMinX: 1550, patrolMaxX: 1850, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l4-e3', x: 2450, y: 210, vx: 125, width: 32, height: 32, patrolMinX: 2350, patrolMaxX: 2650, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l4-e4', x: 2850, y: 190, vx: 135, width: 32, height: 32, patrolMinX: 2750, patrolMaxX: 3050, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l4-e5', x: 4150, y: 425, vx: 110, width: 32, height: 32, patrolMinX: 4050, patrolMaxX: 4350, alive: true, color: '#f43f5e', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 4,
    name: 'Setor 04: Região de Kanto (Fronteira Pokémon)',
    difficultyTitle: 'Fenda dos Mestres',
    difficultyStars: 4,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 5550,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

// ==========================================
// FASE 5: SETOR 05 - O LABIRINTO DO HORIZONTE DE EVENTOS
// Dificuldade: ★★★★★ (Gravidade Invertida Prolongada & Labirinto Aéreo)
// ==========================================
export function generateLevel5(): LevelData {
  const worldWidth = 6000;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l5-g1', x: 0, y: 560, width: 400, height: 60, type: 'standard', color: '#1e1b4b' },

    // Portal imediato no início! O jogador já entra de cabeça para baixo!
    { id: 'l5-ceil-main', x: 600, y: 120, width: 2200, height: 45, type: 'metal', color: '#2e1065' },
    
    // Plataformas invertidas suspensas com espinhos embaixo
    { id: 'l5-inv-1', x: 850, y: 240, width: 100, height: 20, type: 'standard' },
    { id: 'l5-inv-2', x: 1080, y: 320, width: 100, height: 20, type: 'standard' },
    { id: 'l5-inv-3', x: 1320, y: 230, width: 110, height: 20, type: 'metal' },
    { id: 'l5-inv-4', x: 1580, y: 340, width: 100, height: 20, type: 'standard' },
    { id: 'l5-inv-5', x: 1820, y: 250, width: 110, height: 20, type: 'standard' },
    { id: 'l5-inv-6', x: 2100, y: 350, width: 120, height: 20, type: 'metal' },
    { id: 'l5-inv-7', x: 2380, y: 240, width: 130, height: 20, type: 'standard' },

    // Abismo cósmico contínuo na parte inferior
    { id: 'l5-haz-all', x: 500, y: 860, width: 2400, height: 40, type: 'hazard', color: '#581c87' },

    // Ponto de desinversão para uma ilha flutuante
    { id: 'l5-mid-island', x: 3000, y: 550, width: 400, height: 50, type: 'metal' },
    { id: 'l5-p-mid1', x: 3500, y: 460, width: 100, height: 22, type: 'standard' },
    { id: 'l5-p-mid2', x: 3720, y: 370, width: 100, height: 22, type: 'standard' },

    // Segunda área invertida com saltos duplos milimétricos
    { id: 'l5-ceil-2', x: 4000, y: 130, width: 1000, height: 40, type: 'metal' },
    { id: 'l5-inv-8', x: 4200, y: 260, width: 90, height: 20, type: 'standard' },
    { id: 'l5-inv-9', x: 4450, y: 350, width: 90, height: 20, type: 'standard' },
    { id: 'l5-inv-10', x: 4700, y: 240, width: 100, height: 20, type: 'metal' },

    // Plataforma do Goal
    { id: 'l5-goal', x: 5200, y: 460, width: 800, height: 80, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l5-b1', x: 1100, y: 200, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'star', spent: false }, // Estrela Invencível
    { id: 'l5-b2', x: 1840, y: 170, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'triforce', spent: false }, // Triforce
    { id: 'l5-b3', x: 3200, y: 410, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'dragon_ball', spent: false }, // Esfera do Dragão
    { id: 'l5-b4', x: 4480, y: 220, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'mushroom', spent: false }, // Vida
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 16; i++) {
    coins.push({ id: `l5-c-${i}`, x: 900 + i * 95, y: 180 + Math.sin(i * 0.7) * 45, radius: 12, collected: false, animOffset: i * 0.3, value: 250 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l5-pad1', x: 2400, y: 190, width: 80, height: 15, direction: 'right', power: 830, cooldown: 0 },
    { id: 'l5-pad2', x: 3100, y: 535, width: 80, height: 15, direction: 'right', power: 800, cooldown: 0 },
    { id: 'l5-pad3', x: 4720, y: 190, width: 80, height: 15, direction: 'right', power: 840, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l5-port1', x: 480, y: 460, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l5-port2', x: 2850, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
    { id: 'l5-port3', x: 3880, y: 390, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l5-port4', x: 5050, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l5-e1', x: 1150, y: 190, vx: 120, width: 32, height: 32, patrolMinX: 1050, patrolMaxX: 1350, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l5-e2', x: 1650, y: 190, vx: 130, width: 32, height: 32, patrolMinX: 1500, patrolMaxX: 1800, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l5-e3', x: 2150, y: 190, vx: 140, width: 32, height: 32, patrolMinX: 2000, patrolMaxX: 2300, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l5-e4', x: 3250, y: 515, vx: 110, width: 32, height: 32, patrolMinX: 3100, patrolMaxX: 3400, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l5-e5', x: 4350, y: 190, vx: 140, width: 32, height: 32, patrolMinX: 4200, patrolMaxX: 4550, alive: true, color: '#a855f7', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 5,
    name: 'Setor 05: Planeta Namek (Domínio dos Guerreiros Z)',
    difficultyTitle: 'Gravidade Aumentada 100x',
    difficultyStars: 5,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 5750,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

// ==========================================
// FASE 6: SETOR 06 - O NÚCLEO QUÂNTICO DE GRAVIDADE ZERO
// Dificuldade: ★★★★★★ (Fase Final Épica: O Confronto Cósmico Definitivo)
// ==========================================
export function generateLevel6(): LevelData {
  const worldWidth = 6400;
  const worldHeight = 900;

  const platforms: Platform[] = [
    { id: 'l6-start', x: 0, y: 560, width: 350, height: 60, type: 'metal', color: '#006437' },

    // Sequência rítmica de micro-plataformas no chão e no teto
    { id: 'l6-p1', x: 450, y: 470, width: 75, height: 20, type: 'standard' },
    { id: 'l6-p2', x: 620, y: 390, width: 75, height: 20, type: 'standard' },
    { id: 'l6-p3', x: 790, y: 310, width: 75, height: 20, type: 'metal' },

    // Primeiro Portal relâmpago: Teto 1
    { id: 'l6-ceil-1', x: 950, y: 120, width: 850, height: 40, type: 'metal', color: '#8a1538' },
    { id: 'l6-inv-1', x: 1100, y: 240, width: 80, height: 18, type: 'standard' },
    { id: 'l6-inv-2', x: 1280, y: 330, width: 80, height: 18, type: 'standard' },
    { id: 'l6-inv-3', x: 1460, y: 230, width: 80, height: 18, type: 'metal' },

    // Queda no solo intermediário em alta velocidade
    { id: 'l6-sonic-run', x: 1950, y: 550, width: 900, height: 50, type: 'metal', color: '#0284c7' },

    // Segundo Portal: Teto do Núcleo
    { id: 'l6-ceil-core', x: 3000, y: 120, width: 1400, height: 45, type: 'metal', color: '#8a1538' },
    { id: 'l6-inv-4', x: 3200, y: 250, width: 75, height: 18, type: 'standard' },
    { id: 'l6-inv-5', x: 3400, y: 340, width: 75, height: 18, type: 'standard' },
    { id: 'l6-inv-6', x: 3600, y: 240, width: 75, height: 18, type: 'metal' },
    { id: 'l6-inv-7', x: 3820, y: 330, width: 75, height: 18, type: 'standard' },
    { id: 'l6-inv-8', x: 4050, y: 230, width: 85, height: 18, type: 'metal' },

    // Abismo Quântico Total abaixo
    { id: 'l6-haz-core', x: 400, y: 860, width: 5000, height: 40, type: 'hazard', color: '#881337' },

    // Desafio Final: Salto em cadeia supersônico
    { id: 'l6-fin-pad-g', x: 4600, y: 550, width: 250, height: 50, type: 'metal' },
    { id: 'l6-fin-step1', x: 4950, y: 460, width: 75, height: 20, type: 'standard' },
    { id: 'l6-fin-step2', x: 5120, y: 370, width: 75, height: 20, type: 'standard' },
    { id: 'l6-fin-step3', x: 5290, y: 290, width: 80, height: 20, type: 'metal' },

    // Plataforma Triunfante do Portal Cósmico da Vitória Absoluta
    { id: 'l6-victory-sanctuary', x: 5550, y: 460, width: 850, height: 90, type: 'standard', color: '#064e3b' },
  ];

  const blocks: MysteryBlock[] = [
    { id: 'l6-b1', x: 640, y: 260, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'star', spent: false }, // Star
    { id: 'l6-b2', x: 1300, y: 190, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'dragon_ball', spent: false }, // Dragon Ball!
    { id: 'l6-b3', x: 2300, y: 410, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'triforce', spent: false }, // Triforce!
    { id: 'l6-b4', x: 3620, y: 190, width: 40, height: 40, hitsLeft: 1, bumpOffset: 0, contains: 'mushroom', spent: false }, // Cogumelo Vida
  ];

  const coins: Coin[] = [];
  for (let i = 0; i < 20; i++) {
    coins.push({ id: `l6-c-${i}`, x: 1000 + i * 80, y: 220 + Math.sin(i * 0.9) * 40, radius: 12, collected: false, animOffset: i * 0.3, value: 300 });
  }
  for (let i = 0; i < 15; i++) {
    coins.push({ id: `l6-c-fin-${i}`, x: 5600 + i * 45, y: 400, radius: 12, collected: false, animOffset: i * 0.2, value: 500 });
  }

  const boostPads: BoostPad[] = [
    { id: 'l6-pad1', x: 800, y: 295, width: 75, height: 15, direction: 'right', power: 850, cooldown: 0 },
    { id: 'l6-pad2', x: 2000, y: 535, width: 80, height: 15, direction: 'right', power: 880, cooldown: 0 },
    { id: 'l6-pad3', x: 2450, y: 535, width: 80, height: 15, direction: 'right', power: 900, cooldown: 0 },
    { id: 'l6-pad4', x: 4070, y: 180, width: 80, height: 15, direction: 'right', power: 860, cooldown: 0 },
    { id: 'l6-pad5', x: 4680, y: 535, width: 80, height: 15, direction: 'right', power: 840, cooldown: 0 },
  ];

  const portals: GravityPortal[] = [
    { id: 'l6-port1', x: 880, y: 260, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l6-port2', x: 1820, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
    { id: 'l6-port3', x: 2900, y: 440, width: 60, height: 90, targetGravityInverted: true, active: true, cooldown: 0 },
    { id: 'l6-port4', x: 4450, y: 180, width: 60, height: 90, targetGravityInverted: false, active: true, cooldown: 0 },
  ];

  const enemies: Enemy[] = [
    { id: 'l6-e1', x: 1200, y: 190, vx: 140, width: 32, height: 32, patrolMinX: 1100, patrolMaxX: 1400, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l6-e2', x: 2200, y: 515, vx: 150, width: 32, height: 32, patrolMinX: 2050, patrolMaxX: 2400, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l6-e3', x: 2600, y: 515, vx: -160, width: 32, height: 32, patrolMinX: 2450, patrolMaxX: 2800, alive: true, color: '#a855f7', type: 'glitch_drone' },
    { id: 'l6-e4', x: 3350, y: 180, vx: 145, width: 32, height: 32, patrolMinX: 3200, patrolMaxX: 3550, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l6-e5', x: 3750, y: 180, vx: 155, width: 32, height: 32, patrolMinX: 3600, patrolMaxX: 3950, alive: true, color: '#f43f5e', type: 'glitch_drone' },
    { id: 'l6-e6', x: 5050, y: 425, vx: 120, width: 32, height: 32, patrolMinX: 4950, patrolMaxX: 5250, alive: true, color: '#a855f7', type: 'glitch_drone' },
  ];

  return {
    levelNumber: 6,
    name: 'Setor 06: Núcleo SuperShift (Vórtice Multidimensional)',
    difficultyTitle: 'Pesadelo Quântico / Mestre Arcade',
    difficultyStars: 6,
    worldWidth,
    worldHeight,
    spawnPoint: { x: 100, y: 480 },
    goalX: 6150,
    platforms,
    blocks,
    coins,
    boostPads,
    portals,
    enemies,
  };
}

/**
 * Função utilitária para obter os dados do nível desejado (1 a 6).
 */
export function getLevel(levelNumber: number): LevelData {
  switch (levelNumber) {
    case 1:
      return generateLevel1();
    case 2:
      return generateLevel2();
    case 3:
      return generateLevel3();
    case 4:
      return generateLevel4();
    case 5:
      return generateLevel5();
    case 6:
      return generateLevel6();
    default:
      return generateLevel1();
  }
}
