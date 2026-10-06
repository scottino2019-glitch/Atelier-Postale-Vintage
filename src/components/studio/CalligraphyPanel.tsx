import React, { useState } from 'react';
import { CALLIGRAPHY_PRESETS, VINTAGE_FONTS } from '../../vintageLibrary';
import { CustomUploadedFont } from '../../types';

interface Props {
  customFonts: CustomUploadedFont[];
  onAddCalligraphy: (config: {
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
    italic: boolean;
    letterSpacing?: number;
  }) => void;
}

export const CalligraphyPanel: React.FC<Props> = ({ customFonts, onAddCalligraphy }) => {
  const [customText, setCustomText] = useState('Ricordo con affetto');
  const [selectedFont, setSelectedFont] = useState('Great Vibes');
  const [fontSize, setFontSize] = useState<number>(36);
  const [textColor, setTextColor] = useState('#2a1c13');
  const [isItalic, setIsItalic] = useState(true);

  const colors = [
    { label: 'Nero Inchiostro', value: '#2a1c13' },
    { label: 'Seppia d\'Epoca', value: '#5c3d26' },
    { label: 'Bordeaux Nobile', value: '#611b22' },
    { label: 'Blu Regio', value: '#1a2e40' },
    { label: 'Verde Bosco', value: '#223828' }
  ];

  return (
    <div className="space-y-4">
      {/* Preset Calligraphic phrases */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-2 block uppercase">
          Scritte Calligrafiche Pronte:
        </label>
        <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
          {CALLIGRAPHY_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() =>
                onAddCalligraphy({
                  text: preset.text,
                  fontFamily: preset.fontFamily,
                  fontSize: preset.fontSize,
                  color: preset.color,
                  italic: preset.italic ?? false
                })
              }
              className="w-full text-left p-2.5 rounded-lg bg-[#FAF5ED] hover:bg-[#F0E6D8] border border-[#D8C7B5] hover:border-[#A3431D] transition-colors flex items-center justify-between group shadow-2xs cursor-pointer"
            >
              <span
                className="text-lg text-[#26160B] group-hover:text-[#A3431D]"
                style={{
                  fontFamily: preset.fontFamily,
                  fontStyle: preset.italic ? 'italic' : 'normal'
                }}
              >
                {preset.text}
              </span>
              <span className="text-xs font-bold text-[#A3431D] opacity-80 group-hover:opacity-100">
                + Usa
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#D8C7B5] pt-3">
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Componi Scritta Personalizzata:
        </label>
        <textarea
          rows={2}
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          placeholder="Scrivi qui la tua dedica..."
          className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded-md px-3.5 py-2 text-sm font-medium text-[#1E1208] placeholder:text-[#8E7864] focus:border-[#A3431D] outline-none shadow-2xs"
        />
      </div>

      {/* Font Family selector */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Carattere Tipografico (Font):
        </label>
        <select
          value={selectedFont}
          onChange={e => setSelectedFont(e.target.value)}
          className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded-md px-3.5 py-2.5 text-sm font-medium text-[#1E1208] focus:border-[#A3431D] outline-none shadow-2xs cursor-pointer"
        >
          {customFonts.length > 0 && (
            <optgroup label="I tuoi Font Personali">
              {customFonts.map(f => (
                <option key={f.id} value={f.familyName}>
                  ★ {f.name} (Caricato da te)
                </option>
              ))}
            </optgroup>
          )}
          <optgroup label="Calligrafie & Tipografie d'Epoca">
            {VINTAGE_FONTS.map(f => (
              <option key={f.family} value={f.family}>
                {f.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Font size & styling */}
      <div className="flex items-center gap-4 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-[#4A3423] mb-1">
            <span>Dimensione Carattere:</span>
            <span>{fontSize}px</span>
          </div>
          <input
            type="range"
            min={16}
            max={72}
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            className="w-full accent-[#A3431D] cursor-pointer"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsItalic(!isItalic)}
          className={`px-3.5 py-2 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
            isItalic
              ? 'bg-[#EAE0D2] border-[#A3431D] text-[#A3431D] shadow-xs'
              : 'bg-[#FFFFFF] border-[#D8C7B5] text-[#5C4533]'
          }`}
        >
          Corsivo (Italic)
        </button>
      </div>

      {/* Ink color */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Inchiostro Scrittura:
        </label>
        <div className="flex gap-2.5">
          {colors.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => setTextColor(c.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                textColor === c.value ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/30' : 'border-[#CBB7A2]'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
              aria-label={c.label}
            />
          ))}
        </div>
      </div>

      {/* Add custom button */}
      <button
        type="button"
        onClick={() => {
          if (!customText.trim()) return;
          onAddCalligraphy({
            text: customText.trim(),
            fontFamily: selectedFont,
            fontSize,
            color: textColor,
            italic: isItalic
          });
        }}
        className="w-full py-3 px-4 bg-[#A3431D] hover:bg-[#BA5227] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
      >
        + Aggiungi Scritta Calligrafica
      </button>
    </div>
  );
};
