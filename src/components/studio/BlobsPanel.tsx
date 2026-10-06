import React, { useState } from 'react';
import { VINTAGE_BLOBS, WAX_SEALS_URL } from '../../vintageLibrary';

interface Props {
  onAddBlob: (variant: 'watercolor-sepia' | 'coffee-ring' | 'ink-splatter' | 'organic-blob-1' | 'organic-blob-2' | 'organic-blob-3' | 'tea-wash', color: string) => void;
  onAddWaxSeal: (sealColor: 'crimson' | 'burgundy' | 'antique-gold' | 'royal-navy' | 'forest-green', symbol: 'fleur-de-lis' | 'monogram-heart' | 'crown' | 'botanical-rose' | 'bee') => void;
  onAddWashiTape: (pattern: 'kraft-tape' | 'airmail-stripes' | 'vintage-lace' | 'postage-marks', color: string) => void;
}

export const BlobsPanel: React.FC<Props> = ({ onAddBlob, onAddWaxSeal, onAddWashiTape }) => {
  const [activeTab, setActiveTab] = useState<'blobs' | 'wax' | 'tape'>('blobs');
  const [selectedBlobColor, setSelectedBlobColor] = useState('#8a5f38');

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-[#F0E6D8] rounded-lg border border-[#D5C2AE]">
        <button
          type="button"
          onClick={() => setActiveTab('blobs')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            activeTab === 'blobs'
              ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs border border-[#D5C2AE]'
              : 'text-[#614A36] hover:text-[#1F140B]'
          }`}
        >
          Macchie & Blob
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wax')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            activeTab === 'wax'
              ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs border border-[#D5C2AE]'
              : 'text-[#614A36] hover:text-[#1F140B]'
          }`}
        >
          Ceralacca
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tape')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            activeTab === 'tape'
              ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs border border-[#D5C2AE]'
              : 'text-[#614A36] hover:text-[#1F140B]'
          }`}
        >
          Washi Tape
        </button>
      </div>

      {activeTab === 'blobs' && (
        <div className="space-y-3.5">
          <div>
            <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
              Tonalità della Macchia / Blob:
            </label>
            <div className="flex gap-2.5">
              {[
                { label: 'Caffè Tostato', val: '#633d1c' },
                { label: 'Acquerello Seppia', val: '#a88151' },
                { label: 'Infuso di Tè', val: '#bd9662' },
                { label: 'Inchiostro Fumo', val: '#221911' },
                { label: 'Terracotta', val: '#8a432b' }
              ].map(c => (
                <button
                  key={c.val}
                  type="button"
                  onClick={() => setSelectedBlobColor(c.val)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                    selectedBlobColor === c.val ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/30' : 'border-[#CBB7A2]'
                  }`}
                  style={{ backgroundColor: c.val }}
                  title={c.label}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
            {VINTAGE_BLOBS.map(blob => (
              <button
                key={blob.id}
                type="button"
                onClick={() => onAddBlob(blob.variant, selectedBlobColor)}
                className="p-3 rounded-lg bg-[#FAF5ED] hover:bg-[#F0E6D8] border border-[#D8C7B5] hover:border-[#A3431D] transition-all text-left group flex flex-col items-center justify-center min-h-[96px] cursor-pointer shadow-2xs"
              >
                <div
                  className="w-11 h-11 rounded-full border-2 border-dashed border-[#8A6746] flex items-center justify-center mb-1.5 opacity-85 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${selectedBlobColor}35` }}
                >
                  <span className="text-sm">💧</span>
                </div>
                <span className="text-xs font-serif-vintage font-bold text-[#2A1B0F] text-center leading-tight">
                  {blob.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'wax' && (
        <div className="space-y-3">
          <div className="rounded-lg border-2 border-[#D8C7B5] overflow-hidden mb-2 shadow-2xs">
            <img
              src={WAX_SEALS_URL}
              alt="Archivio Sigilli di Ceralacca"
              className="w-full h-22 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <label className="text-xs font-bold tracking-wider text-[#4A3423] block uppercase">
            Sigilli di Ceralacca Imperiale 3D:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                color: 'crimson' as const,
                symbol: 'fleur-de-lis' as const,
                title: 'Giglio di Firenze (Rosso)',
                bg: '#881b1b'
              },
              {
                color: 'burgundy' as const,
                symbol: 'monogram-heart' as const,
                title: 'Cuore d\'Amore (Bordeaux)',
                bg: '#5c1024'
              },
              {
                color: 'antique-gold' as const,
                symbol: 'crown' as const,
                title: 'Corona Reale (Oro)',
                bg: '#b08d3b'
              },
              {
                color: 'forest-green' as const,
                symbol: 'botanical-rose' as const,
                title: 'Rosa Botanica (Verde)',
                bg: '#1b4028'
              },
              {
                color: 'royal-navy' as const,
                symbol: 'bee' as const,
                title: 'Ape Napoleonica (Blu)',
                bg: '#1e2c45'
              }
            ].map(w => (
              <button
                key={`${w.color}-${w.symbol}`}
                type="button"
                onClick={() => onAddWaxSeal(w.color, w.symbol)}
                className="p-3 rounded-lg bg-[#FAF5ED] hover:bg-[#F0E6D8] border border-[#D8C7B5] hover:border-[#A3431D] transition-all flex items-center gap-2.5 group text-left cursor-pointer shadow-2xs"
              >
                <div
                  className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center shrink-0 border border-white/40 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: w.bg }}
                >
                  <span className="text-xs text-white">❖</span>
                </div>
                <span className="text-xs font-serif-vintage font-bold text-[#2A1B0F] leading-tight">
                  {w.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tape' && (
        <div className="space-y-3">
          <label className="text-xs font-bold tracking-wider text-[#4A3423] block uppercase">
            Nastri Adesivi Vintage (Washi Tape):
          </label>
          <div className="space-y-2.5">
            {[
              {
                pattern: 'airmail-stripes' as const,
                color: '#ece1cf',
                title: 'Bordo Posta Aerea Rigato (Rosso & Blu)'
              },
              {
                pattern: 'kraft-tape' as const,
                color: '#d4b387',
                title: 'Nastro Carta Kraft Semitrasparente'
              },
              {
                pattern: 'postage-marks' as const,
                color: '#f2e8d5',
                title: 'Nastro con Timbri "Par Avion"'
              },
              {
                pattern: 'vintage-lace' as const,
                color: '#faf4e8',
                title: 'Pizzo Traforato d\'Epoca'
              }
            ].map(t => (
              <button
                key={t.pattern}
                type="button"
                onClick={() => onAddWashiTape(t.pattern, t.color)}
                className="w-full p-3 rounded-lg bg-[#FAF5ED] hover:bg-[#F0E6D8] border border-[#D8C7B5] hover:border-[#A3431D] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
              >
                <span className="text-xs font-serif-vintage font-bold text-[#2A1B0F]">{t.title}</span>
                <span className="text-xs font-bold text-[#A3431D] group-hover:underline">
                  + Applica
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
