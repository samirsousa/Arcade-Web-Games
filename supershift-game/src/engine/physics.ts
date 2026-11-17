import { Player, Platform, MysteryBlock } from '../types/game';

export const PHYSICS_CONSTANTS = {
  GRAVITY_BASE: 1400, // px/s²
  MOVE_SPEED: 320,    // px/s
  BOOST_SPEED: 700,   // px/s (Sonic Speed)
  ACCEL_GROUND: 1800, // px/s²
  ACCEL_AIR: 1000,    // px/s²
  FRICTION_GROUND: 0.82,
  FRICTION_AIR: 0.94,
  JUMP_IMPULSE: 620,  // px/s
  DOUBLE_JUMP_IMPULSE: 540,
  MAX_FALL_SPEED: 900,
};

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function checkAABB(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export interface CollisionResult {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  platform?: Platform | MysteryBlock;
}

/**
 * Resolve colisões AABB do jogador contra plataformas sólidas com cálculo de penetração mínima.
 */
export function resolvePlayerPlatformCollisions(
  player: Player,
  platforms: (Platform | MysteryBlock)[]
): CollisionResult {
  const result: CollisionResult = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };

  const pRect: Rect = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  for (const plat of platforms) {
    const platRect: Rect = {
      x: plat.x,
      y: plat.y,
      width: plat.width,
      height: plat.height,
    };

    if (checkAABB(pRect, platRect)) {
      // Calcula penetrações nos 4 eixos
      const overlapLeft = (player.x + player.width) - plat.x;
      const overlapRight = (plat.x + plat.width) - player.x;
      const overlapTop = (player.y + player.height) - plat.y;
      const overlapBottom = (plat.y + plat.height) - player.y;

      // Descobre o menor overlap
      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      if (minOverlapY < minOverlapX) {
        // Colisão Vertical
        if (overlapTop < overlapBottom) {
          // Jogador colidindo em cima da plataforma
          player.y = plat.y - player.height;
          if (player.vy > 0) player.vy = 0;
          result.bottom = true;
          result.platform = plat;
        } else {
          // Jogador colidindo embaixo da plataforma (teto)
          player.y = plat.y + plat.height;
          if (player.vy < 0) player.vy = 0;
          result.top = true;
          result.platform = plat;
        }
      } else {
        // Colisão Horizontal
        if (overlapLeft < overlapRight) {
          // Jogador bateu pelo lado esquerdo do bloco
          player.x = plat.x - player.width;
          if (player.vx > 0) player.vx = 0;
          result.right = true;
        } else {
          // Jogador bateu pelo lado direito do bloco
          player.x = plat.x + plat.width;
          if (player.vx < 0) player.vx = 0;
          result.left = true;
        }
      }

      // Atualiza pRect após correção
      pRect.x = player.x;
      pRect.y = player.y;
    }
  }

  return result;
}

/**
 * Atualiza física e posição do jogador com deltaTime.
 */
