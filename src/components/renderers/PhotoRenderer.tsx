import React from 'react';
import { PhotoElement } from '../../types';
import { getCssFilterForType } from '../../services/photoFilter';

interface Props {
  element: PhotoElement;
}

export const PhotoRenderer: React.FC<Props> = ({ element }) => {
  const { url, filter, frame } = element;
  const cssFilter = getCssFilterForType(filter);

  return (
    <div className="w-full h-full relative select-none pointer-events-none flex items-center justify-center">
      {/* Outer frame styling */}
      <div
        className={`w-full h-full relative overflow-hidden transition-all ${
          frame === 'polaroid-retro'
            ? 'p-2 pb-7 bg-[#fdfbf7] shadow-md border border-[#d8ccb8]'
            : frame === 'deckle-border'
            ? 'p-1.5 bg-[#f6eee0] shadow-sm border border-[#3e2e20]/20'
            : frame === 'oval-cameo'
            ? 'rounded-[50%] p-2 bg-[#ecd9be] border-2 border-[#543b27] shadow-md'
            : 'shadow-sm'
        }`}
      >
        <div
          className={`w-full h-full relative overflow-hidden ${
            frame === 'oval-cameo' ? 'rounded-[50%]' : ''
          }`}
        >
          <img
            src={url}
            alt="Foto personale"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all"
            style={{
              filter: cssFilter
            }}
          />

          {/* Film grain / sepia overlay layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#4d3623 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          />
        </div>

        {/* Vintage album triangular photo corners */}
        {frame === 'vintage-corners' && (
          <>
            <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <polygon points="0,0 20,0 0,20" fill="#2d2218" />
                <line x1="2" y1="2" x2="18" y2="2" stroke="#bda27e" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <polygon points="20,0 0,0 20,20" fill="#2d2218" />
                <line x1="18" y1="2" x2="2" y2="2" stroke="#bda27e" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <polygon points="0,20 20,20 0,0" fill="#2d2218" />
                <line x1="2" y1="18" x2="18" y2="18" stroke="#bda27e" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <polygon points="20,20 0,20 20,0" fill="#2d2218" />
                <line x1="18" y1="18" x2="2" y2="18" stroke="#bda27e" strokeWidth="1" />
              </svg>
            </div>
          </>
        )}

        {/* Scalloped postage edges */}
        {frame === 'scalloped' && (
          <div className="absolute inset-0 border-4 border-dashed border-[#574332]/50 pointer-events-none" />
        )}
      </div>
    </div>
  );
};
