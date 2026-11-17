import React from 'react';
import { GameSettings } from '../types/game';
import { X, Volume2, Smartphone, Vibrate, Settings } from 'lucide-react';

interface ModalConfiguracoesProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onClose: () => void;
}

export const ModalConfiguracoes: React.FC<ModalConfiguracoesProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const toggleMusic = () => {
    onUpdateSettings({ ...settings, musicEnabled: !settings.musicEnabled });
  };

  const toggleHaptics = () => {
    onUpdateSettings({ ...settings, hapticFeedback: !settings.hapticFeedback });
  };

  const toggleTouchControls = () => {
    onUpdateSettings({ ...settings, showTouchControls: !settings.showTouchControls });
  };

  const handleSfxVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, sfxVolume: parseFloat(e.target.value) });
  };

  const handleMusicVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, musicVolume: parseFloat(e.target.value) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-left relative max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black font-display text-white tracking-wider">
              CONFIGURAÇÕES DO SISTEMA
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Áudio & Sons */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> ÁUDIO ARCADE
            </h3>

            {/* SFX */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Efeitos Sonoros (SFX)</span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    settings.soundEnabled
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {settings.soundEnabled ? 'LIGADO' : 'MUTADO'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!settings.soundEnabled}
                value={settings.sfxVolume}
                onChange={handleSfxVolume}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Trilha Sonora Procedural */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Trilha Synthwave</span>
                <button
                  type="button"
                  onClick={toggleMusic}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    settings.musicEnabled
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {settings.musicEnabled ? 'LIGADO' : 'MUTADO'}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!settings.musicEnabled}
                value={settings.musicVolume}
                onChange={handleMusicVolume}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Controles & Feedback */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> INTERFACE & RESPOSTA
            </h3>

            {/* Feedback Tátil */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Vibrate className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-semibold text-slate-200">Vibração Haptic</span>
              </div>
              <button
                type="button"
                onClick={toggleHaptics}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  settings.hapticFeedback
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {settings.hapticFeedback ? 'ATIVO' : 'DESLIGADO'}
              </button>
            </div>

            {/* Botão de Toque na Tela */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-200 block">Botão Tátil na Tela</span>
                <span className="text-xs text-slate-400 block mt-0.5">Exibido apenas em mobile</span>
              </div>
              <button
                type="button"
                onClick={toggleTouchControls}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  settings.showTouchControls
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {settings.showTouchControls ? 'VISÍVEL' : 'OCULTO'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