export function updatePlayerPhysics(
  player: Player,
  input: { left: boolean; right: boolean; jump: boolean; boost: boolean },
  dt: number,
  platforms: Platform[],
  blocks: MysteryBlock[],
  hasFlyPet: boolean
): { hitBlock: MysteryBlock | null; jumped: boolean; doubleJumped: boolean } {
  let hitBlock: MysteryBlock | null = null;
  let jumped = false;
  let doubleJumped = false;

  // Modificadores de Trait por Personagem
  const isSonic = player.characterId === 'sonic';
  const isMario = player.characterId === 'mario';
  const isGoku = player.characterId === 'goku';

  // Lógica de Boost (Sonic Style)
  const boostDuration = isSonic ? 0.6 : 0.4;
  if (input.boost && player.boostTimeLeft <= 0) {
    player.isBoosting = true;
    player.boostTimeLeft = boostDuration;
  }

  if (player.boostTimeLeft > 0) {
    player.boostTimeLeft -= dt;
    if (player.boostTimeLeft <= 0) {
      player.isBoosting = false;
    }
  }

  // Efeitos de itens temporários
  if (player.starPowerTime > 0) {
    player.starPowerTime -= dt;
  }
  if (player.jumpBoostTime > 0) {
    player.jumpBoostTime -= dt;
  }

  let baseSpeed = PHYSICS_CONSTANTS.MOVE_SPEED;
  if (isSonic) baseSpeed *= 1.25;
  if (player.starPowerTime > 0) baseSpeed *= 1.35;

  let baseBoost = PHYSICS_CONSTANTS.BOOST_SPEED;
  if (isSonic) baseBoost *= 1.2;

  const currentMaxSpeed = player.isBoosting ? baseBoost : baseSpeed;

  const currentAccel = player.isGrounded
    ? PHYSICS_CONSTANTS.ACCEL_GROUND
    : PHYSICS_CONSTANTS.ACCEL_AIR;

  // Movimento Horizontal
  if (input.left && !input.right) {
    player.vx -= currentAccel * dt;
    player.facing = 'left';
  } else if (input.right && !input.left) {
    player.vx += currentAccel * dt;
    player.facing = 'right';
  } else {
    // Atrito
    const friction = player.isGrounded
      ? PHYSICS_CONSTANTS.FRICTION_GROUND
      : PHYSICS_CONSTANTS.FRICTION_AIR;
    player.vx *= Math.pow(friction, dt * 60);
    if (Math.abs(player.vx) < 5) player.vx = 0;
  }

  // Clamping de velocidade horizontal
  if (player.vx > currentMaxSpeed) player.vx = currentMaxSpeed;
  if (player.vx < -currentMaxSpeed) player.vx = -currentMaxSpeed;

  // Aplicação da Gravidade
  const gravityDir = player.gravityInverted ? -1 : 1;
  const gravityAccel = PHYSICS_CONSTANTS.GRAVITY_BASE * gravityDir;
  player.vy += gravityAccel * dt;

  // Clamping velocidade de queda (Goku tem maior sustentação de Ki)
  const maxFall = isGoku ? 750 : PHYSICS_CONSTANTS.MAX_FALL_SPEED;
  if (player.vy > maxFall) player.vy = maxFall;
  if (player.vy < -maxFall) player.vy = -maxFall;

  // Aplicação do Pulo
  let jumpImpulse = PHYSICS_CONSTANTS.JUMP_IMPULSE;
  if (isMario) jumpImpulse *= 1.15;
  if (player.jumpBoostTime > 0) jumpImpulse *= 1.25; // Efeito Triforce!

  if (input.jump) {
    if (player.isGrounded) {
      // Pulo do chão
      player.vy = -jumpImpulse * gravityDir;
      player.isGrounded = false;
      player.hasDoubleJumped = false;
      jumped = true;
    } else if (hasFlyPet && !player.hasDoubleJumped) {
      // Pulo duplo concedido pelo Pet Voador
      player.vy = -PHYSICS_CONSTANTS.DOUBLE_JUMP_IMPULSE * gravityDir;
      player.hasDoubleJumped = true;
      doubleJumped = true;
    }
  }

  // Integração da Posição
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Resolução de colisões combinadas (plataformas + blocos misteriosos)
  const solidSurfaces = [...platforms, ...blocks];
  const col = resolvePlayerPlatformCollisions(player, solidSurfaces);

  // Determina se está grounded dependendo do vetor de gravidade
  if (!player.gravityInverted) {
    player.isGrounded = col.bottom;
  } else {
    player.isGrounded = col.top;
  }

  if (player.isGrounded) {
    player.hasDoubleJumped = false;
  }

  // Detecção de batida em MysteryBlock
  if (col.platform && 'hitsLeft' in col.platform) {
    const block = col.platform as MysteryBlock;
    // Em gravidade normal, bate por baixo (col.top)
    // Em gravidade invertida, bate por cima (col.bottom)
    const isHeadHit = (!player.gravityInverted && col.top) || (player.gravityInverted && col.bottom);
    if (isHeadHit && !block.spent && block.hitsLeft > 0) {
      hitBlock = block;
    }
  }

  // Atualização dos estados de animação do jogador
  if (!player.isGrounded) {
    const isMovingUp = (!player.gravityInverted && player.vy < 0) || (player.gravityInverted && player.vy > 0);
    player.state = isMovingUp ? 'jumping' : 'falling';
  } else if (Math.abs(player.vx) > 15) {
    player.state = 'running';
  } else {
    player.state = 'idle';
  }

  // Timer de frames de animação
  player.animTimer += dt;
  const frameRate = player.state === 'running' ? (player.isBoosting ? 0.05 : 0.09) : 0.2;
  if (player.animTimer > frameRate) {
    player.animTimer = 0;
    player.animFrame = (player.animFrame + 1) % 8;
  }

  if (player.invulnerableTime > 0) {
    player.invulnerableTime -= dt;
  }

  return { hitBlock, jumped, doubleJumped };
}
