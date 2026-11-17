import { Player, Platform, MysteryBlock, Coin, BoostPad, GravityPortal, Enemy, Pet } from '../types/game';

export class GameRenderer {
  /**
   * Renderiza os 6 biomas espaciais com atmosferas, gradientes e grades distintas para cada fase.
   */
  /**
   * Renderiza as paisagens originais icônicas de cada jogo/fase com paralaxe cinematográfica:
   * Fase 1: Mushroom Kingdom (Super Mario)
   * Fase 2: Green Hill Zone (Sonic the Hedgehog)
   * Fase 3: Santuário de Hyrule & Death Mountain (The Legend of Zelda)
   * Fase 4: Região de Kanto & Mt. Silver (Pokémon Universe)
   * Fase 5: Planeta Namek & Templo de Kami Sama (Dragon Ball)
   * Fase 6: Núcleo SuperShift (Vórtice Multidimensional)
   */
  public static renderBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    cameraY: number,
    levelNumber: number = 1
  ) {
    ctx.save();

    switch (levelNumber) {
      case 1:
        this.renderMarioLandscape(ctx, width, height, cameraX, cameraY);
        break;
      case 2:
        this.renderSonicLandscape(ctx, width, height, cameraX, cameraY);
        break;
      case 3:
        this.renderZeldaLandscape(ctx, width, height, cameraX, cameraY);
        break;
      case 4:
        this.renderPokemonLandscape(ctx, width, height, cameraX, cameraY);
        break;
      case 5:
        this.renderDragonBallLandscape(ctx, width, height, cameraX, cameraY);
        break;
      case 6:
      default:
        this.renderSuperShiftVortexLandscape(ctx, width, height, cameraX, cameraY);
        break;
    }

    ctx.restore();
  }

  // =========================================================================
  // FASE 1: MUSHROOM KINGDOM (SUPER MARIO)
  // Colinas verdes arredondadas com olhos clássicos, Castelo da Peach e Warp Pipes
  // =========================================================================
  private static renderMarioLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Céu Azul Arcade Clássico de Super Mario World
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(0.35, '#38bdf8');
    sky.addColorStop(0.75, '#bae6fd');
    sky.addColorStop(1, '#fef08a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. Nuvens fofas clássicas de Mario com olhinhos simpáticos
    const cloudParallax = (cameraX * 0.04) % 450;
    for (let cx = -cloudParallax - 200; cx < width + 200; cx += 450) {
      this.drawMarioCloud(ctx, cx + 80, 75, 1.1);
      this.drawMarioCloud(ctx, cx + 320, 130, 0.85);
    }

    // 3. Camada Distante: Castelo da Princesa Peach & Montanhas Suaves (0.07x)
    const distParallax = (cameraX * 0.07) % 700;
    for (let mx = -distParallax - 350; mx < width + 350; mx += 700) {
      // Montanhas de fundo verde suave
      ctx.fillStyle = '#0f766e';
      ctx.beginPath();
      ctx.arc(mx + 250, height * 0.75, 280, Math.PI, 0);
      ctx.fill();

      // Silhueta do Castelo da Peach
      this.drawPeachCastle(ctx, mx + 500, height * 0.58);
    }

    // 4. Camada Média: Colinas Verdes Arredondadas com os Olhos Clássicos do Mario (0.16x)
    const hillParallax = (cameraX * 0.16) % 520;
    for (let hx = -hillParallax - 260; hx < width + 260; hx += 520) {
      // Colina 1 (Mais escura / trás)
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(hx + 120, height * 0.82, 190, Math.PI, 0);
      ctx.fill();
      // Olhinhos clássicos da colina 1
      this.drawMarioHillEyes(ctx, hx + 120, height * 0.82 - 170);

      // Colina 2 (Mais clara / frente)
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(hx + 380, height * 0.88, 220, Math.PI, 0);
      ctx.fill();
      // Olhinhos clássicos da colina 2
      this.drawMarioHillEyes(ctx, hx + 380, height * 0.88 - 200);

      // Canos Verdes (Warp Pipes) distantes no topo das colinas
      this.drawWarpPipe(ctx, hx + 180, height * 0.82 - 130, 36, 45);
      this.drawWarpPipe(ctx, hx + 460, height * 0.88 - 140, 42, 50);

      // Arbustos redondos com florzinhas
      this.drawMarioBush(ctx, hx + 40, height * 0.86);
      this.drawMarioBush(ctx, hx + 300, height * 0.84);
    }
  }

  private static drawMarioCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
    ctx.shadowBlur = 12;

    // Três cúpulas brancas
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.arc(-24, 6, 17, 0, Math.PI * 2);
    ctx.arc(24, 6, 17, 0, Math.PI * 2);
    ctx.rect(-24, 6, 48, 17);
    ctx.fill();

    ctx.shadowBlur = 0;
    // Olhos simpáticos pretos
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-6, -2, 3, 9);
    ctx.fillRect(4, -2, 3, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -2, 2, 3);
    ctx.fillRect(4, -2, 2, 3);

    ctx.restore();
  }

  private static drawMarioHillEyes(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(x - 8, y, 4, 11);
    ctx.fillRect(x + 4, y, 4, 11);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 8, y, 2, 4);
    ctx.fillRect(x + 4, y, 2, 4);
  }

  private static drawPeachCastle(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Muros brancos
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-50, 0, 100, 70);

    // Torre Central Alta
    ctx.fillRect(-18, -45, 36, 50);
    // Telhado Cônico Vermelho Principal
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, -85);
    ctx.lineTo(-24, -45);
    ctx.lineTo(24, -45);
    ctx.closePath();
    ctx.fill();
    // Esfera dourada
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, -88, 4, 0, Math.PI * 2);
    ctx.fill();

    // Vitral da Princesa Peach
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(0, -20, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Torres Laterais
    const sideTowers = [-46, 46];
    for (const tx of sideTowers) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(tx - 12, -25, 24, 35);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(tx, -55);
      ctx.lineTo(tx - 15, -25);
      ctx.lineTo(tx + 15, -25);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(tx, -57, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  private static drawWarpPipe(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    // Borda do topo
    ctx.fillStyle = '#15803d';
    ctx.fillRect(x - 3, y - 12, w + 6, 14);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(x - 1, y - 10, 4, 10);
    ctx.strokeStyle = '#052e16';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - 3, y - 12, w + 6, 14);

    // Corpo do cano
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(x, y + 2, w, h);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(x + 2, y + 2, 4, h);
    ctx.strokeRect(x, y + 2, w, h);
    ctx.restore();
  }

  private static drawMarioBush(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.arc(x + 14, y - 4, 18, 0, Math.PI * 2);
    ctx.arc(x + 28, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // =========================================================================
  // FASE 2: GREEN HILL ZONE (SONIC THE HEDGEHOG)
  // Montanhas xadrez clássicas, cachoeiras cristalinas, loops 360° e palmeiras
  // =========================================================================
  private static renderSonicLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Céu Azul Tropical Dinâmico
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0369a1');
    sky.addColorStop(0.35, '#0284c7');
    sky.addColorStop(0.65, '#38bdf8');
    sky.addColorStop(1, '#67e8f9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. Oceano com Ondas e Brilho Cintilante (Sonic Horizon)
    const oceanTop = height * 0.52;
    const oceanHeight = height * 0.18;
    const oceanGrad = ctx.createLinearGradient(0, oceanTop, 0, oceanTop + oceanHeight);
    oceanGrad.addColorStop(0, '#0284c7');
    oceanGrad.addColorStop(0.6, '#06b6d4');
    oceanGrad.addColorStop(1, '#22d3ee');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, oceanTop, width, oceanHeight);

    // Linhas geométricas de ondas reflexivas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    const waveOffset = (Date.now() * 0.04) % 60;
    for (let wy = oceanTop + 8; wy < oceanTop + oceanHeight; wy += 9) {
      ctx.beginPath();
      for (let wx = -60 + waveOffset; wx < width + 60; wx += 50) {
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + 25, wy);
      }
      ctx.stroke();
    }

    // 3. Montanhas Xadrez com Cachoeiras (Paralaxe 0.07x)
    const mtnParallax = (cameraX * 0.07) % 640;
    for (let mx = -mtnParallax - 320; mx < width + 320; mx += 640) {
      this.drawSonicCheckerboardPlateau(ctx, mx + 60, height * 0.42, 220, 160);
      // Cachoeira descendo do platô
      this.drawSonicWaterfall(ctx, mx + 160, height * 0.42, 24, 150);
      this.drawSonicCheckerboardPlateau(ctx, mx + 380, height * 0.46, 190, 140);
    }

    // 4. Loop 360° Gigante de Sonic no Horizonte & Palmeiras Tropicais (Paralaxe 0.17x)
    const loopParallax = (cameraX * 0.17) % 550;
    for (let lx = -loopParallax - 275; lx < width + 275; lx += 550) {
      // Loop gigante estilizado
      this.drawSonicLoop(ctx, lx + 260, height * 0.65, 68);

      // Palmeiras Tropicais Geométricas de Green Hill
      this.drawSonicPalmTree(ctx, lx + 70, height * 0.68, 85);
      this.drawSonicPalmTree(ctx, lx + 440, height * 0.69, 75);

      // Girassóis mecânicos gigantes
      this.drawSonicSunflower(ctx, lx + 140, height * 0.72);
      this.drawSonicSunflower(ctx, lx + 360, height * 0.71);
    }
  }

  private static drawSonicCheckerboardPlateau(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    ctx.save();
    // Preenche base em xadrez terracota
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, y, w, h);

    const tileSize = 16;
    ctx.fillStyle = '#b45309';
    for (let tx = 0; tx < w; tx += tileSize) {
      for (let ty = 0; ty < h; ty += tileSize) {
        if ((Math.floor(tx / tileSize) + Math.floor(ty / tileSize)) % 2 === 0) {
          ctx.fillRect(x + tx, y + ty, Math.min(tileSize, w - tx), Math.min(tileSize, h - ty));
        }
      }
    }

    // Franja de grama verde vibrante em triângulos no topo
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x - 4, y - 6, w + 8, 8);
    for (let gx = x - 4; gx < x + w + 4; gx += 12) {
      ctx.beginPath();
      ctx.moveTo(gx, y + 2);
      ctx.lineTo(gx + 6, y + 12);
      ctx.lineTo(gx + 12, y + 2);
      ctx.fill();
    }

    ctx.restore();
  }

  private static drawSonicWaterfall(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x, y, w, h);

    // Linhas verticais de fluxo de água
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    const anim = (Date.now() * 0.08) % 16;
    for (let lineY = y; lineY < y + h; lineY += 16) {
      ctx.beginPath();
      ctx.moveTo(x + 4, lineY + anim);
      ctx.lineTo(x + 4, lineY + anim + 8);
      ctx.moveTo(x + w - 4, lineY + anim);
      ctx.lineTo(x + w - 4, lineY + anim + 8);
      ctx.stroke();
    }

    // Espuma na base
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h, w * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private static drawSonicLoop(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.translate(x, y);

    // Trilho externo xadrez
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 10;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trilhos de metal reflexivos de Sonic
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, r + 7, 0, Math.PI * 2);
    ctx.arc(0, 0, r - 7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  private static drawSonicPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number, h: number) {
    ctx.save();
    // Tronco com gomos segmentados
    const segments = 6;
    const segH = h / segments;
    for (let i = 0; i < segments; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#a16207' : '#ca8a04';
      const curY = y - (i + 1) * segH;
      ctx.fillRect(x - 5, curY, 10, segH - 1);
    }

    // Copa da Palmeira em leque de círculos
    const topY = y - h;
    const leafColors = ['#15803d', '#16a34a', '#22c55e', '#10b981'];
    const leafOffsets = [
      { dx: -24, dy: -6, r: 18 },
      { dx: 24, dy: -6, r: 18 },
      { dx: -14, dy: -20, r: 16 },
      { dx: 14, dy: -20, r: 16 },
      { dx: 0, dy: -26, r: 19 },
    ];
    leafOffsets.forEach((l, idx) => {
      ctx.fillStyle = leafColors[idx % leafColors.length];
      ctx.beginPath();
      ctx.arc(x + l.dx, topY + l.dy, l.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  private static drawSonicSunflower(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    // Caule
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 40);
    ctx.stroke();

    // Flor
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x, y - 40, 14, 0, Math.PI * 2);
    ctx.fill();

    // Centro
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(x, y - 40, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // =========================================================================
  // FASE 3: SANTUÁRIO DE HYRULE & DEATH MOUNTAIN (THE LEGEND OF ZELDA)
  // Céu crepuscular, Triforce dourada radiante, Montanha da Morte e Castelo de Hyrule
  // =========================================================================
  private static renderZeldaLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Céu Crepuscular Épico de Hyrule
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.28, '#2e1065');
    sky.addColorStop(0.55, '#701a75');
    sky.addColorStop(0.82, '#9a3412');
    sky.addColorStop(1, '#f59e0b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. A Sagrada Triforce Dourada Brilhando nos Céus
    const triforceX = width * 0.72 - (cameraX * 0.03) % width;
    const finalTriX = triforceX < -100 ? triforceX + width : triforceX;
    this.drawRadiantTriforce(ctx, finalTriX, height * 0.22, 38);

    // 3. Montanha da Morte (Death Mountain) com anéis de fumaça (Paralaxe 0.06x)
    const mtnParallax = (cameraX * 0.06) % 750;
    for (let dx = -mtnParallax - 375; dx < width + 375; dx += 750) {
      this.drawDeathMountain(ctx, dx + 240, height * 0.58);
      // Silhueta do Castelo de Hyrule ao longe
      this.drawHyruleCastle(ctx, dx + 580, height * 0.62);
    }

    // 4. Platôs de Hyrule Field & Torres Sheikah / Zonai com Glifos Cianos (Paralaxe 0.16x)
    const hyruleParallax = (cameraX * 0.16) % 520;
    for (let hx = -hyruleParallax - 260; hx < width + 260; hx += 520) {
      // Platôs e picos verdes escuros de Hyrule
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.moveTo(hx, height);
      ctx.lineTo(hx + 60, height * 0.72);
      ctx.lineTo(hx + 190, height * 0.68);
      ctx.lineTo(hx + 280, height * 0.76);
      ctx.lineTo(hx + 380, height * 0.70);
      ctx.lineTo(hx + 520, height);
      ctx.closePath();
      ctx.fill();

      // Torre Sheikah / Zonai com glifo ciano reluzente
      this.drawSheikahTower(ctx, hx + 190, height * 0.68);
      this.drawSheikahTower(ctx, hx + 380, height * 0.70);
    }
  }

  private static drawRadiantTriforce(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
    ctx.save();
    ctx.translate(x, y);

    // Glow Sagrado
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 30;

    // Raio de luz
    const rayGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, s * 2.5);
    rayGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
    rayGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = rayGrad;
    ctx.beginPath();
    ctx.arc(0, 0, s * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 3 Triângulos da Triforce (Poder, Sabedoria, Coragem)
    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2;

    const drawTri = (tx: number, ty: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(tx, ty - size);
      ctx.lineTo(tx - size * 0.866, ty + size * 0.5);
      ctx.lineTo(tx + size * 0.866, ty + size * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const half = s * 0.5;
    drawTri(0, -half * 0.6, half);       // Superior (Poder)
    drawTri(-half * 0.866, half * 0.7, half); // Esquerda (Sabedoria)
    drawTri(half * 0.866, half * 0.7, half);  // Direita (Coragem)

    ctx.restore();
  }

  private static drawDeathMountain(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Montanha Vulcânica
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.moveTo(-160, 180);
    ctx.lineTo(-40, -90);
    ctx.lineTo(40, -90);
    ctx.lineTo(160, 180);
    ctx.closePath();
    ctx.fill();

    // Fendas de Lava Vermelha
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-20, -70);
    ctx.lineTo(-35, 10);
    ctx.lineTo(-10, 60);
    ctx.moveTo(20, -70);
    ctx.lineTo(30, -10);
    ctx.lineTo(15, 80);
    ctx.stroke();

    // Os Famosos Anéis Concêntricos de Fumaça de Death Mountain
    const smokeOffset = (Date.now() * 0.02) % 60;
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
    ctx.lineWidth = 3;
    for (let r = 0; r < 3; r++) {
      const ringY = -120 - r * 45 - smokeOffset;
      const radiusX = 35 + r * 15;
      const radiusY = 9 + r * 4;
      ctx.beginPath();
      ctx.ellipse(0, ringY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  private static drawHyruleCastle(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#1e1b4b';

    // Muros principais e bastilhas
    ctx.fillRect(-45, 0, 90, 80);

    // Agulhas góticas esguias
    const spires = [-30, 0, 30];
    spires.forEach((sx, idx) => {
      const h = idx === 1 ? 65 : 45;
      ctx.fillRect(sx - 8, -h, 16, h);
      ctx.beginPath();
      ctx.moveTo(sx, -h - 30);
      ctx.lineTo(sx - 10, -h);
      ctx.lineTo(sx + 10, -h);
      ctx.closePath();
      ctx.fill();
    });

    ctx.restore();
  }

  private static drawSheikahTower(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    // Estrutura em obelisco Sheikah
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x - 8, y - 65, 16, 65);
    // Cúpula superior
    ctx.beginPath();
    ctx.arc(x, y - 70, 10, 0, Math.PI * 2);
    ctx.fill();

    // Glifos cianos brilhantes (Zonai / Sheikah energy)
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 8;
    ctx.fillRect(x - 2, y - 55, 4, 8);
    ctx.fillRect(x - 2, y - 35, 4, 8);
    ctx.beginPath();
    ctx.arc(x, y - 70, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // FASE 4: REGIÃO DE KANTO & INDIGO PLATEAU (POKÉMON UNIVERSE)
  // Céu noturno com lua cheia, silhueta de pássaro lendário, Mt. Silver e Centro Pokémon
  // =========================================================================
  private static renderPokemonLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Céu Noturno Estrelado de Kanto
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#090514');
    sky.addColorStop(0.35, '#1e1035');
    sky.addColorStop(0.7, '#3b0764');
    sky.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. Grande Lua Cheia e Pássaro Lendário Voando (Lugia / Articuno)
    const moonX = width * 0.28 - (cameraX * 0.02) % width;
    const finalMoonX = moonX < -100 ? moonX + width : moonX;
    this.drawPokemonMoon(ctx, finalMoonX, height * 0.22, 42);

    // 3. Mt. Silver Nevado & Pokébola Gigante no Horizonte (Paralaxe 0.06x)
    const mtnParallax = (cameraX * 0.06) % 720;
    for (let px = -mtnParallax - 360; px < width + 360; px += 720) {
      this.drawMtSilver(ctx, px + 220, height * 0.58);
      this.drawCosmicPokeball(ctx, px + 520, height * 0.44, 45);
    }

    // 4. Centro Pokémon & Floresta de Viridian (Paralaxe 0.16x)
    const forParallax = (cameraX * 0.16) % 500;
    for (let fx = -forParallax - 250; fx < width + 250; fx += 500) {
      // Centro Pokémon característico com teto curvo vermelho
      this.drawPokemonCenter(ctx, fx + 120, height * 0.65);

      // Aglomerados de árvores clássicas de Pokémon
      this.drawPokemonTree(ctx, fx + 260, height * 0.68, '#064e3b');
      this.drawPokemonTree(ctx, fx + 320, height * 0.66, '#047857');
      this.drawPokemonTree(ctx, fx + 420, height * 0.67, '#065f46');
    }
  }

  private static drawPokemonMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.translate(x, y);

    // Glow lunar
    ctx.shadowColor = 'rgba(192, 132, 252, 0.5)';
    ctx.shadowBlur = 30;

    // Disco da Lua
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Silhueta do Pássaro Lendário em pleno voo sobre a lua
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.quadraticCurveTo(-25, -20, -35, -15);
    ctx.quadraticCurveTo(-20, -5, -10, 0);
    ctx.lineTo(-5, 12); // Cauda
    ctx.lineTo(0, 0);
    ctx.quadraticCurveTo(10, -5, 25, -15);
    ctx.quadraticCurveTo(15, -20, 0, -5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private static drawMtSilver(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Montanha rochosa escura
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(-140, 150);
    ctx.lineTo(0, -85);
    ctx.lineTo(140, 150);
    ctx.closePath();
    ctx.fill();

    // Picos de Neve Eterna
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(0, -85);
    ctx.lineTo(-35, -35);
    ctx.lineTo(-10, -45);
    ctx.lineTo(15, -30);
    ctx.lineTo(35, -40);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private static drawCosmicPokeball(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 15;

    // Metade Vermelha Superior
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, 0, r, Math.PI, 0);
    ctx.fill();

    // Metade Branca Inferior
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI);
    ctx.fill();

    // Faixa preta central
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-r, -r * 0.12, r * 2, r * 0.24);

    // Botão central iluminado
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawPokemonCenter(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Prédio Base
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(-40, 0, 80, 50);

    // Teto Curvo Vermelho
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, 0, 42, Math.PI, 0);
    ctx.fill();

    // Janelas Iluminadas
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-25, 15, 15, 20);
    ctx.fillRect(10, 15, 15, 20);

    // Emblema Central
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -12, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawPokemonTree(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    ctx.save();
    // Tronco
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - 5, y - 20, 10, 20);

    // Copa esférica em camadas
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y - 35, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 50, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // FASE 5: PLANETA NAMEK & TEMPLO DE KAMI SAMA (DRAGON BALL)
  // Céu esmeralda com três sóis, plataforma flutuante de Kami Sama e árvores de Namek
  // =========================================================================
  private static renderDragonBallLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Céu Alienígena Verde-Turquesa Inconfundível de Namekusei
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#022c22');
    sky.addColorStop(0.35, '#065f46');
    sky.addColorStop(0.7, '#0d9488');
    sky.addColorStop(1, '#2dd4bf');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. Os Três Sóis de Namekusei em Órbita
    const sun1X = width * 0.22 - (cameraX * 0.02) % width;
    const finalSun1 = sun1X < -80 ? sun1X + width : sun1X;
    this.drawCelestialSun(ctx, finalSun1, height * 0.2, 32, '#fef08a', 'rgba(254, 240, 138, 0.4)');

    const sun2X = width * 0.58 - (cameraX * 0.025) % width;
    const finalSun2 = sun2X < -80 ? sun2X + width : sun2X;
    this.drawCelestialSun(ctx, finalSun2, height * 0.16, 24, '#99f6e4', 'rgba(153, 246, 228, 0.35)');

    const sun3X = width * 0.82 - (cameraX * 0.018) % width;
    const finalSun3 = sun3X < -80 ? sun3X + width : sun3X;
    this.drawCelestialSun(ctx, finalSun3, height * 0.28, 18, '#fed7aa', 'rgba(254, 215, 170, 0.35)');

    // 3. Templo Sagrado de Kami Sama (Kami's Lookout) Flutuando nas Nuvens (Paralaxe 0.05x)
    const lookoutX = width * 0.65 - (cameraX * 0.05) % (width * 1.5);
    const finalLookout = lookoutX < -200 ? lookoutX + width * 1.5 : lookoutX;
    this.drawKamiLookout(ctx, finalLookout, height * 0.28);

    // 4. Pilares Cilíndricos Verticais de Namek & Árvores Azuis Esféricas (Paralaxe 0.16x)
    const namekParallax = (cameraX * 0.16) % 540;
    for (let nx = -namekParallax - 270; nx < width + 270; nx += 540) {
      // Platô cilíndrico clássico com topo reto
      this.drawNamekPillar(ctx, nx + 60, height * 0.54, 110, 220);
      this.drawNamekPillar(ctx, nx + 340, height * 0.58, 130, 200);

      // Árvores exóticas de Namek com copas azuis
      this.drawNamekTree(ctx, nx + 190, height * 0.72);
      this.drawNamekTree(ctx, nx + 250, height * 0.70);
      this.drawNamekTree(ctx, nx + 490, height * 0.73);

      // Gêiser de Ki Dourado ascendendo do solo
      this.drawKiGeyser(ctx, nx + 220, height * 0.74);
    }
  }

  private static drawCelestialSun(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color: string,
    glow: string
  ) {
    ctx.save();
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private static drawKamiLookout(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Plataforma Dourada Semicilíndrica de Kami Sama
    ctx.fillStyle = '#ca8a04';
    ctx.beginPath();
    ctx.ellipse(0, 0, 75, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#eab308';
    ctx.fillRect(-75, 0, 150, 16);
    ctx.beginPath();
    ctx.ellipse(0, 16, 75, 20, 0, 0, Math.PI);
    ctx.fill();

    // Palácio Central com Cúpula Branca e Detalhes Vermelhos
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-22, -18, 44, 18);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -18, 16, Math.PI, 0);
    ctx.fill();

    // Palmeiras Sagradas na Borda
    const palmPositions = [-55, -35, 35, 55];
    ctx.fillStyle = '#10b981';
    palmPositions.forEach((px) => {
      ctx.fillRect(px - 1.5, -12, 3, 12);
      ctx.beginPath();
      ctx.arc(px, -14, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  private static drawNamekPillar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    ctx.save();
    // Corpo cilíndrico da rocha
    ctx.fillStyle = '#134e4a';
    ctx.fillRect(x, y, w, h);

    // Sombra lateral
    ctx.fillStyle = '#042f2e';
    ctx.fillRect(x + w * 0.7, y, w * 0.3, h);

    // Topo plano coberto de grama verde-azulada
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x - 4, y - 6, w + 8, 8);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y - 3, w / 2 + 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawNamekTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    // Tronco fino e esguio
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 55);
    ctx.stroke();

    // Copa esférica azul-cobalto de Namek
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(x, y - 62, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(x - 4, y - 66, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawKiGeyser(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    const anim = Math.sin(Date.now() * 0.008) * 0.2 + 0.8;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.35)';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.moveTo(x - 10 * anim, y);
    ctx.lineTo(x, y - 90 * anim);
    ctx.lineTo(x + 10 * anim, y);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // FASE 6: NÚCLEO SUPERSHIFT - VÓRTICE MULTIDIMENSIONAL FINAL
  // A convergência épica de todos os universos: ilhas dimensionais e vórtice quântico
  // =========================================================================
  private static renderSuperShiftVortexLandscape(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cameraX: number,
    _cameraY: number
  ) {
    // 1. Espaço Cósmico Hiper-dimensional
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#030712');
    sky.addColorStop(0.4, '#17072b');
    sky.addColorStop(0.8, '#0c1b33');
    sky.addColorStop(1, '#052e16');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // 2. O Grande Vórtice Dimensional Espiral (Convergência de Todas as Realidades)
    const vortexCenterX = width * 0.5 - (cameraX * 0.03) % width;
    const finalVortexX = vortexCenterX < -200 ? vortexCenterX + width : vortexCenterX;
    this.drawMultiverseVortex(ctx, finalVortexX, height * 0.35);

    // 3. Ilhas Dimensionais Flutuantes com Elementos de Cada Universo (Paralaxe 0.14x)
    const islandParallax = (cameraX * 0.14) % 650;
    for (let ix = -islandParallax - 325; ix < width + 325; ix += 650) {
      // Ilha 1: Fragmento do Mario (Warp Pipe & Blocos)
      this.drawFloatingIsland(ctx, ix + 80, height * 0.55, 110, '#15803d', 'mario');
      // Ilha 2: Fragmento do Sonic (Green Hill Checkerboard)
      this.drawFloatingIsland(ctx, ix + 280, height * 0.45, 120, '#b45309', 'sonic');
      // Ilha 3: Fragmento de Zelda (Santuário com Triforce)
      this.drawFloatingIsland(ctx, ix + 490, height * 0.58, 130, '#064e3b', 'zelda');
    }

    // 4. Feixes de Antigravidade e Dobra Espacial
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 1;
    const streamOffset = (Date.now() * 0.05) % 80;
    for (let sy = 40; sy < height; sy += 80) {
      ctx.beginPath();
      ctx.moveTo(0, sy + Math.sin(streamOffset * 0.1) * 8);
      ctx.lineTo(width, sy - Math.cos(streamOffset * 0.1) * 8);
      ctx.stroke();
    }
  }

  private static drawMultiverseVortex(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    const time = Date.now() * 0.0015;
    ctx.rotate(time * 0.4);

    // Espirais em camadas com as cores icônicas dos 5 universos
    const spiralRings = [
      { r: 140, color: 'rgba(239, 68, 68, 0.35)' }, // Vermelho Mario
      { r: 110, color: 'rgba(59, 130, 246, 0.4)' },  // Azul Sonic
      { r: 85, color: 'rgba(234, 179, 8, 0.45)' },  // Ouro Dragon Ball
      { r: 60, color: 'rgba(16, 185, 129, 0.5)' },  // Verde Zelda
      { r: 35, color: 'rgba(168, 85, 247, 0.6)' },  // Roxo Pokémon
    ];

    spiralRings.forEach((ring) => {
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(0, 0, ring.r, 0, Math.PI * 1.6);
      ctx.stroke();
    });

    // Núcleo SuperShift de Gravidade Zero
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawFloatingIsland(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    topColor: string,
    type: 'mario' | 'sonic' | 'zelda'
  ) {
    ctx.save();
    ctx.translate(x, y);

    // Massa de terra flutuante (cristal pontiagudo invertido embaixo)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-w / 2, 0);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(0, w * 0.45);
    ctx.closePath();
    ctx.fill();

    // Superfície
    ctx.fillStyle = topColor;
    ctx.fillRect(-w / 2 - 2, -4, w + 4, 6);

    // Elementos temáticos sobre a ilha
    if (type === 'mario') {
      this.drawWarpPipe(ctx, -14, -30, 28, 30);
    } else if (type === 'sonic') {
      // Anel dourado flutuante
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, -22, 10, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === 'zelda') {
      // Mini Triforce brilhante
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(0, -28);
      ctx.lineTo(-10, -10);
      ctx.lineTo(10, -10);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Renderiza o Jogador de acordo com o Herói selecionado:
   * Donkey Kong, Ash (Pokémon), Link (Zelda), Super Encanador (Mario), Ouriço (Sonic), Saiyajin (Goku).
   */
  public static renderPlayer(
    ctx: CanvasRenderingContext2D,
    player: Player,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = player.x - cameraX;
    const drawY = player.y - cameraY;

    ctx.save();
    ctx.translate(drawX + player.width / 2, drawY + player.height / 2);

    if (player.gravityInverted) {
      ctx.scale(1, -1);
    }

    if (player.facing === 'left') {
      ctx.scale(-1, 1);
    }

    if (player.invulnerableTime > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // Efeito de Star Power (Invencibilidade Cósmica)
    if (player.starPowerTime > 0) {
      const rainbowColors = ['#f43f5e', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'];
      const starColor = rainbowColors[Math.floor(Date.now() / 60) % rainbowColors.length];
      ctx.shadowColor = starColor;
      ctx.shadowBlur = 25;
    } else if (player.isBoosting) {
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 20;
    }

    const w = player.width;
    const h = player.height;
    const ox = -w / 2;
    const oy = -h / 2;

    const runCycle = Math.sin(player.animFrame * Math.PI * 0.5);
    const legSwing = player.state === 'running' ? runCycle * 9 : 0;
    const armSwing = player.state === 'running' ? -runCycle * 10 : 0;
    const breathe = player.state === 'idle' ? Math.sin(Date.now() * 0.005) * 1.5 : 0;

    const charId = player.characterId || 'dk';

    if (charId === 'ash') {
      this.drawAsh(ctx, ox, oy, legSwing, armSwing, breathe);
    } else if (charId === 'link') {
      this.drawLink(ctx, ox, oy, legSwing, armSwing, breathe);
    } else if (charId === 'mario') {
      this.drawMario(ctx, ox, oy, legSwing, armSwing, breathe);
    } else if (charId === 'sonic') {
      this.drawSonic(ctx, ox, oy, legSwing, armSwing, breathe);
    } else if (charId === 'goku') {
      this.drawGoku(ctx, ox, oy, legSwing, armSwing, breathe, player.isBoosting || player.starPowerTime > 0);
    } else {
      // Padrão: Donkey Kong (Lorde da Selva)
      this.drawDonkeyKong(ctx, ox, oy, legSwing, armSwing, breathe);
    }

    ctx.restore();
  }

  // 1. DONKEY KONG (O Rei da Selva / Gravata DK Icônica)
  private static drawDonkeyKong(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number
  ) {
    const furDark = '#451a03';
    const furMain = '#78350f';
    const furLight = '#92400e';
    const tanSkin = '#fed7aa';

    // 1. Pernas Musculosas e Patas de Gorila (Totalmente contíguas, sem vão)
    const legL_X = ox + 9 + legSwing * 0.6;
    const legR_X = ox + 19 - legSwing * 0.6;
    const legY = oy + 32 + breathe;

    // Coxas e pernas de pelagem marrom
    ctx.fillStyle = furDark;
    ctx.fillRect(legL_X - 1, legY, 9, 13);
    ctx.fillStyle = furMain;
    ctx.fillRect(legR_X - 1, legY, 9, 13);

    // Patas e dedos de primata
    ctx.fillStyle = furDark;
    ctx.fillRect(legL_X - 3, legY + 10, 12, 5);
    ctx.fillRect(legR_X - 3, legY + 10, 12, 5);
    // Dedos dos pés em tom bege
    ctx.fillStyle = tanSkin;
    ctx.fillRect(legL_X - 2, legY + 13, 10, 2);
    ctx.fillRect(legR_X - 2, legY + 13, 10, 2);

    // 2. Tronco Maciço de Gorila e Peitoral Bege Musculoso
    const torsoX = ox + 5;
    const torsoY = oy + 16 + breathe;
    const torsoW = 26;
    const torsoH = 18;

    // Pelagem marrom do torso
    ctx.fillStyle = furMain;
    ctx.fillRect(torsoX, torsoY, torsoW, torsoH);

    // Peitoral e barriga em tom pele/bege com contornos
    ctx.fillStyle = tanSkin;
    ctx.beginPath();
    ctx.roundRect(torsoX + 5, torsoY + 3, 16, 14, 3);
    ctx.fill();
    // Divisão peitoral sutil
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(torsoX + 12, torsoY + 4, 2, 7);

    // 3. Gravata Vermelha Icônica com "DK" em Dourado
    ctx.fillStyle = '#dc2626';
    // Nó da gravata
    ctx.fillRect(torsoX + 10, torsoY + 2, 6, 3);
    // Corpo triangular da gravata
    ctx.beginPath();
    ctx.moveTo(torsoX + 10, torsoY + 4);
    ctx.lineTo(torsoX + 16, torsoY + 4);
    ctx.lineTo(torsoX + 18, torsoY + 15);
    ctx.lineTo(torsoX + 13, torsoY + 18);
    ctx.lineTo(torsoX + 8, torsoY + 15);
    ctx.closePath();
    ctx.fill();

    // Texto "DK" em amarelo ouro na gravata
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 7px Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DK', torsoX + 13, torsoY + 11);

    // 4. Braços e Punhos Fortes de Gorila
    const armL_Y = torsoY + 2 - armSwing * 0.45;
    const armR_Y = torsoY + 2 + armSwing * 0.45;

    // Braço esquerdo
    ctx.fillStyle = furDark;
    ctx.fillRect(ox + 1, armL_Y, 6, 13);
    ctx.fillStyle = tanSkin; // Mão/punho bege
    ctx.fillRect(ox, armL_Y + 11, 7, 5);

    // Braço direito
    ctx.fillStyle = furMain;
    ctx.fillRect(ox + 29, armR_Y, 6, 13);
    ctx.fillStyle = tanSkin; // Mão/punho bege
    ctx.fillRect(ox + 29, armR_Y + 11, 7, 5);

    // 5. Cabeça de Donkey Kong com Topete Cônico Icônico
    const headX = ox + 9;
    const headY = oy + 3 + breathe;

    // Orelhas arredondadas
    ctx.fillStyle = furDark;
    ctx.fillRect(headX - 3, headY + 6, 4, 5);
    ctx.fillRect(headX + 17, headY + 6, 4, 5);
    ctx.fillStyle = tanSkin;
    ctx.fillRect(headX - 2, headY + 7, 2, 3);
    ctx.fillRect(headX + 17, headY + 7, 2, 3);

    // Cabeça marrom
    ctx.fillStyle = furMain;
    ctx.fillRect(headX, headY + 2, 18, 14);

    // Topete cônico arrepiado clássico do DK
    ctx.fillStyle = furLight;
    ctx.beginPath();
    ctx.moveTo(headX + 4, headY + 3);
    ctx.lineTo(headX + 10, headY - 6);
    ctx.lineTo(headX + 14, headY + 3);
    ctx.closePath();
    ctx.fill();

    // Sobrancelhas primata marcantes
    ctx.fillStyle = furDark;
    ctx.fillRect(headX + 2, headY + 4, 14, 3);

    // Olhos Expressivos
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 3, headY + 5, 5, 4);
    ctx.fillRect(headX + 10, headY + 5, 5, 4);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(headX + 5, headY + 6, 2, 3);
    ctx.fillRect(headX + 12, headY + 6, 2, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 6, headY + 6, 1, 1);
    ctx.fillRect(headX + 13, headY + 6, 1, 1);

    // Focinho e Maxilar Saliente em Bege Claro (Muzzle)
    ctx.fillStyle = tanSkin;
    ctx.beginPath();
    ctx.roundRect(headX + 1, headY + 9, 16, 8, 3);
    ctx.fill();

    // Narinas
    ctx.fillStyle = furDark;
    ctx.fillRect(headX + 6, headY + 10, 2, 2);
    ctx.fillRect(headX + 10, headY + 10, 2, 2);

    // Sorriso alegre e dentes
    ctx.fillStyle = furDark;
    ctx.fillRect(headX + 4, headY + 13, 10, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 5, headY + 13, 8, 1);
  }

  // 2. ASH / RED (Inspirado em Pokémon)
  private static drawAsh(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number
  ) {
    const skin = '#fcd34d';

    // 1. Pernas da Calça Jeans Azul (Contíguas do quadril até o tênis)
    const legL_X = ox + 11 + legSwing * 0.6;
    const legR_X = ox + 20 - legSwing * 0.6;
    const legY = oy + 32 + breathe;

    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(legL_X - 1, legY, 7, 13);
    ctx.fillRect(legR_X - 1, legY, 7, 13);

    // Barra da calça
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(legL_X - 1, legY + 10, 7, 3);
    ctx.fillRect(legR_X - 1, legY + 10, 7, 3);

    // 2. Tênis Vermelho e Branco
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legL_X - 2, legY + 11, 9, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(legL_X + 1, legY + 11, 3, 2);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legR_X - 2, legY + 11, 9, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(legR_X + 1, legY + 11, 3, 2);

    // 3. Pélvis e Cinto da calça jeans
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(ox + 8, oy + 29 + breathe, 20, 7);

    // 4. Colete Azul com Camisa Preta e Gola Branca
    const torsoX = ox + 8;
    const torsoY = oy + 16 + breathe;
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(torsoX, torsoY, 20, 15);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(torsoX + 6, torsoY, 8, 15);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(torsoX + 4, torsoY - 2, 12, 3); // Gola

    // Luvas Verdes sem Dedos
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(ox + 4, torsoY + 7 - armSwing * 0.4, 4, 6);
    ctx.fillRect(ox + 26, torsoY + 7 + armSwing * 0.4, 4, 6);

    // Cabeça
    const headX = ox + 11;
    const headY = oy + 3 + breathe;
    ctx.fillStyle = skin;
    ctx.fillRect(headX, headY, 15, 14);

    // Cabelo Espetado Preto atrás
    ctx.fillStyle = '#18181b';
    ctx.fillRect(headX - 3, headY + 5, 4, 7);

    // Boné de Treinador Vermelho e Branco com Aba
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(headX - 1, headY - 5, 17, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 2, headY - 2, 11, 4);
    // Aba do boné apontando para frente
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 11, headY + 1, 6, 2.5);
    // Símbolo da Pokébola no boné
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(headX + 6, headY - 1, 3, 3);

    // Olhos
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(headX + 9, headY + 6, 2, 3);
  }

  // 3. LINK (Inspirado em The Legend of Zelda)
  private static drawLink(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number
  ) {
    const skin = '#fde68a';

    // 1. Calça Branca/Creme de Hyrule (Totalmente contígua da túnica às botas)
    const legL_X = ox + 11 + legSwing * 0.6;
    const legR_X = ox + 20 - legSwing * 0.6;
    const legY = oy + 32 + breathe;

    ctx.fillStyle = '#fef3c7'; // Calça creme clássica
    ctx.fillRect(legL_X - 1, legY, 7, 12);
    ctx.fillRect(legR_X - 1, legY, 7, 12);

    // 2. Botas Marrons de Aventura
    ctx.fillStyle = '#78350f';
    ctx.fillRect(legL_X - 2, legY + 8, 9, 8);
    ctx.fillRect(legR_X - 2, legY + 8, 9, 8);
    // Dobra superior da bota de couro
    ctx.fillStyle = '#92400e';
    ctx.fillRect(legL_X - 2, legY + 8, 9, 2.5);
    ctx.fillRect(legR_X - 2, legY + 8, 9, 2.5);

    // 3. Túnica Verde de Herói com Cinto Marrom
    const torsoX = ox + 7;
    const torsoY = oy + 16 + breathe;
    ctx.fillStyle = '#15803d'; // Verde Herói
    ctx.fillRect(torsoX, torsoY, 22, 18); // Cobre o quadril e conecta à calça

    // Cinto Marrom com fivela dourada
    ctx.fillStyle = '#451a03';
    ctx.fillRect(torsoX, torsoY + 11, 22, 3.5);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(torsoX + 9, torsoY + 10, 4, 5);

    // Escudo Hylian nas costas
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(ox + 4, torsoY + 2, 5, 12);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(ox + 5, torsoY + 6, 3, 3); // Triforce no escudo

    // Braços com mangas verdes
    ctx.fillStyle = '#15803d';
    ctx.fillRect(ox + 4, torsoY + 2 - armSwing * 0.4, 4, 8);
    ctx.fillRect(ox + 26, torsoY + 2 + armSwing * 0.4, 4, 8);

    // Cabeça e Cabelos Loiros
    const headX = ox + 11;
    const headY = oy + 3 + breathe;
    ctx.fillStyle = skin;
    ctx.fillRect(headX, headY, 15, 14);

    // Cabelos Loiros caídos
    ctx.fillStyle = '#facc15';
    ctx.fillRect(headX - 1, headY + 3, 4, 8);
    ctx.fillRect(headX + 4, headY + 1, 8, 4);

    // Gorro Verde Pontudo clássico que se estende para trás
    ctx.fillStyle = '#15803d';
    ctx.fillRect(headX, headY - 5, 16, 6);
    ctx.beginPath();
    ctx.moveTo(headX, headY - 4);
    ctx.lineTo(headX - 8, headY + 4);
    ctx.lineTo(headX + 2, headY - 1);
    ctx.fill();

    // Olhos Azuis
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(headX + 10, headY + 6, 2, 3);
  }

  // 4. SUPER ENCANADOR (Inspirado em Mario)
  private static drawMario(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number
  ) {
    const skin = '#fcd34d';

    // 1. Calça Jeans Azul do Macacão (Preenchimento contíguo essencial!)
    const legL_X = ox + 11 + legSwing * 0.6;
    const legR_X = ox + 20 - legSwing * 0.6;
    const legY = oy + 32 + breathe;

    ctx.fillStyle = '#1d4ed8'; // Perna esquerda azul macacão
    ctx.fillRect(legL_X - 2, legY, 8, 12);
    ctx.fillStyle = '#2563eb'; // Perna direita azul macacão
    ctx.fillRect(legR_X - 2, legY, 8, 12);

    // 2. Sapato Marrom de Trabalho clássico do Mario
    ctx.fillStyle = '#78350f';
    ctx.fillRect(legL_X - 4, legY + 10, 11, 6);
    ctx.fillRect(legR_X - 4, legY + 10, 11, 6);
    // Solado
    ctx.fillStyle = '#451a03';
    ctx.fillRect(legL_X - 4, legY + 14, 11, 2);
    ctx.fillRect(legR_X - 4, legY + 14, 11, 2);

    // 3. Camisa Vermelha e Macacão Azul do Torso
    const torsoX = ox + 7;
    const torsoY = oy + 16 + breathe;
    ctx.fillStyle = '#dc2626'; // Camisa vermelha base
    ctx.fillRect(torsoX, torsoY, 22, 16);

    ctx.fillStyle = '#2563eb'; // Macacão azul parte superior
    ctx.fillRect(torsoX + 2, torsoY + 5, 18, 14);
    // Alças do macacão
    ctx.fillRect(torsoX + 3, torsoY, 4, 8);
    ctx.fillRect(torsoX + 15, torsoY, 4, 8);
    // Botões amarelos do macacão
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(torsoX + 4, torsoY + 5, 3, 3);
    ctx.fillRect(torsoX + 16, torsoY + 5, 3, 3);

    // Luvas Brancas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ox + 3, torsoY + 6 - armSwing * 0.4, 5, 6);
    ctx.fillRect(ox + 26, torsoY + 6 + armSwing * 0.4, 5, 6);

    // Cabeça
    const headX = ox + 10;
    const headY = oy + 2 + breathe;
    ctx.fillStyle = skin;
    ctx.fillRect(headX, headY, 16, 15);

    // Bigode Proeminente Italiano
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(headX + 7, headY + 9, 9, 4);

    // Boina Vermelha clássica com aba
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(headX - 1, headY - 6, 18, 8);
    ctx.fillRect(headX + 12, headY - 1, 6, 3); // Aba

    // Emblema Branco da boina
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(headX + 8, headY - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Olhos
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(headX + 10, headY + 5, 2, 3);
  }

  // 5. OURIÇO SUPERSÔNICO (Inspirado em Sonic)
  private static drawSonic(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number
  ) {
    const sonicBlue = '#2563eb';
    const darkSonicBlue = '#1d4ed8';
    const peach = '#fed7aa';

    // 1. Pernas Azuis Finas e Ágeis de Sonic (Conectam o corpo aos tênis)
    const legL_X = ox + 11 + legSwing * 0.7;
    const legR_X = ox + 20 - legSwing * 0.7;
    const legY = oy + 31 + breathe;

    ctx.fillStyle = darkSonicBlue;
    ctx.fillRect(legL_X, legY, 5, 13);
    ctx.fillStyle = sonicBlue;
    ctx.fillRect(legR_X, legY, 5, 13);

    // 2. Meias Brancas Dobradas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(legL_X - 2, legY + 9, 9, 4);
    ctx.fillRect(legR_X - 2, legY + 9, 9, 4);

    // 3. Tênis Vermelhos com Fivela Dourada e Faixa Branca
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(legL_X - 4, legY + 11, 12, 6);
    ctx.fillRect(legR_X - 4, legY + 11, 12, 6);
    // Faixa branca
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(legL_X + 1, legY + 10, 3, 7);
    ctx.fillRect(legR_X + 1, legY + 10, 3, 7);
    // Fivela dourada
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(legL_X + 4, legY + 12, 2.5, 3);
    ctx.fillRect(legR_X + 4, legY + 12, 2.5, 3);

    // 4. Corpo de Ouriço Azul com Barriga Bege
    const torsoX = ox + 8;
    const torsoY = oy + 17 + breathe;
    ctx.fillStyle = sonicBlue;
    ctx.fillRect(torsoX, torsoY, 20, 16);
    ctx.fillStyle = peach;
    ctx.beginPath();
    ctx.arc(torsoX + 10, torsoY + 8, 6, 0, Math.PI * 2);
    ctx.fill();

    // Luvas Brancas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ox + 3, torsoY + 5 - armSwing * 0.5, 6, 7);
    ctx.fillRect(ox + 26, torsoY + 5 + armSwing * 0.5, 6, 7);

    // Cabeça Azul com Focinho Bege
    const headX = ox + 11;
    const headY = oy + 3 + breathe;
    ctx.fillStyle = sonicBlue;
    ctx.fillRect(headX, headY, 15, 14);

    // 3 Espinhos Azuis Aerodinâmicos para trás
    ctx.fillStyle = sonicBlue;
    ctx.beginPath();
    ctx.moveTo(headX, headY + 2);
    ctx.lineTo(headX - 12, headY - 3);
    ctx.lineTo(headX, headY + 6);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(headX, headY + 6);
    ctx.lineTo(headX - 14, headY + 6);
    ctx.lineTo(headX, headY + 11);
    ctx.fill();

    // Focinho e Boca
    ctx.fillStyle = peach;
    ctx.fillRect(headX + 7, headY + 6, 8, 7);
    ctx.fillStyle = '#000000';
    ctx.fillRect(headX + 14, headY + 6, 2.5, 2.5); // Nariz preto

    // Olhos Verdes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 8, headY + 3, 5, 5);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(headX + 10, headY + 4, 2, 3);
  }

  // 6. GUERREIRO SAIYAJIN (Inspirado em Dragon Ball / Goku)
  private static drawGoku(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    legSwing: number,
    armSwing: number,
    breathe: number,
    isSuperSaiyan: boolean
  ) {
    const skin = '#fed7aa';
    const hairColor = isSuperSaiyan ? '#fde047' : '#18181b'; // Dourado em Boost!

    // 1. Calça Laranja do Gi de Artes Marciais (Preenchimento contíguo essencial!)
    const legL_X = ox + 11 + legSwing * 0.6;
    const legR_X = ox + 20 - legSwing * 0.6;
    const legY = oy + 32 + breathe;

    ctx.fillStyle = '#ea580c'; // Perna esquerda da calça laranja
    ctx.fillRect(legL_X - 2, legY, 8, 12);
    ctx.fillStyle = '#f97316'; // Perna direita da calça laranja
    ctx.fillRect(legR_X - 2, legY, 8, 12);

    // 2. Botas de Artes Marciais Azul Escuro com amarrações vermelhas
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(legL_X - 2, legY + 8, 8, 8);
    ctx.fillRect(legR_X - 2, legY + 8, 8, 8);
    // Faixa/cordão vermelho das botas
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legL_X, legY + 10, 4, 2);
    ctx.fillRect(legR_X, legY + 10, 4, 2);
    // Solado bege das botas de artes marciais
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(legL_X - 2, legY + 14, 8, 2);
    ctx.fillRect(legR_X - 2, legY + 14, 8, 2);

    // 3. Gi Laranja de Artes Marciais com decote e faixa azul
    const torsoX = ox + 7;
    const torsoY = oy + 17 + breathe;
    ctx.fillStyle = '#ea580c'; // Laranja base
    ctx.fillRect(torsoX, torsoY, 22, 17);
    // Camiseta interna azul marinho visível no decote
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(torsoX + 7, torsoY, 8, 7);
    // Faixa azul amarrada na cintura
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(torsoX, torsoY + 11, 22, 4);

    // Munhequeiras Azuis
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(ox + 4, torsoY + 5 - armSwing * 0.4, 4, 6);
    ctx.fillRect(ox + 26, torsoY + 5 + armSwing * 0.4, 4, 6);

    // Cabeça
    const headX = ox + 10;
    const headY = oy + 3 + breathe;
    ctx.fillStyle = skin;
    ctx.fillRect(headX, headY, 16, 14);

    // Cabelo Espetado Volumoso Saiyajin (Preto ou Dourado Super Saiyajin!)
    ctx.fillStyle = hairColor;
    if (isSuperSaiyan) {
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
    }

    // Pontas de espinhos do cabelo Saiyajin
    const spikes = [
      { x: headX + 2, y: headY - 8, w: 6, h: 9 },
      { x: headX + 7, y: headY - 11, w: 7, h: 12 },
      { x: headX + 13, y: headY - 7, w: 6, h: 8 },
      { x: headX - 5, y: headY - 3, w: 8, h: 7 },
      { x: headX - 6, y: headY + 3, w: 7, h: 6 },
    ];
    spikes.forEach((s) => {
      ctx.fillRect(s.x, s.y, s.w, s.h);
    });

    // Olhos determinados
    ctx.fillStyle = isSuperSaiyan ? '#38bdf8' : '#18181b'; // Olhos verdes/azuis se for SSJ!
    ctx.fillRect(headX + 10, headY + 6, 3, 3);
  }

  /**
   * Renderiza os Pocket Pets flutuantes estilo Pokémon que seguem o Jogador.
   */
  public static renderPet(
    ctx: CanvasRenderingContext2D,
    pet: Pet,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = pet.x - cameraX;
    const drawY = pet.y - cameraY;

    ctx.save();
    ctx.translate(drawX, drawY);

    ctx.shadowColor = pet.glowColor;
    ctx.shadowBlur = 15;

    ctx.fillStyle = pet.color;
    ctx.beginPath();
    ctx.arc(0, 0, pet.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-2, -1, 2.5, 0, Math.PI * 2);
    ctx.arc(3, -1, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.arc(-1.5, -1, 1.2, 0, Math.PI * 2);
    ctx.arc(3.5, -1, 1.2, 0, Math.PI * 2);
    ctx.fill();

    if (pet.type === 'FIRE') {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-3, -pet.size);
      ctx.lineTo(0, -pet.size - 6 + Math.sin(Date.now() * 0.01) * 2);
      ctx.lineTo(3, -pet.size);
      ctx.fill();
    } else if (pet.type === 'FLY') {
      const wingFlap = Math.sin(Date.now() * 0.02) * 5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.ellipse(-pet.size - 2, 0, 4, 6 + wingFlap, Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(pet.size + 2, 0, 4, 6 + wingFlap, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (pet.type === 'MAGNET') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, -pet.size - 2, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Renderiza Plataformas.
   */
  public static renderPlatform(
    ctx: CanvasRenderingContext2D,
    plat: Platform,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = plat.x - cameraX;
    const drawY = plat.y - cameraY;

    ctx.save();
    ctx.fillStyle = plat.color || '#1e293b';
    ctx.fillRect(drawX, drawY, plat.width, plat.height);

    const isHazard = plat.type === 'hazard';
    const borderColor = isHazard ? '#ef4444' : '#10b981';

    ctx.shadowColor = borderColor;
    ctx.shadowBlur = 8;
    ctx.fillStyle = borderColor;
    ctx.fillRect(drawX, drawY, plat.width, 3);
    ctx.fillRect(drawX, drawY + plat.height - 2, plat.width, 2);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    for (let x = drawX + 10; x < drawX + plat.width - 10; x += 30) {
      ctx.fillRect(x, drawY + 6, 12, plat.height - 12);
    }

    ctx.restore();
  }

  /**
   * Renderiza Blocos Misteriosos "?" com animação e relevo.
   */
  public static renderMysteryBlock(
    ctx: CanvasRenderingContext2D,
    block: MysteryBlock,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = block.x - cameraX;
    const drawY = block.y - cameraY - block.bumpOffset;

    ctx.save();
    if (block.spent) {
      ctx.fillStyle = '#4b5563';
      ctx.fillRect(drawX, drawY, block.width, block.height);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX + 1, drawY + 1, block.width - 2, block.height - 2);
    } else {
      const pulse = Math.sin(Date.now() * 0.006) * 0.15 + 0.85;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12 * pulse;

      const grad = ctx.createLinearGradient(drawX, drawY, drawX, drawY + block.height);
      grad.addColorStop(0, '#fbbf24');
      grad.addColorStop(1, '#d97706');
      ctx.fillStyle = grad;
      ctx.fillRect(drawX, drawY, block.width, block.height);

      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX + 1, drawY + 1, block.width - 2, block.height - 2);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(drawX + 3, drawY + 3, 2, 2);
      ctx.fillRect(drawX + block.width - 5, drawY + 3, 2, 2);
      ctx.fillRect(drawX + 3, drawY + block.height - 5, 2, 2);
      ctx.fillRect(drawX + block.width - 5, drawY + block.height - 5, 2, 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', drawX + block.width / 2, drawY + block.height / 2 + 1);
    }
    ctx.restore();
  }

  /**
   * Renderiza Moedas giratórias 3D.
   */
  public static renderCoin(
    ctx: CanvasRenderingContext2D,
    coin: Coin,
    cameraX: number,
    cameraY: number
  ) {
    if (coin.collected) return;
    const drawX = coin.x - cameraX;
    const drawY = coin.y - cameraY + Math.sin(Date.now() * 0.004 + coin.animOffset) * 4;

    ctx.save();
    const spin = Math.cos(Date.now() * 0.008 + coin.animOffset);
    const widthScale = Math.max(0.15, Math.abs(spin));

    ctx.translate(drawX, drawY);
    ctx.scale(widthScale, 1);

    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, 0, coin.radius * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Renderiza Boost Pads (Sonic Style).
   */
  public static renderBoostPad(
    ctx: CanvasRenderingContext2D,
    pad: BoostPad,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = pad.x - cameraX;
    const drawY = pad.y - cameraY;

    ctx.save();
    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 15;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(drawX, drawY, pad.width, pad.height);

    const arrowCount = 4;
    const wave = (Date.now() * 0.01) % arrowCount;

    ctx.lineWidth = 3;
    for (let i = 0; i < arrowCount; i++) {
      const arrowX = drawX + 12 + i * 16;
      const isGlowing = Math.floor(wave) === i;
      ctx.strokeStyle = isGlowing ? '#93c5fd' : '#2563eb';

      ctx.beginPath();
      ctx.moveTo(arrowX - 4, drawY + 4);
      ctx.lineTo(arrowX + 4, drawY + pad.height / 2);
      ctx.lineTo(arrowX - 4, drawY + pad.height - 4);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Renderiza Portais de Gravidade Zero.
   */
  public static renderGravityPortal(
    ctx: CanvasRenderingContext2D,
    portal: GravityPortal,
    cameraX: number,
    cameraY: number
  ) {
    const drawX = portal.x - cameraX + portal.width / 2;
    const drawY = portal.y - cameraY + portal.height / 2;

    ctx.save();
    ctx.translate(drawX, drawY);

    const time = Date.now() * 0.003;
    ctx.shadowColor = portal.targetGravityInverted ? '#8b5cf6' : '#10b981';
    ctx.shadowBlur = 25;

    for (let r = 0; r < 3; r++) {
      const radiusX = (portal.width / 2) - r * 5;
      const radiusY = (portal.height / 2) - r * 8;
      const rot = (r % 2 === 0 ? 1 : -1) * time * (r + 1);

      ctx.save();
      ctx.rotate(rot);
      ctx.strokeStyle = r === 0 ? '#8b5cf6' : (r === 1 ? '#10b981' : '#38bdf8');
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(2, radiusX), Math.max(2, radiusY), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, portal.width / 3);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, portal.targetGravityInverted ? '#8b5cf6' : '#10b981');
    coreGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, portal.width / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(portal.targetGravityInverted ? '▲' : '▼', 0, 0);

    ctx.restore();
  }

  /**
   * Renderiza Inimigos / Drones Glitch.
   */
  public static renderEnemy(
    ctx: CanvasRenderingContext2D,
    enemy: Enemy,
    cameraX: number,
    cameraY: number
  ) {
    if (!enemy.alive) return;
    const drawX = enemy.x - cameraX;
    const drawY = enemy.y - cameraY;

    ctx.save();
    ctx.translate(drawX + enemy.width / 2, drawY + enemy.height / 2);

    ctx.shadowColor = enemy.color;
    ctx.shadowBlur = 12;

    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = enemy.color;
    ctx.lineWidth = 2;

    const size = enemy.width / 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = Math.cos(angle) * size;
      const py = Math.sin(angle) * size;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, 0, 4 + Math.sin(Date.now() * 0.01) * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
