import React, { useState } from 'react';
import { VINTAGE_SPEECH_BUBBLES, VINTAGE_FONTS } from '../../vintageLibrary';
import { CustomUploadedFont } from '../../types';

interface Props {
  customFonts: CustomUploadedFont[];
  onAddSpeechBubble: (config: {
    variant: 'retro-ribbon' | 'engraved-cloud' | 'vintage-balloon' | 'antique-scroll' | 'callout-banner';
    text: string;
    fontFamily: string;
    fillColor: string;
    strokeColor: string;
    textColor: string;
  }) => void;
}

export const SpeechBubblesPanel: React.FC<Props> = ({ customFonts, onAddSpeechBubble }) => {
  const [selectedVariant, setSelectedVariant] = useState<'retro-ribbon' | 'engraved-cloud' | 'vintage-balloon' | 'antique-scroll' | 'callout-banner'>('retro-ribbon');
  const [text, setText] = useState('Saluti Affettuosi da Roma!');
  const [fontFamily, setFontFamily] = useState('Great Vibes');
  const [fillColor, setFillColor] = useState('#F8F2E4');
  const [strokeColor, setStrokeColor] = useState('#422D1E');
  const [textColor, setTextColor] = useState('#2B1C12');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddSpeechBubble({
      variant: selectedVariant,
      text: text.trim(),
      fontFamily,
      fillColor,
      strokeColor,
      textColor
    });
  };

  return (
    <div className="space-y-4">
      {/* Variant Selector */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-2 block uppercase">
          Stile Nuvoletta o Cartiglio:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {VINTAGE_SPEECH_BUBBLES.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setSelectedVariant(b.variant);
                if (text === 'Saluti Affettuosi da Roma!' || text.includes('...')) {
                  setText(b.sampleText);
                }
              }}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                selectedVariant === b.variant
                  ? 'bg-[#F2E8DC] border-[#A3431D] text-[#24170E] font-bold shadow-xs'
                  : 'bg-[#FAF6F0] border-[#D8C7B5] text-[#5C4533] hover:bg-[#F2EAE0]'
              }`}
            >
              <div className="text-xs font-serif-vintage font-bold">{b.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Text inside the bubble */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Testo nella Nuvoletta:
        </label>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Scrivi qui il tuo messaggio..."
          className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded-md px-3.5 py-2.5 text-sm font-medium text-[#1E1208] placeholder:text-[#8E7864] focus:border-[#A3431D] outline-none shadow-2xs"
        />
      </div>

      {/* Font selector */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Carattere Tipografico (Font):
        </label>
        <select
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
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
          <optgroup label="Font Vintage & Calligrafici">
            {VINTAGE_FONTS.map(f => (
              <option key={f.family} value={f.family}>
                {f.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Color presets for bubble */}
      <div className="grid grid-cols-2 gap-3.5 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
        <div>
          <span className="text-xs font-bold text-[#4A3423] block mb-1.5">Carta Nuvoletta:</span>
          <div className="flex gap-2">
            {[
              { val: '#F8F2E4', name: 'Avorio' },
              { val: '#EDE0CB', name: 'Pergamena' },
              { val: '#DCC6A0', name: 'Kraft' },
              { val: '#FFFFFF', name: 'Bianco Antico' }
            ].map(c => (
              <button
                key={c.val}
                type="button"
                onClick={() => setFillColor(c.val)}
                className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                  fillColor === c.val ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/20' : 'border-[#C8B8A6]'
                }`}
                style={{ backgroundColor: c.val }}
                title={c.name}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-[#4A3423] block mb-1.5">Inchiostro Testo:</span>
          <div className="flex gap-2">
            {[
              { val: '#2B1C12', name: 'Nero Fumo' },
              { val: '#542D1E', name: 'Seppia' },
              { val: '#1C3144', name: 'Blu Postale' },
              { val: '#631E1E', name: 'Ceralacca' }
            ].map(c => (
              <button
                key={c.val}
                type="button"
                onClick={() => {
                  setTextColor(c.val);
                  setStrokeColor(c.val);
                }}
                className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                  textColor === c.val ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/20' : 'border-[#C8B8A6]'
                }`}
                style={{ backgroundColor: c.val }}
                title={c.name}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 px-4 bg-[#A3431D] hover:bg-[#BA5227] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>+ Inserisci Nuvoletta sulla Cartolina</span>
      </button>
    </div>
  );
};
