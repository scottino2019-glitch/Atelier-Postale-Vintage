import React from 'react';
import { BlobElement } from '../../types';

interface Props {
  element: BlobElement;
}

export const BlobRenderer: React.FC<Props> = ({ element }) => {
  const { blobVariant, color } = element;

  return (
    <div className="w-full h-full relative select-none pointer-events-none flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        {blobVariant === 'coffee-ring' && (
          <g transform="translate(100, 100)" stroke={color} fill="none">
            {/* Outer coffee ring */}
            <circle r="72" strokeWidth="6" opacity="0.45" strokeDasharray="30 4 50 8 20 6" />
            <circle r="69" strokeWidth="3" opacity="0.6" strokeDasharray="60 6 30 4" />
            {/* Darker wet meniscus pool */}
            <path
              d="M 50 -50 A 72 72 0 0 1 70 20"
              strokeWidth="9"
              opacity="0.75"
              strokeLinecap="round"
            />
            {/* Inner puddle bleed */}
            <circle r="62" strokeWidth="1" opacity="0.25" fill={color} fillOpacity="0.08" />
            {/* Coffee drip */}
            <path
              d="M 68 25 C 78 35 84 55 80 62 C 76 68 68 65 65 55"
              fill={color}
              opacity="0.4"
            />
          </g>
        )}

        {blobVariant === 'watercolor-sepia' && (
          <path
            d="M 100 20 C 145 15 185 45 178 95 C 172 145 148 185 98 178 C 48 170 15 140 22 90 C 30 40 55 25 100 20 Z"
            fill={color}
            opacity="0.38"
            style={{ filter: 'blur(3px)' }}
          />
        )}

        {blobVariant === 'ink-splatter' && (
          <g fill={color} opacity="0.82">
            {/* Central drop */}
            <path d="M 100 65 C 125 65 138 80 135 105 C 132 130 115 140 95 138 C 75 136 68 120 70 95 C 72 75 82 65 100 65 Z" />
            {/* Spikes */}
            <path d="M 125 75 L 160 50 L 132 85 Z" />
            <path d="M 135 110 L 175 125 L 130 120 Z" />
            <path d="M 110 138 L 120 180 L 98 140 Z" />
            <path d="M 75 125 L 40 160 L 72 110 Z" />
            <path d="M 70 85 L 25 70 L 75 80 Z" />
            <path d="M 95 65 L 90 25 L 105 65 Z" />
            {/* Satellite drops */}
            <circle cx="175" cy="45" r="4.5" />
            <circle cx="185" cy="135" r="3.5" />
            <circle cx="125" cy="192" r="5" />
            <circle cx="30" cy="170" r="4" />
            <circle cx="18" cy="62" r="3" />
            <circle cx="85" cy="18" r="4" />
          </g>
        )}

        {blobVariant === 'tea-wash' && (
          <path
            d="M 30 40 C 90 20 140 30 175 50 C 190 90 180 140 160 165 C 120 180 60 170 35 150 C 15 115 10 70 30 40 Z"
            fill={color}
            opacity="0.3"
            style={{ filter: 'blur(6px)' }}
          />
        )}

        {blobVariant === 'organic-blob-1' && (
          <path
            d="M 120 30 C 160 40 185 80 170 120 C 155 160 110 180 70 165 C 30 150 20 100 40 60 C 60 20 90 20 120 30 Z"
            fill={color}
            opacity="0.45"
          />
        )}

        {blobVariant === 'organic-blob-2' && (
          <path
            d="M 90 25 C 130 15 170 35 175 80 C 180 125 150 170 105 175 C 60 180 25 145 30 100 C 35 55 60 35 90 25 Z"
            fill={color}
            opacity="0.45"
          />
        )}

        {blobVariant === 'organic-blob-3' && (
          <path
            d="M 100 35 C 140 25 175 60 165 110 C 155 160 105 175 65 155 C 25 135 35 80 60 50 C 75 35 85 40 100 35 Z"
            fill={color}
            opacity="0.5"
          />
        )}
      </svg>
    </div>
  );
};
