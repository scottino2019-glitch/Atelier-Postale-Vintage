import React from 'react';
import { StampElement } from '../../types';

interface Props {
  element: StampElement;
}

export const StampRenderer: React.FC<Props> = ({ element }) => {
  const { country, denomination, color, customPhoto, imageUrl } = element;

  return (
    <div
      className="w-full h-full relative select-none pointer-events-none p-1.5 shadow-md"
      style={{
        backgroundColor: '#faf6ee',
        // Serrated postage stamp border effect
        boxShadow: '0 2px 8px rgba(0,0,0,0.22)'
      }}
    >
      {/* Postage perforations border via SVG mask or CSS border-image */}
      <div
        className="w-full h-full border border-dashed border-[#5a4632]/50 p-1 flex flex-col justify-between"
        style={{
          backgroundColor: '#f5efe0',
          outline: `2px solid ${color}40`
        }}
      >
        {/* Top country header */}
        <div
          className="text-center font-stamp text-[9px] font-bold tracking-[0.16em] uppercase border-b border-[#3c2a1e]/30 pb-0.5 truncate"
          style={{ color }}
        >
          {country}
        </div>

        {/* Center illustration or custom photo */}
        <div className="flex-1 my-1 overflow-hidden relative border border-[#3c2a1e]/25 flex items-center justify-center bg-[#eae0cf]">
          {customPhoto ? (
            <img
              src={customPhoto}
              alt="Francobollo personalizzato"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter sepia contrast-125"
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Francobollo vintage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-1 text-center" style={{ color }}>
              {/* Classical biplane or portrait icon */}
              <svg viewBox="0 0 48 36" className="w-10 h-8 opacity-80" fill="currentColor">
                <path d="M 2 18 L 18 15 L 24 6 L 27 6 L 25 15 L 42 16 L 46 12 L 47 13 L 44 18 L 47 23 L 46 24 L 42 20 L 25 21 L 27 30 L 24 30 L 18 21 L 2 18 Z" />
              </svg>
            </div>
          )}

          {/* Decorative faint postmark streak on the stamp */}
          <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full border border-[#2b2016]/40 pointer-events-none" />
          <div className="absolute top-2 -right-1 w-10 border-t border-[#2b2016]/30 -rotate-12 pointer-events-none" />
        </div>

        {/* Bottom denomination */}
        <div
          className="flex justify-between items-center px-1 font-stamp text-[10px] font-bold border-t border-[#3c2a1e]/30 pt-0.5"
          style={{ color }}
        >
          <span className="text-[7px]">★</span>
          <span>{denomination}</span>
          <span className="text-[7px]">★</span>
        </div>
      </div>
    </div>
  );
};
