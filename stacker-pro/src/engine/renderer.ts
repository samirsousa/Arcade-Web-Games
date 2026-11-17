import { Block, SlicedPiece, Particle, FloatingText, UrbanZone } from '../types/game';

export class GameRenderer {
  // Paleta de Cores Dinâmicas dos Blocos por Ciclo de Altura
  public static readonly PALETTES = [
    { color: '#06b6d4', glowColor: '#0891b2', name: 'Cyan Neon' },
    { color: '#22d3ee', glowColor: '#06b6d4', name: 'Electric Sky' },
    { color: '#ec4899', glowColor: '#db2777', name: 'Magenta Cyber' },
    { color: '#f43f5e', glowColor: '#e11d48', name: 'Crimson Laser' },
    { color: '#a855f7', glowColor: '#9333ea', name: 'Vibrant Purple' },
    { color: '#8b5cf6', glowColor: '#7c3aed', name: 'Violet Pulse' },
    { color: '#10b981', glowColor: '#059669', name: 'Emerald Circuit' },
    { color: '#f59e0b', glowColor: '#d97706', name: 'Amber Core' },
    { color: '#eab308', glowColor: '#ca8a04', name: 'Solar Apex' },
  ];

  public static getBlockColor(floor: number) {
    const idx = floor % this.PALETTES.length;
    return this.PALETTES[idx];
  }

  public static getZone(floor: number): UrbanZone {
    if (floor < 15) {
      return {
        minFloor: 0,
        name: 'Ground Zero (Subsolo Cyber)',
        skyColorTop: '#080c16',
        skyColorBottom: '#111827',
        gridColor: 'rgba(6, 182, 212, 0.08)',
        buildingTheme: 'low',
        accentColor: '#06b6d4',
      };
    } else if (floor < 30) {
      return {
        minFloor: 15,
        name: 'Neon Midtown (Avenida Neon)',
        skyColorTop: '#0d1326',
        skyColorBottom: '#1e1b4b',
        gridColor: 'rgba(236, 72, 153, 0.09)',
        buildingTheme: 'mid',
        accentColor: '#ec4899',
      };
    } else if (floor < 50) {
      return {
        minFloor: 30,
        name: 'High-Tech District (Centro Financeiro)',
        skyColorTop: '#10172a',
        skyColorBottom: '#2e1065',
        gridColor: 'rgba(168, 85, 247, 0.1)',
        buildingTheme: 'high',
        accentColor: '#a855f7',
      };
    } else if (floor < 75) {
      return {
        minFloor: 50,
        name: 'Skyline Spires (Arranta-Céus)',
        skyColorTop: '#090d1a',
        skyColorBottom: '#1e293b',
        gridColor: 'rgba(16, 185, 129, 0.12)',
        buildingTheme: 'spires',
        accentColor: '#10b981',
      };
    } else if (floor < 100) {
      return {
        minFloor: 75,
        name: 'Stratosphere Apex (Camada de Nuvens)',
        skyColorTop: '#030712',
        skyColorBottom: '#0f172a',
        gridColor: 'rgba(245, 158, 11, 0.12)',
        buildingTheme: 'clouds',
        accentColor: '#f59e0b',
      };
    } else {
      return {
        minFloor: 100,
        name: 'Orbital Elevator (Estação Espacial)',
        skyColorTop: '#000000',
        skyColorBottom: '#090d16',
        gridColor: 'rgba(234, 179, 8, 0.15)',
        buildingTheme: 'space',
        accentColor: '#eab308',
      };
    }
  }

