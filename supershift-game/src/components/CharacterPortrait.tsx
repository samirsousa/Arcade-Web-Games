import React from 'react';
import { CharacterId } from '../types/game';

interface CharacterPortraitProps {
  characterId: CharacterId;
  size?: number;
  className?: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  size = 56,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-2xl overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-700/80 shadow-md ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="dkFurGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="dkChestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="dkTieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="dkGoldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="sonicBlueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="saiyanHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* 1. DONKEY KONG (Rei da Selva) */}
        {characterId === 'dk' && (
          <g id="portrait-dk">
            {/* Fundo Tropical Noturno */}
            <rect width="64" height="64" fill="#090d16" />
            <circle cx="32" cy="32" r="28" fill="#14532d" opacity="0.35" />

            {/* Ombros Maciços de Gorila com Pelagem Marrom Escura */}
            <path d="M4 64 C6 44 20 44 32 46 C44 44 58 44 60 64 Z" fill="url(#dkFurGrad)" />

            {/* Peitoral Forte Bege/Caramelo */}
            <path d="M20 54 Q32 48 44 54 L40 64 L24 64 Z" fill="url(#dkChestGrad)" />

            {/* Gravata Vermelha Icônica DK */}
            <polygon points="30,48 34,48 35,51 29,51" fill="#dc2626" />
            <polygon points="28,51 36,51 38,64 26,64" fill="url(#dkTieGrad)" />
            <path d="M28 51 L36 51 L38 64 L26 64 Z" stroke="#991b1b" strokeWidth="0.6" fill="none" />
            <text
              x="32"
              y="60"
              textAnchor="middle"
              fill="url(#dkGoldGrad)"
              fontSize="6.5"
              fontFamily="Impact, sans-serif"
              fontWeight="900"
              letterSpacing="0.5"
            >
              DK
            </text>

            {/* Orelhas Redondas de Gorila */}
            <circle cx="16" cy="30" r="5" fill="#451a03" />
            <circle cx="16" cy="30" r="3" fill="#fde68a" />
            <circle cx="48" cy="30" r="5" fill="#451a03" />
            <circle cx="48" cy="30" r="3" fill="#fde68a" />

            {/* Cabeça de Pelagem Marrom */}
            <ellipse cx="32" cy="27" rx="16" ry="17" fill="url(#dkFurGrad)" />

            {/* Topete Cônico Arrepiado clássico do DK */}
            <path d="M26 12 Q32 2 35 4 Q38 8 38 13 Z" fill="#78350f" />
            <path d="M28 11 Q33 5 35 6 Q37 9 37 12 Z" fill="#92400e" />

            {/* Sobrancelhas Marcantes Primata */}
            <path d="M20 20 Q32 17 44 20 L42 23 Q32 21 22 23 Z" fill="#3b1502" />

            {/* Olhos Expressivos de DK */}
            <ellipse cx="26" cy="23" rx="3.5" ry="4" fill="#ffffff" />
            <ellipse cx="38" cy="23" rx="3.5" ry="4" fill="#ffffff" />
            <circle cx="27" cy="23" r="2" fill="#18181b" />
            <circle cx="37" cy="23" r="2" fill="#18181b" />
            <circle cx="27.6" cy="22.2" r="0.8" fill="#ffffff" />
            <circle cx="37.6" cy="22.2" r="0.8" fill="#ffffff" />

            {/* Focinho e Maxilar Saliente em Bege (Muzzle) */}
            <ellipse cx="32" cy="34" rx="14" ry="9" fill="url(#dkChestGrad)" />
            <ellipse cx="29" cy="30" rx="1.5" ry="2" fill="#78350f" />
            <ellipse cx="35" cy="30" rx="1.5" ry="2" fill="#78350f" />

            {/* Sorriso Confiante e Alegre de DK */}
            <path d="M23 35 Q32 42 41 35" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M25 35 Q32 40 39 35" fill="#ffffff" />
          </g>
        )}

        {/* 2. RED / ASH (Treinador Pokémon) */}
        {characterId === 'ash' && (
          <g id="portrait-ash">
            <rect width="64" height="64" fill="#090d16" />

            {/* Colete Azul com Camisa Preta e Gola Branca */}
            <path d="M12 50 Q32 46 52 50 L56 64 L8 64 Z" fill="#1d4ed8" />
            <polygon points="26,48 38,48 35,64 29,64" fill="#18181b" />
            <rect x="23" y="47" width="18" height="4" fill="#ffffff" rx="2" />

            {/* Pescoço */}
            <rect x="27" y="39" width="10" height="9" fill="#fcd34d" rx="2" />

            {/* Rosto */}
            <rect x="20" y="23" width="24" height="21" fill="#fcd34d" rx="6" />

            {/* Olhos Anime */}
            <rect x="26" y="32" width="4" height="6" fill="#18181b" rx="1.5" />
            <circle cx="27.5" cy="33.5" r="1.2" fill="#ffffff" />
            <rect x="36" y="32" width="4" height="6" fill="#18181b" rx="1.5" />
            <circle cx="37.5" cy="33.5" r="1.2" fill="#ffffff" />

            {/* Marcas de raio nas bochechas */}
            <path d="M23 37 L25 39 L24 41" stroke="#ea580c" strokeWidth="1.2" fill="none" />
            <path d="M41 37 L39 39 L40 41" stroke="#ea580c" strokeWidth="1.2" fill="none" />

            {/* Cabelo Preto espetado nas laterais */}
            <polygon points="17,28 12,34 18,36" fill="#18181b" />
            <polygon points="47,28 52,34 46,36" fill="#18181b" />

            {/* Boné Vermelho de Treinador com Centro Branco */}
            <path d="M16 23 Q32 10 48 23 L54 26 L10 26 Z" fill="#dc2626" />
            <path d="M22 23 Q32 14 42 23 Z" fill="#ffffff" />
            <circle cx="32" cy="20" r="2.5" fill="#dc2626" />
            {/* Aba do Boné virada para a direita */}
            <path d="M30 25 Q46 23 54 28 L40 28 Z" fill="#ffffff" />
          </g>
        )}

        {/* 3. LINK (Herói de Hyrule / Zelda) */}
        {characterId === 'link' && (
          <g id="portrait-link">
            <rect width="64" height="64" fill="#090d16" />

            {/* Túnica Verde de Herói com Cinto de Couro */}
            <path d="M12 50 Q32 46 52 50 L56 64 L8 64 Z" fill="#15803d" />
            <line x1="20" y1="52" x2="44" y2="64" stroke="#78350f" strokeWidth="3.5" />
            <circle cx="32" cy="58" r="3" fill="#fbbf24" />

            {/* Pescoço */}
            <rect x="27" y="39" width="10" height="9" fill="#fde68a" rx="2" />

            {/* Orelhas Pontudas Élfeas */}
            <polygon points="18,29 11,27 18,34" fill="#fde68a" />
            <polygon points="46,29 53,27 46,34" fill="#fde68a" />

            {/* Rosto */}
            <rect x="19" y="22" width="26" height="23" fill="#fde68a" rx="6" />

            {/* Cabelos Loiros caídos nas laterais */}
            <polygon points="18,22 15,36 22,34 22,22" fill="#facc15" />
            <polygon points="46,22 49,36 42,34 42,22" fill="#facc15" />
            <path d="M20 22 Q32 18 44 22 Z" fill="#facc15" />

            {/* Olhos Azuis Hyrule */}
            <rect x="25" y="31" width="3.5" height="5.5" fill="#0284c7" rx="1" />
            <circle cx="26" cy="32.5" r="1" fill="#ffffff" />
            <rect x="35" y="31" width="3.5" height="5.5" fill="#0284c7" rx="1" />
            <circle cx="36" cy="32.5" r="1" fill="#ffffff" />

            {/* Gorro Verde Pontudo Estendido */}
            <path d="M16 22 Q32 12 48 22 L56 12 Q36 2 26 8 Z" fill="#15803d" />
            <polygon points="56,12 58,16 52,14" fill="#166534" />
          </g>
        )}

        {/* 4. SUPER ENCANADOR (Mario) */}
        {characterId === 'mario' && (
          <g id="portrait-mario">
            <rect width="64" height="64" fill="#090d16" />

            {/* Camisa Vermelha e Alças do Macacão Azul */}
            <path d="M12 50 Q32 46 52 50 L56 64 L8 64 Z" fill="#dc2626" />
            <rect x="18" y="48" width="8" height="16" fill="#2563eb" />
            <circle cx="22" cy="52" r="2.2" fill="#fbbf24" />
            <rect x="38" y="48" width="8" height="16" fill="#2563eb" />
            <circle cx="42" cy="52" r="2.2" fill="#fbbf24" />

            {/* Pescoço */}
            <rect x="27" y="39" width="10" height="9" fill="#fed7aa" rx="2" />

            {/* Rosto e Nariz Redondo */}
            <circle cx="32" cy="32" r="14" fill="#fed7aa" />
            <circle cx="32" cy="31" r="5" fill="#fca5a5" />

            {/* Bigode Ícone Italiano */}
            <path d="M22 36 Q27 34 32 37 Q37 34 42 36 Q43 40 37 41 Q32 39 27 41 Q21 40 22 36 Z" fill="#18181b" />

            {/* Olhos */}
            <ellipse cx="27" cy="27" rx="2.5" ry="4" fill="#1d4ed8" />
            <circle cx="27.5" cy="26" r="1.2" fill="#ffffff" />
            <ellipse cx="37" cy="27" rx="2.5" ry="4" fill="#1d4ed8" />
            <circle cx="37.5" cy="26" r="1.2" fill="#ffffff" />

            {/* Boina Vermelha com Emblema Branco */}
            <path d="M12 23 Q32 6 52 23 Q54 26 48 26 L16 26 Z" fill="#dc2626" />
            <path d="M42 26 Q54 25 58 29 L46 29 Z" fill="#b91c1c" />
            <circle cx="32" cy="17" r="4.5" fill="#ffffff" />
            <text x="32" y="20.5" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#dc2626" fontFamily="sans-serif">M</text>
          </g>
        )}

        {/* 5. OURIÇO SUPERSÔNICO (Sonic) */}
        {characterId === 'sonic' && (
          <g id="portrait-sonic">
            <rect width="64" height="64" fill="#090d16" />

            {/* Espinhos Traseiros Azuis */}
            <polygon points="32,24 6,10 24,30" fill="#1d4ed8" />
            <polygon points="28,32 4,26 24,40" fill="#1d4ed8" />
            <polygon points="26,42 6,42 22,50" fill="#1d4ed8" />

            {/* Orelhas Azuis Pontudas */}
            <polygon points="28,14 36,4 40,16" fill="#2563eb" />
            <polygon points="32,13 36,7 38,14" fill="#fed7aa" />

            {/* Cabeça Azul */}
            <circle cx="37" cy="30" r="15" fill="url(#sonicBlueGrad)" />

            {/* Focinho Bege e Nariz Preto */}
            <ellipse cx="44" cy="36" rx="8" ry="6" fill="#fed7aa" />
            <circle cx="51" cy="34" r="2.5" fill="#09090b" />

            {/* Olhos Verdes Aerodinâmicos */}
            <ellipse cx="38" cy="27" rx="5" ry="7" fill="#ffffff" />
            <ellipse cx="40" cy="27" rx="2.5" ry="5" fill="#10b981" />
            <circle cx="41" cy="26" r="1.2" fill="#ffffff" />
          </g>
        )}

        {/* 6. GUERREIRO SAIYAJIN (Goku) */}
        {characterId === 'goku' && (
          <g id="portrait-goku">
            <rect width="64" height="64" fill="#090d16" />

            {/* Gi Laranja com Decote Azul */}
            <path d="M12 50 Q32 46 52 50 L56 64 L8 64 Z" fill="#ea580c" />
            <polygon points="27,47 37,47 32,58" fill="#1e3a8a" />

            {/* Pescoço Forte */}
            <rect x="25" y="38" width="14" height="11" fill="#fed7aa" rx="2" />

            {/* Rosto */}
            <polygon points="22,24 42,24 38,42 26,42" fill="#fed7aa" />

            {/* Olhos com Sobrancelhas Angulares */}
            <path d="M25 28 L30 30" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <polygon points="26,31 30,31 29,35 27,35" fill="#18181b" />

            <path d="M39 28 L34 30" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <polygon points="35,31 39,31 38,35 36,35" fill="#18181b" />

            {/* Cabelo Espetado Saiyajin (Mechas Angulares Volumosas) */}
            <g fill="url(#saiyanHair)">
              <polygon points="32,24 16,14 26,18" />
              <polygon points="26,18 20,4 32,15" />
              <polygon points="32,15 34,2 40,16" />
              <polygon points="40,16 52,6 42,21" />
              <polygon points="42,21 58,18 40,26" />
              <polygon points="22,24 8,24 20,30" />
              <polygon points="12,18 4,12 14,24" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
