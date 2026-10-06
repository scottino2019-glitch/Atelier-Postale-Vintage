import React from 'react';
import { DrawingElement } from '../../types';
import { VINTAGE_DRAWINGS } from '../../vintageLibrary';

interface Props {
  element: DrawingElement;
}

export const DrawingRenderer: React.FC<Props> = ({ element }) => {
  const { drawingId, color, strokeWidth = 2 } = element;
  const drawing = VINTAGE_DRAWINGS.find(d => d.id === drawingId) || VINTAGE_DRAWINGS[0];

  return (
    <div className="w-full h-full select-none pointer-events-none flex items-center justify-center">
      <svg
        viewBox={drawing.viewBox}
        className="w-full h-full overflow-visible drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={drawing.svgPath} />
      </svg>
    </div>
  );
};
