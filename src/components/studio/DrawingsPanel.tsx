import React, { useState } from 'react';
import { VINTAGE_DRAWINGS, DrawingItem } from '../../vintageLibrary';

interface Props {
  onAddDrawing: (drawing: DrawingItem, inkColor: string) => void;
}

export const DrawingsPanel: React.FC<Props> = ({ onAddDrawing }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inkColor, setInkColor] = useState<string>('#261a12');

  const categories = [
    { id: 'all', label: 'Tutti i Disegni' },
    { id: 'fauna', label: 'Fauna' },
    { id: 'flora', label: 'Flora' },
    { id: 'viaggio', label: 'Viaggio' },
    { id: 'oggetti', label: 'Oggetti' },
    { id: 'ornamenti', label: 'Fregi' }
  ];

  const colorOptions = [
    { label: 'Carbone Antico', value: '#261a12' },
    { label: 'Seppia Caldo', value: '#5c3d28' },
    { label: 'Blu di Prussia', value: '#1a2e40' },
    { label: 'Bordeaux Epoca', value: '#5a1d24' },
    { label: 'Oro Brunito', value: '#8a6e34' }
  ];

  const filteredDrawings = selectedCategory === 'all'
    ? VINTAGE_DRAWINGS
    : VINTAGE_DRAWINGS.filter(d => d.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-2 block uppercase">
          Tonalità d'Inchiostro dell'Incisione:
        </label>
        <div className="flex gap-2.5">
          {colorOptions.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => setInkColor(c.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                inkColor === c.value ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/30' : 'border-[#CBB7A2]'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
              aria-label={c.label}
            />
          ))}
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-[#F0E6D8] rounded-lg border border-[#D5C2AE]">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs font-bold border border-[#D5C2AE]'
                : 'text-[#614A36] hover:text-[#1F140B] hover:bg-[#EAE0D2]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drawings Grid */}
      <div className="grid grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredDrawings.map(d => (
          <button
            key={d.id}
            type="button"
            onClick={() => onAddDrawing(d, inkColor)}
            className="group flex flex-col items-center justify-center p-3 rounded-lg bg-[#FAF5ED] hover:bg-[#F2E8DC] border border-[#D8C7B5] hover:border-[#A3431D] transition-all text-center cursor-pointer shadow-2xs"
          >
            <div className="w-14 h-14 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
              <svg
                viewBox={d.viewBox}
                className="w-11 h-11 overflow-visible"
                fill="none"
                stroke={inkColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={d.svgPath} />
              </svg>
            </div>
            <span className="text-xs font-serif-vintage font-bold text-[#2A1B0F] leading-tight line-clamp-1">
              {d.name}
            </span>
          </button>
        ))}
      </div>

      <div className="text-xs text-[#5D4633] italic border-t border-[#D8C7B5] pt-2.5">
        Consiglio: Puoi trascinare, ruotare e applicare la fusione a inchiostro direttamente sulla cartolina.
      </div>
    </div>
  );
};
