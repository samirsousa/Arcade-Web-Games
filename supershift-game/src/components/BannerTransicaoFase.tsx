import React from 'react';
import { Sparkles } from 'lucide-react';

interface BannerTransicaoFaseProps {
  levelNumber: number;
  levelName: string;
  difficultyTitle: string;
}

export const BannerTransicaoFase: React.FC<BannerTransicaoFaseProps> = ({
  levelNumber,
  levelName,
  difficultyTitle,
}) => {
  return (
    <div className="fixed top-20 inset-x-0 z-50 flex justify-center pointer-events-none select-none px-4 animate-fade-in">
      <div className="px-6 py-4 rounded-3xl bg-slate-900/95 border-2 border-emerald-500/80 backdrop-blur-xl shadow-2xl shadow-emerald-500/30 flex flex-col items-center text-center max-w-md w-full">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-black uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>SETOR ANTERIOR CUMPRIDO! +1500 PTS</span>
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
          {levelName}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            FASE {levelNumber} DE 6
          </span>
          <span className="text-slate-400 text-xs font-mono">
            {difficultyTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
