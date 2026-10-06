import React from 'react';
import { WaxSealElement, WashiTapeElement } from '../../types';

export const WaxSealRenderer: React.FC<{ element: WaxSealElement }> = ({ element }) => {
  const { sealColor, symbol } = element;

  const colorPalettes: Record<string, { base: string; dark: string; light: string }> = {
    crimson: { base: '#881b1b', dark: '#570d0d', light: '#ad3434' },
    burgundy: { base: '#5c1024', dark: '#3b0614', light: '#7e1d35' },
    'antique-gold': { base: '#b08d3b', dark: '#73591f', light: '#d6b25e' },
    'royal-navy': { base: '#1e2c45', dark: '#0e1828', light: '#35476a' },
    'forest-green': { base: '#1b4028', dark: '#0e2416', light: '#2c5f3d' }
  };

  const p = colorPalettes[sealColor] || colorPalettes.crimson;

  return (
    <div className="w-full h-full relative select-none pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <radialGradient id={`wax-grad-${element.id}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={p.light} />
            <stop offset="65%" stopColor={p.base} />
            <stop offset="100%" stopColor={p.dark} />
          </radialGradient>
        </defs>

        {/* Melted organic wax rim with dripping lobes */}
        <path
          d="M 50 8 C 66 7 78 14 85 24 C 94 36 94 54 88 68 C 83 80 72 90 56 93 C 40 95 24 88 15 76 C 5 62 6 42 14 28 C 22 14 36 9 50 8 Z"
          fill={`url(#wax-grad-${element.id})`}
        />
        {/* Secondary wax edge splatter bumps */}
        <circle cx="82" cy="72" r="7" fill={p.base} />
        <circle cx="18" cy="35" r="6" fill={p.base} />
        <circle cx="58" cy="91" r="5" fill={p.base} />

        {/* Inner pressed seal depression */}
        <circle cx="50" cy="50" r="28" fill={p.dark} opacity="0.45" />
        <circle cx="50" cy="50" r="26" fill={p.base} stroke={p.light} strokeWidth="1.2" opacity="0.9" />

        {/* Embossed symbol */}
        <g fill={p.light} opacity="0.9" transform="translate(50, 50) scale(0.65) translate(-50, -50)">
          {symbol === 'fleur-de-lis' && (
            <path d="M 50 15 C 46 28 35 38 35 48 C 35 55 42 58 46 58 L 46 75 L 42 75 C 38 68 28 65 24 72 C 20 80 28 85 36 82 L 46 78 L 46 88 L 54 88 L 54 78 L 64 82 C 72 85 80 80 76 72 C 72 65 62 68 58 75 L 54 75 L 54 58 C 58 58 65 55 65 48 C 65 38 54 28 50 15 Z M 40 60 L 60 60 L 58 65 L 42 65 Z" />
          )}
          {symbol === 'monogram-heart' && (
            <path d="M 50 78 C 30 62 18 48 18 34 C 18 20 28 14 38 16 C 45 18 48 24 50 26 C 52 24 55 18 62 16 C 72 14 82 20 82 34 C 82 48 70 62 50 78 Z" />
          )}
          {symbol === 'botanical-rose' && (
            <path d="M 50 24 C 44 24 38 30 40 38 C 34 38 30 45 34 52 C 32 58 38 66 45 66 L 50 78 L 55 66 C 62 66 68 58 66 52 C 70 45 66 38 60 38 C 62 30 56 24 50 24 Z" />
          )}
          {symbol === 'crown' && (
            <path d="M 20 68 L 25 35 L 40 50 L 50 25 L 60 50 L 75 35 L 80 68 Z M 20 72 L 80 72 L 78 77 L 22 77 Z" />
          )}
          {symbol === 'bee' && (
            <path d="M 50 30 C 44 30 40 38 40 52 C 40 66 46 76 50 80 C 54 76 60 66 60 52 C 60 38 56 30 50 30 Z M 40 45 C 24 40 15 36 15 28 C 24 24 36 34 40 40 Z M 60 45 C 76 40 85 36 85 28 C 76 24 64 34 60 40 Z" />
          )}
        </g>
      </svg>
    </div>
  );
};

export const WashiTapeRenderer: React.FC<{ element: WashiTapeElement }> = ({ element }) => {
  const { pattern, color } = element;

  return (
    <div
      className="w-full h-full relative select-none pointer-events-none shadow-sm flex items-center justify-center opacity-85"
      style={{
        backgroundColor: color,
        clipPath: 'polygon(0% 4%, 100% 0%, 98% 96%, 2% 100%)',
        backdropFilter: 'blur(1px)'
      }}
    >
      {pattern === 'airmail-stripes' && (
        <div
          className="w-full h-full opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #a82a2a 0px, #a82a2a 10px, transparent 10px, transparent 18px, #1c3d70 18px, #1c3d70 28px, transparent 28px, transparent 36px)'
          }}
        />
      )}
      {pattern === 'kraft-tape' && (
        <div className="w-full h-full opacity-35 bg-[radial-gradient(#3a2717_1px,transparent_1px)] [background-size:6px_6px]" />
      )}
      {pattern === 'vintage-lace' && (
        <div className="w-full h-full flex items-center justify-around opacity-40 text-black text-[10px]">
          <span>✤</span>
          <span>✤</span>
          <span>✤</span>
          <span>✤</span>
        </div>
      )}
      {pattern === 'postage-marks' && (
        <div className="w-full h-full flex items-center justify-between px-3 opacity-50 font-stamp text-[9px] text-[#332211]">
          <span>PAR AVION</span>
          <span>POSTA</span>
        </div>
      )}
    </div>
  );
};
