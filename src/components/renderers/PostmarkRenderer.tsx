import React from 'react';
import { PostmarkElement } from '../../types';

interface Props {
  element: PostmarkElement;
}

export const PostmarkRenderer: React.FC<Props> = ({ element }) => {
  const { city, dateStr, department, style, inkColor } = element;
  const uniqueId = `postmark-filter-${element.id}`;

  return (
    <div className="w-full h-full select-none pointer-events-none relative flex items-center justify-center">
      <svg
        viewBox="0 0 240 160"
        className="w-full h-full overflow-visible"
        style={{
          filter: `url(#${uniqueId}) drop-shadow(0 1px 1px rgba(0,0,0,0.08))`,
          color: inkColor
        }}
      >
        <defs>
          {/* Authentic distressed rubber stamp ink filter */}
          <filter id={uniqueId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {style === 'double-ring' && (
          <g stroke="currentColor" fill="none">
            {/* Postmark Circular Stamp */}
            <g transform="translate(75, 80)">
              <circle r="60" strokeWidth="2.8" strokeDasharray="180 2 90 2" />
              <circle r="42" strokeWidth="1.4" />
              
              {/* Arc text simulation & center date */}
              <text
                y="-45"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[11px] font-bold tracking-[0.2em]"
              >
                {city}
              </text>

              <line x1="-38" y1="-8" x2="38" y2="-8" strokeWidth="1.2" />
              <text
                y="5"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[12px] font-bold tracking-[0.15em]"
              >
                {dateStr}
              </text>
              <line x1="-38" y1="12" x2="38" y2="12" strokeWidth="1.2" />

              <text
                y="34"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[9px] tracking-[0.18em]"
              >
                {department}
              </text>
            </g>

            {/* Wavy cancellation bars on the right */}
            <g transform="translate(145, 45)" strokeWidth="1.8">
              <path d="M 0 0 C 15 -6, 30 6, 45 0 C 60 -6, 75 6, 90 0" />
              <path d="M 0 15 C 15 9, 30 21, 45 15 C 60 9, 75 21, 90 15" />
              <path d="M 0 30 C 15 24, 30 36, 45 30 C 60 24, 75 36, 90 30" />
              <path d="M 0 45 C 15 39, 30 51, 45 45 C 60 39, 75 51, 90 45" />
              <path d="M 0 60 C 15 54, 30 66, 45 60 C 60 54, 75 66, 90 60" />
            </g>
          </g>
        )}

        {style === 'single-ring-wavy' && (
          <g stroke="currentColor" fill="none">
            <g transform="translate(80, 80)">
              <circle r="55" strokeWidth="2.4" />
              <text
                y="-28"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[12px] font-bold tracking-[0.25em]"
              >
                {city}
              </text>
              <text
                y="6"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[13px] font-bold tracking-[0.2em]"
              >
                {dateStr}
              </text>
              <text
                y="32"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[10px] tracking-[0.2em]"
              >
                {department}
              </text>
            </g>
            {/* Wavy lines */}
            <g transform="translate(142, 50)" strokeWidth="2">
              <path d="M 0 0 Q 20 -8, 40 0 T 80 0" />
              <path d="M 0 18 Q 20 10, 40 18 T 80 18" />
              <path d="M 0 36 Q 20 28, 40 36 T 80 36" />
              <path d="M 0 54 Q 20 46, 40 54 T 80 54" />
            </g>
          </g>
        )}

        {style === 'airmail-box' && (
          <g stroke="currentColor" fill="none">
            <rect x="20" y="30" width="200" height="90" rx="8" strokeWidth="3" />
            <rect x="25" y="35" width="190" height="80" rx="6" strokeWidth="1.2" />
            <text
              x="120"
              y="68"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-stamp text-[22px] font-bold tracking-[0.28em]"
            >
              {city}
            </text>
            <line x1="40" y1="78" x2="200" y2="78" strokeWidth="1.5" />
            <text
              x="120"
              y="98"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-stamp text-[13px] font-medium tracking-[0.2em]"
            >
              {dateStr}
            </text>
          </g>
        )}

        {style === 'censorship-seal' && (
          <g stroke="currentColor" fill="none">
            <polygon points="40,30 200,30 225,80 200,130 40,130 15,80" strokeWidth="2.8" />
            <polygon points="45,35 195,35 218,80 195,125 45,125 22,80" strokeWidth="1.2" strokeDasharray="4 2" />
            <text
              x="120"
              y="64"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-stamp text-[13px] font-bold tracking-[0.16em]"
            >
              {city}
            </text>
            <text
              x="120"
              y="85"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-stamp text-[11px] font-bold tracking-[0.15em]"
            >
              {dateStr}
            </text>
            <text
              x="120"
              y="105"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-stamp text-[10px] tracking-[0.15em]"
            >
              {department}
            </text>
          </g>
        )}

        {style === 'cancellation-bars' && (
          <g stroke="currentColor" fill="none">
            <g transform="translate(45, 80)">
              <circle r="42" strokeWidth="2" />
              <text
                y="-10"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[12px] font-bold tracking-[0.2em]"
              >
                {city}
              </text>
              <text
                y="15"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-stamp text-[11px] tracking-[0.15em]"
              >
                {dateStr}
              </text>
            </g>
            <g transform="translate(100, 40)" strokeWidth="2.5">
              <line x1="0" y1="10" x2="120" y2="10" />
              <line x1="0" y1="28" x2="120" y2="28" />
              <line x1="0" y1="46" x2="120" y2="46" />
              <line x1="0" y1="64" x2="120" y2="64" />
              <line x1="0" y1="82" x2="120" y2="82" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
