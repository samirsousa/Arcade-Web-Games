class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private sfxVolume: number = 0.8;
  private musicVolume: number = 0.5;

  // Trilha sonora procedural
  private musicInterval: number | null = null;
  private currentStep: number = 0;
  private isMusicPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(val: boolean) {
    this.soundEnabled = val;
  }

  public setMusicEnabled(val: boolean) {
    this.musicEnabled = val;
    if (!val) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  // EFEITO 1: Bloco encaixado com sucesso (Drop normal)
  public playDrop() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(this.sfxVolume * 0.45, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // EFEITO 2: Encaixe PERFEITO (Chime brilhante escalonado pelo combo)
  public playPerfect(combo: number) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Escala pentatônica futurista subindo de tom com o combo
    const baseFreqs = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73, 1318.51];
    const index = Math.min(combo - 1, baseFreqs.length - 1);
    const rootFreq = baseFreqs[Math.max(0, index)];

    // Cria 2 osciladores harmonizados (fundamental + 5ª)
    [rootFreq, rootFreq * 1.5].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    });
  }

  // EFEITO 3: Corte a laser do excesso (Slice Laser)
  public playSlice() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // EFEITO 4: Erro total / Perda de Vida (Miss)
  public playLifeLost() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  // EFEITO 5: Game Over Cósmico
  public playGameOver() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  // EFEITO 6: Início de Partida
  public playGameStart() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [220, 277.18, 329.63, 440, 554.37, 659.25];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  // TRILHA SONORA PROCEDURAL CYBERPUNK (Synthwave Bassline & Arp)
  public startMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    this.initContext();
    this.isMusicPlaying = true;

    // Linha de baixo synthwave cyberpunk em Lá menor (A minor)
    const bassNotes = [110, 110, 130.81, 110, 146.83, 110, 164.81, 146.83];
    const leadNotes = [440, 523.25, 659.25, 783.99, 880, 783.99, 659.25, 523.25];

    this.musicInterval = window.setInterval(() => {
      if (!this.ctx || !this.musicEnabled) return;

      const step = this.currentStep % bassNotes.length;
      const bassFreq = bassNotes[step];
      const leadFreq = leadNotes[step];

      // Bass note
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(bassFreq, this.ctx.currentTime);

      bassGain.gain.setValueAtTime(this.musicVolume * 0.08, this.ctx.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);

      bassOsc.start();
      bassOsc.stop(this.ctx.currentTime + 0.16);

      // Lead note sutil a cada 2 tempos
      if (step % 2 === 0) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();

        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(leadFreq, this.ctx.currentTime);

        leadGain.gain.setValueAtTime(this.musicVolume * 0.05, this.ctx.currentTime);
        leadGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

        leadOsc.connect(leadGain);
        leadGain.connect(this.ctx.destination);

        leadOsc.start();
        leadOsc.stop(this.ctx.currentTime + 0.3);
      }

      this.currentStep++;
    }, 170); // ~176 BPM estilo arcade rápido
  }

  public stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.isMusicPlaying = false;
  }
}

export const soundManager = new SoundEngine();
