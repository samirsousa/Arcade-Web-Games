import { Particle } from '../types/game';

export class ParticleSystem {
  private pool: Particle[] = [];
  private maxParticles: number = 400;

  constructor(maxParticles: number = 400) {
    this.maxParticles = maxParticles;
    // Pré-aloca todas as partículas do pool
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 3,
        color: '#ffffff',
        alpha: 1,
        decay: 1,
        shape: 'circle',
        active: false,
      });
    }
  }

  private spawn(
    x: number,
    y: number,
    vx: number,
    vy: number,
    size: number,
    color: string,
    decay: number,
    shape: 'circle' | 'square' | 'spark' | 'ring' = 'circle'
  ) {
    // Procura uma partícula inativa
    for (let i = 0; i < this.maxParticles; i++) {
      if (!this.pool[i].active) {
        const p = this.pool[i];
        p.x = x;
        p.y = y;
        p.vx = vx;
        p.vy = vy;
        p.size = size;
        p.color = color;
        p.alpha = 1;
        p.decay = decay;
        p.shape = shape;
        p.active = true;
        return;
      }
    }
  }

  public update(dt: number) {
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.pool[i];
      if (p.active) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= p.decay * dt;
        if (p.alpha <= 0) {
          p.active = false;
        }
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.pool[i];
      if (p.active && p.alpha > 0) {
        const drawX = p.x - cameraX;
        const drawY = p.y - cameraY;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.shape === 'spark') {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
          // Linha de rastro
          ctx.lineWidth = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(drawX - p.vx * 0.05, drawY - p.vy * 0.05);
          ctx.stroke();
        } else if (p.shape === 'ring') {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * (2 - p.alpha), 0, Math.PI * 2);
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.shape === 'square') {
          ctx.fillRect(drawX - p.size / 2, drawY - p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  // Efeitos específicos

  // 1. Rastro de Alta Velocidade (Sonic Boost Trail)
  public emitBoostTrail(x: number, y: number, facing: 'left' | 'right') {
    const dir = facing === 'right' ? -1 : 1;
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#06b6d4'];
    for (let i = 0; i < 4; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const vx = dir * (100 + Math.random() * 200);
      const vy = (Math.random() - 0.5) * 80;
      this.spawn(
        x + (Math.random() - 0.5) * 16,
        y + (Math.random() - 0.5) * 24,
        vx,
        vy,
        2 + Math.random() * 4,
        color,
        2.5 + Math.random() * 2,
        'spark'
      );
    }
  }

  // 2. Vórtice de Ativação do Portal Antigravidade
  public emitPortalBurst(x: number, y: number) {
    const colors = ['#8b5cf6', '#a855f7', '#10b981', '#34d399', '#ec4899'];
    // Onda de choque circular
    this.spawn(x, y, 0, 0, 10, '#8b5cf6', 1.8, 'ring');
    this.spawn(x, y, 0, 0, 14, '#10b981', 1.4, 'ring');

    for (let i = 0; i < 35; i++) {
      const angle = (Math.PI * 2 * i) / 35 + Math.random() * 0.2;
      const speed = 150 + Math.random() * 250;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[i % colors.length];
      this.spawn(x, y, vx, vy, 3 + Math.random() * 4, color, 1.2 + Math.random() * 1.5, 'spark');
    }
  }

  // 3. Faíscas Douradas da Moeda (Mario Style)
  public emitCoinSparkles(x: number, y: number) {
    const colors = ['#fbbf24', '#f59e0b', '#fef08a', '#ffffff'];
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      this.spawn(
        x,
        y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        2 + Math.random() * 3,
        colors[Math.floor(Math.random() * colors.length)],
        2.0 + Math.random() * 1.5,
        'spark'
      );
    }
  }

  // 4. Detritos do Bloco Misterioso
  public emitBlockHit(x: number, y: number) {
    const colors = ['#f59e0b', '#d97706', '#fbbf24', '#ffffff'];
    for (let i = 0; i < 16; i++) {
      const vx = (Math.random() - 0.5) * 220;
      const vy = -120 - Math.random() * 180;
      this.spawn(
        x,
        y,
        vx,
        vy,
        3 + Math.random() * 4,
        colors[Math.floor(Math.random() * colors.length)],
        1.8 + Math.random() * 1.2,
        'square'
      );
    }
  }

  // 5. Poeira de Pulo / Aterrissagem
  public emitJumpDust(x: number, y: number, inverted: boolean) {
    const dir = inverted ? -1 : 1;
    for (let i = 0; i < 8; i++) {
      const vx = (Math.random() - 0.5) * 120;
      const vy = (10 + Math.random() * 40) * dir;
      this.spawn(
        x + (Math.random() - 0.5) * 20,
        y,
        vx,
        vy,
        2 + Math.random() * 3,
        'rgba(255, 255, 255, 0.6)',
        3.0 + Math.random() * 2,
        'circle'
      );
    }
  }

  // 6. Rastro dos Pocket Pets
  public emitPetTrail(x: number, y: number, color: string) {
    if (Math.random() > 0.4) return;
    this.spawn(
      x + (Math.random() - 0.5) * 8,
      y + (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20 - 10,
      2 + Math.random() * 3,
      color,
      2.5,
      'circle'
    );
  }

  public clear() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool[i].active = false;
    }
  }
}
