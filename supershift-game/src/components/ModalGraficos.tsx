import React from 'react';
import { GameSettings } from '../types/game';
import { X, Tv, Sparkles, Activity, Eye, Monitor } from 'lucide-react';
import { soundManager } from '../sound/soundEngine';

interface ModalGraficosProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onClose: () => void;
}

export const ModalGraficos: React.FC<ModalGraficosProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const handleClose = () => {
    soundManager.playSelect();
    onClose();
  };

  const toggleCrtScanlines = () => {
    soundManager.playSelect();
    onUpdateSettings({ ...settings, crtScanlines: !settings.crtScanlines });
  };

  const toggleGlowEffects = () => {
    soundManager.playSelect();
    onUpdateSettings({ ...settings, glowEffects: !settings.glowEffects });
  };

  const toggleShowFps = () => {
    soundManager.playSelect();
    onUpdateSettings({ ...settings, showFps: !settings.showFps });
  };

  const setParticles = (level: 'low' | 'medium' | 'high') => {
    soundManager.playSelect();
    onUpdateSettings({ ...settings, particlesIntensity: level });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-lg bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-left relative max-h-[90vh] overflow-y-auto">
        {/* Glow Decorativo */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/15 blur-[80px] rounded-full pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-sans text-white tracking-wide">
              CONFIGURAÇÃO GRÁFICA & VÍDEO
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* 1. Efeito Retrô CRT / Scanlines */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-200 block">
                  Filtro CRT Scanlines (Arcade Retrô)
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Simula o visual clássico de monitor tubo de fliperama dos anos 90
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleCrtScanlines}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                settings.crtScanlines
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500 shadow-md shadow-purple-500/30'
                  : 'bg-slate-700/80 text-slate-400 border border-slate-600'
              }`}
            >
              {settings.crtScanlines ? 'ATIVO' : 'DESATIVADO'}
            </button>
          </div>

          {/* 2. Efeitos Glow / Neon */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-200 block">
                  Iluminação Neon & Glow Bloom
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Sombras difusas e brilho em portais, moedas e boost pads
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleGlowEffects}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                settings.glowEffects
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-700/80 text-slate-400 border border-slate-600'
              }`}
            >
              {settings.glowEffects ? 'LIGADO' : 'DESLIGADO'}
            </button>
          </div>

          {/* 3. Densidade de Partículas */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-200 block">
                  Densidade de Partículas (Sonic & Portais)
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Volume de faíscas nos rastros de alta velocidade e saltos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setParticles(level)}
                  className={`py-2 rounded-xl font-bold uppercase transition-all ${
                    settings.particlesIntensity === level
                      ? 'bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-500/40'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {level === 'low' ? 'Baixa' : level === 'medium' ? 'Equilibrada' : 'Máxima'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Contador de FPS */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-200 block">
                  Exibir Taxa de Quadros (Contador FPS)
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Monitor em tempo real de estabilidade a 60 FPS
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleShowFps}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                settings.showFps
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500 shadow-md shadow-amber-500/30'
                  : 'bg-slate-700/80 text-slate-400 border border-slate-600'
              }`}
            >
              {settings.showFps ? 'VISÍVEL' : 'OCULTO'}
            </button>
          </div>
        </div>

        {/* Botão Fechar */}
        <div className="mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black font-mono text-sm tracking-wider hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 text-center"
          >
            SALVAR PREFERÊNCIAS
          </button>
        </div>
      </div>
    </div>
  );
};
