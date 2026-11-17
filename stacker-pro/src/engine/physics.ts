import { Block, SlicedPiece, Particle, FloatingText } from '../types/game';

export interface SliceResult {
  isMiss: boolean;
  isPerfect: boolean;
  placedBlock: Block | null;
  slicedPiece: SlicedPiece | null;
  combo: number;
}

export const PHYSICS = {
  PERFECT_TOLERANCE: 3.5, // Pixels de tolerância para encaixe perfeito
  BASE_SPEED: 260,        // px/s velocidade inicial do bloco oscilante
  SPEED_INCREMENT: 6.5,   // Aumento de velocidade a cada andar
  MAX_SPEED: 650,         // Velocidade limite máxima
  BLOCK_HEIGHT: 26,       // Altura de cada bloco em pixels
  INITIAL_WIDTH: 180,     // Largura inicial do bloco
  MIN_WIDTH: 18,          // Largura mínima antes de colapsar
  GRAVITY: 980,           // Gravidade para pedaços cortados
};

/**
 * Calcula o corte do bloco oscilante contra o bloco anterior empilhado.
 */
export function calculateBlockSlice(
  movingBlock: Block,
  prevBlock: Block,
  currentCombo: number,
  blockColors: { color: string; glowColor: string }
): SliceResult {
  const mLeft = movingBlock.x;
  const mRight = movingBlock.x + movingBlock.width;
  const pLeft = prevBlock.x;
  const pRight = prevBlock.x + prevBlock.width;

  const diff = mLeft - pLeft;

  // 1. CHECAGEM DE ENCAIXE PERFEITO (Snap to previous block)
  if (Math.abs(diff) <= PHYSICS.PERFECT_TOLERANCE) {
    const newCombo = currentCombo + 1;
    // Bônus de recuperação de largura se mantiver combo alto (estilo Stacker arcade)
    let newWidth = movingBlock.width;
    if (newCombo % 5 === 0 && newWidth < PHYSICS.INITIAL_WIDTH) {
      newWidth = Math.min(PHYSICS.INITIAL_WIDTH, newWidth + 6);
    }

    const placedBlock: Block = {
      id: movingBlock.id,
      floor: movingBlock.floor,
      x: prevBlock.x - (newWidth - prevBlock.width) / 2, // Centraliza se expandiu
      y: movingBlock.y,
      width: newWidth,
      height: movingBlock.height,
      color: blockColors.color,
      glowColor: blockColors.glowColor,
      isMoving: false,
      speed: 0,
      direction: movingBlock.direction,
      isPerfect: true,
    };

    return {
      isMiss: false,
      isPerfect: true,
      placedBlock,
      slicedPiece: null,
      combo: newCombo,
    };
  }

  // 2. CHECAGEM DE ERRO TOTAL (Miss - Fora dos limites do bloco anterior)
  if (mRight <= pLeft || mLeft >= pRight) {
    // Bloco inteiro despenca
    const slicedPiece: SlicedPiece = {
      id: Date.now(),
      x: movingBlock.x,
      y: movingBlock.y,
      width: movingBlock.width,
      height: movingBlock.height,
      vx: movingBlock.direction * (Math.random() * 60 + 40),
      vy: -40,
      rotation: 0,
      vRot: (Math.random() * 4 - 2) * (movingBlock.direction || 1),
      color: movingBlock.color,
      alpha: 1,
    };

    return {
      isMiss: true,
      isPerfect: false,
      placedBlock: null,
      slicedPiece,
      combo: 0,
    };
  }

  // 3. ENCAIXE PARCIAL COM CORTE (Slice Overhang)
  const overlapLeft = Math.max(mLeft, pLeft);
  const overlapRight = Math.min(mRight, pRight);
  const overlapWidth = overlapRight - overlapLeft;

  // Bloco fixado que permanece na torre
  const placedBlock: Block = {
    id: movingBlock.id,
    floor: movingBlock.floor,
    x: overlapLeft,
    y: movingBlock.y,
    width: overlapWidth,
    height: movingBlock.height,
    color: blockColors.color,
    glowColor: blockColors.glowColor,
    isMoving: false,
    speed: 0,
    direction: movingBlock.direction,
    isPerfect: false,
  };

  // Pedaço excedente cortado que despenca no abismo urbano
  let sliceX = 0;
  let sliceWidth = 0;
  let dirMultiplier = 1;

  if (mLeft < pLeft) {
    // Cortou o lado esquerdo
    sliceX = mLeft;
    sliceWidth = pLeft - mLeft;
    dirMultiplier = -1;
  } else {
    // Cortou o lado direito
    sliceX = pRight;
    sliceWidth = mRight - pRight;
    dirMultiplier = 1;
  }

  const slicedPiece: SlicedPiece = {
    id: Date.now(),
    x: sliceX,
    y: movingBlock.y,
    width: sliceWidth,
    height: movingBlock.height,
    vx: dirMultiplier * (Math.random() * 90 + 50),
    vy: -60, // Pequeno pulinho antes de cair
    rotation: 0,
    vRot: dirMultiplier * (Math.random() * 3 + 2),
    color: movingBlock.color,
    alpha: 1,
  };

  return {
    isMiss: false,
    isPerfect: false,
    placedBlock,
    slicedPiece,
    combo: 0,
  };
}

/**
 * Atualiza partículas neon
 */
export function updateParticles(particles: Particle[], dt: number): Particle[] {
  return particles
    .map((p) => {
      return {
        ...p,
        x: p.x + p.vx * dt,
        y: p.y + p.vy * dt,
        alpha: Math.max(0, p.life / p.maxLife),
        life: p.life - dt,
      };
    })
    .filter((p) => p.life > 0);
}

/**
 * Atualiza pedaços cortados com gravidade e rotação
 */
export function updateSlicedPieces(pieces: SlicedPiece[], dt: number, cameraY: number, screenH: number): SlicedPiece[] {
  return pieces
    .map((piece) => {
      const newVy = piece.vy + PHYSICS.GRAVITY * dt;
      return {
        ...piece,
        x: piece.x + piece.vx * dt,
        y: piece.y + newVy * dt,
        vy: newVy,
        rotation: piece.rotation + piece.vRot * dt,
        alpha: Math.max(0, piece.alpha - dt * 0.45),
      };
    })
    .filter((piece) => piece.y < cameraY + screenH + 200 && piece.alpha > 0.05);
}

/**
 * Atualiza textos flutuantes (ex: "+500 PERFECT! x3")
 */
export function updateFloatingTexts(texts: FloatingText[], dt: number): FloatingText[] {
  return texts
    .map((t) => ({
      ...t,
      y: t.y - dt * 45,
      alpha: Math.max(0, t.life / 0.8),
      scale: Math.min(1.4, t.scale + dt * 0.5),
      life: t.life - dt,
    }))
    .filter((t) => t.life > 0);
}
