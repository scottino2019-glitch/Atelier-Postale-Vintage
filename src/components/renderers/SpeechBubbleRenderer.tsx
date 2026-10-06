import React from 'react';
import { SpeechBubbleElement } from '../../types';

interface Props {
  element: SpeechBubbleElement;
}

export const SpeechBubbleRenderer: React.FC<Props> = ({ element }) => {
  const { variant, text, fontFamily, fontSize, fillColor, strokeColor, textColor } = element;

  return (
    <div className="w-full h-full relative select-none pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 300 150"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {variant === 'retro-ribbon' && (
          <g>
            {/* Banner fold shadows */}
            <polygon points="35,75 50,60 50,90" fill="#4a3b32" opacity="0.4" />
            <polygon points="265,75 250,60 250,90" fill="#4a3b32" opacity="0.4" />

            {/* Fishtail left */}
            <path
              d="M 50 60 L 15 45 L 30 75 L 15 105 L 50 90 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.2"
            />
            {/* Fishtail right */}
            <path
              d="M 250 60 L 285 45 L 270 75 L 285 105 L 250 90 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.2"
            />

            {/* Central main banner with subtle antique curve */}
            <path
              d="M 45 52 Q 150 42 255 52 L 255 98 Q 150 108 45 98 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.6"
            />
            {/* Double decorative hairline */}
            <path
              d="M 52 58 Q 150 48 248 58"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="4 2"
              opacity="0.7"
            />
            <path
              d="M 52 92 Q 150 102 248 92"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="4 2"
              opacity="0.7"
            />
          </g>
        )}

        {variant === 'engraved-cloud' && (
          <g>
            {/* Thought cloud main body */}
            <path
              d="M 60 85 C 40 85 25 70 25 50 C 25 32 40 20 60 20 C 70 10 95 10 115 18 C 130 8 165 8 185 18 C 205 10 230 10 240 20 C 260 20 275 32 275 50 C 275 70 260 85 240 85 C 230 95 205 95 185 87 C 165 97 130 97 115 87 C 95 95 70 95 60 85 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            {/* Engraved bottom hatching */}
            <path
              d="M 50 75 L 55 83 M 80 80 L 85 88 M 110 82 L 115 90 M 140 85 L 145 93 M 170 82 L 175 90 M 200 82 L 205 90 M 230 78 L 235 86"
              stroke={strokeColor}
              strokeWidth="1.2"
              opacity="0.6"
            />
            {/* Trailing thought bubbles */}
            <circle cx="85" cy="110" r="10" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="65" cy="128" r="6" fill={fillColor} stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="52" cy="140" r="3.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          </g>
        )}

        {variant === 'vintage-balloon' && (
          <g>
            <path
              d="M 30 25 C 30 15 45 10 75 10 L 225 10 C 255 10 270 15 270 25 L 270 95 C 270 105 255 110 225 110 L 110 110 L 60 142 L 75 110 L 75 110 C 45 110 30 105 30 95 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2.8"
            />
            {/* Inner vintage border */}
            <path
              d="M 36 29 C 36 21 50 17 78 17 L 222 17 C 250 17 264 21 264 29 L 264 91 C 264 99 250 103 222 103 L 80 103 C 52 103 36 99 36 91 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              opacity="0.45"
            />
          </g>
        )}

        {variant === 'antique-scroll' && (
          <g>
            {/* Rolled ends */}
            <ellipse cx="35" cy="75" rx="15" ry="38" fill={fillColor} stroke={strokeColor} strokeWidth="2.2" />
            <ellipse cx="265" cy="75" rx="15" ry="38" fill={fillColor} stroke={strokeColor} strokeWidth="2.2" />
            {/* Main body */}
            <path
              d="M 35 37 L 265 37 L 265 113 L 35 113 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Crease rolls */}
            <path d="M 35 37 C 45 45 45 105 35 113" fill="none" stroke={strokeColor} strokeWidth="1.6" />
            <path d="M 265 37 C 255 45 255 105 265 113" fill="none" stroke={strokeColor} strokeWidth="1.6" />
          </g>
        )}

        {variant === 'callout-banner' && (
          <g>
            <rect x="25" y="30" width="250" height="75" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <polygon points="60,105 45,135 90,105" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
            <line x1="57" y1="105" x2="93" y2="105" stroke={fillColor} strokeWidth="3" />
            {/* Corner flourishes */}
            <circle cx="35" cy="40" r="3" fill={strokeColor} />
            <circle cx="265" cy="40" r="3" fill={strokeColor} />
            <circle cx="265" cy="95" r="3" fill={strokeColor} />
            <circle cx="35" cy="95" r="3" fill={strokeColor} />
          </g>
        )}
      </svg>

      {/* Render text centered within the speech bubble / ribbon */}
      <div
        className="absolute inset-0 flex items-center justify-center p-6 text-center leading-tight pointer-events-none"
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          color: textColor,
          marginTop: variant === 'retro-ribbon' ? '0px' : variant === 'vintage-balloon' ? '-10px' : '-4px',
          textShadow: '0 1px 2px rgba(255,255,255,0.7)'
        }}
      >
        <span className="max-w-[85%] break-words">{text}</span>
      </div>
    </div>
  );
};