  /**
   * Renderiza o fundo da metrópole futurista com paralaxe de altura vertical
   */
  public static renderBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraY: number,
    currentFloor: number
  ) {
    const zone = this.getZone(currentFloor);

    // 1. Gradiente de Céu / Atmosfera
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, zone.skyColorTop);
    skyGrad.addColorStop(1, zone.skyColorBottom);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Linhas de Grade de Perspectiva Cyberpunk
    ctx.strokeStyle = zone.gridColor;
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    const offsetY = (-cameraY * 0.3) % gridSpacing;

    ctx.beginPath();
    for (let y = offsetY; y < height; y += gridSpacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();

    // 3. Silhuetas de Arranha-Céus em Paralaxe Vertical e Horizontal
    const parallaxY = -cameraY * 0.15;
    this.renderCitySkyline(ctx, width, height, parallaxY, currentFloor);

    // 4. Tráfego Aéreo Noturno (Linhas de luzes de aeroveículos voando no fundo)
    this.renderFlyingTraffic(ctx, width, height, cameraY);
  }

  private static renderCitySkyline(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    parallaxY: number,
    floor: number
  ) {
    const groundBase = height + (parallaxY % 1200);

    // Camada de prédios ao fundo mais escuros
    ctx.fillStyle = '#0a0f1d';
    const buildings = [
      { x: 20, w: 70, h: 420 },
      { x: 105, w: 90, h: 560 },
      { x: 210, w: 80, h: 490 },
      { x: 305, w: 95, h: 620 },
      { x: 415, w: 75, h: 450 },
      { x: 505, w: 100, h: 580 },
    ];

    buildings.forEach((b) => {
      const bx = b.x * (width / 600);
      const bw = b.w * (width / 600);
      const by = groundBase - b.h;
      ctx.fillRect(bx, by, bw, b.h + 800);

      // Janelas acesas no prédio
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      for (let wy = by + 20; wy < by + b.h - 20; wy += 28) {
        for (let wx = bx + 8; wx < bx + bw - 12; wx += 16) {
          if ((wx + wy + floor) % 3 !== 0) {
            ctx.fillRect(wx, wy, 8, 12);
          }
        }
      }
      ctx.fillStyle = '#0a0f1d';
    });

    // Lua Gigante Estilizada se estiver acima do andar 40
    if (floor >= 35) {
      const moonY = Math.max(60, 180 - (floor - 35) * 3);
      ctx.save();
      ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
      ctx.beginPath();
      ctx.arc(width * 0.82, moonY, 65, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(width * 0.82, moonY, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  private static renderFlyingTraffic(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraY: number
  ) {
    const time = Date.now() * 0.001;
    ctx.save();
    ctx.lineWidth = 1.5;

    // Aerovia 1 (indo para a direita)
    const trafficY1 = ((height * 0.35 - cameraY * 0.1) % height + height) % height;
    const carX1 = (time * 120) % (width + 60) - 30;
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.beginPath();
    ctx.moveTo(carX1 - 25, trafficY1);
    ctx.lineTo(carX1, trafficY1);
    ctx.stroke();

    // Aerovia 2 (indo para a esquerda)
    const trafficY2 = ((height * 0.65 - cameraY * 0.1) % height + height) % height;
    const carX2 = width + 30 - ((time * 95) % (width + 60));
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
    ctx.beginPath();
    ctx.moveTo(carX2 + 25, trafficY2);
    ctx.lineTo(carX2, trafficY2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Renderiza a base estrutural urbana da torre
   */
  public static renderBase(
    ctx: CanvasRenderingContext2D,
    width: number,
    baseY: number,
    cameraY: number
  ) {
    const drawY = baseY - cameraY;

    // Plataforma de Fundação Maciça
    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, drawY, width, 400);

    // Linha de luz neon na borda superior da base
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, drawY);
    ctx.lineTo(width, drawY);
    ctx.stroke();

    // Pilares de sustentação
    ctx.fillStyle = '#1e293b';
    const pilarWidth = 36;
    for (let px = 40; px < width; px += 100) {
      ctx.fillRect(px, drawY + 3, pilarWidth, 80);
      ctx.fillStyle = '#334155';
      ctx.fillRect(px + 4, drawY + 8, pilarWidth - 8, 70);
      ctx.fillStyle = '#1e293b';
    }

    ctx.restore();
  }

  /**
   * Renderiza a torre de blocos empilhados
   */
  public static renderBlock(
    ctx: CanvasRenderingContext2D,
    block: Block,
    cameraY: number
  ) {
    const drawY = block.y - cameraY;

    ctx.save();

    // Sombra projetada e Glow Neon
    ctx.shadowColor = block.glowColor;
    ctx.shadowBlur = block.isMoving ? 16 : 8;

    // Corpo Principal do Bloco
    ctx.fillStyle = block.color;
    ctx.beginPath();
    ctx.roundRect(block.x, drawY, block.width, block.height, 4);
    ctx.fill();

    // Borda Chanfrada de Alta Tecnologia
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Brilho no topo do bloco (Specularity)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(block.x + 2, drawY + 2, Math.max(0, block.width - 4), 3);

    // Micro-painéis tecnológicos nos blocos
    if (block.width > 40) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(block.x + block.width * 0.5 - 1, drawY + 5, 2, block.height - 10);
    }

    // Se foi encaixe PERFEITO, desenha brilho dourado nas extremidades
    if (block.isPerfect) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(block.x, drawY, 3, block.height);
      ctx.fillRect(block.x + block.width - 3, drawY, 3, block.height);
    }

    ctx.restore();
  }

  /**
   * Renderiza o laser guia do bloco oscilante para a base
   */
  public static renderLaserGuide(
    ctx: CanvasRenderingContext2D,
    movingBlock: Block,
    targetY: number,
    cameraY: number
  ) {
    const startY = movingBlock.y + movingBlock.height - cameraY;
    const endY = targetY - cameraY;

    if (endY <= startY) return;

    ctx.save();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.lineWidth = 1.5;

    // Laser da esquerda
    ctx.beginPath();
    ctx.moveTo(movingBlock.x, startY);
    ctx.lineTo(movingBlock.x, endY);
    ctx.stroke();

    // Laser da direita
    ctx.beginPath();
    ctx.moveTo(movingBlock.x + movingBlock.width, startY);
    ctx.lineTo(movingBlock.x + movingBlock.width, endY);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Renderiza os pedaços cortados em queda física
   */
  public static renderSlicedPieces(
    ctx: CanvasRenderingContext2D,
    pieces: SlicedPiece[],
    cameraY: number
  ) {
    pieces.forEach((piece) => {
      const drawY = piece.y - cameraY;
      ctx.save();
      ctx.globalAlpha = piece.alpha;
      ctx.translate(piece.x + piece.width / 2, drawY + piece.height / 2);
      ctx.rotate(piece.rotation);

      ctx.fillStyle = piece.color;
      ctx.shadowColor = piece.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);

      ctx.restore();
    });
  }

  /**
   * Renderiza partículas neon
   */
  public static renderParticles(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    cameraY: number
  ) {
    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y - cameraY, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  /**
   * Renderiza textos flutuantes (+500 PERFECT! x3)
   */
  public static renderFloatingTexts(
    ctx: CanvasRenderingContext2D,
    texts: FloatingText[],
    cameraY: number
  ) {
    texts.forEach((t) => {
      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 14;
      ctx.font = `900 ${Math.round(20 * t.scale)}px 'Chakra Petch', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.text, t.x, t.y - cameraY);
      ctx.restore();
    });
  }
}
