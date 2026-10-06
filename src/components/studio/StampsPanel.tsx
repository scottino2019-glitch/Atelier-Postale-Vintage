import React, { useState } from 'react';
import { VINTAGE_STAMPS, POSTAL_STAMPS_URL } from '../../vintageLibrary';
import { fileToDataUrl } from '../../services/photoFilter';
import { Upload } from 'lucide-react';

interface Props {
  onAddStamp: (config: {
    country: string;
    denomination: string;
    color: string;
    customPhoto?: string;
    imageUrl?: string;
  }) => void;
}

export const StampsPanel: React.FC<Props> = ({ onAddStamp }) => {
  const [activeTab, setActiveTab] = useState<'classic' | 'custom'>('classic');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [customCountry, setCustomCountry] = useState('POSTE ITALIANE');
  const [customDenom, setCustomDenom] = useState('Cent. 25');
  const [stampColor, setStampColor] = useState('#753f22');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataUrl(file);
      setCustomPhoto(dataUrl);
    }
  };

  return (
    <div className="space-y-4">
      {/* Segmented Control */}
      <div className="flex p-1 bg-[#F0E6D8] rounded-lg border border-[#D5C2AE]">
        <button
          type="button"
          onClick={() => setActiveTab('classic')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            activeTab === 'classic'
              ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs border border-[#D5C2AE]'
              : 'text-[#614A36] hover:text-[#1F140B]'
          }`}
        >
          Francobolli Storici
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-[#FDFBF7] text-[#22160C] shadow-xs border border-[#D5C2AE]'
              : 'text-[#614A36] hover:text-[#1F140B]'
          }`}
        >
          Crea Francobollo con Foto
        </button>
      </div>

      {activeTab === 'classic' ? (
        <div className="space-y-3">
          <div className="rounded-lg border-2 border-[#D8C7B5] overflow-hidden shadow-2xs">
            <img
              src={POSTAL_STAMPS_URL}
              alt="Archivio Francobolli d'Epoca"
              className="w-full h-24 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
            {VINTAGE_STAMPS.map(stamp => (
              <button
                key={stamp.id}
                type="button"
                onClick={() =>
                  onAddStamp({
                    country: stamp.country,
                    denomination: stamp.denomination,
                    color: stamp.color
                  })
                }
                className="p-3 rounded-lg bg-[#FAF5ED] hover:bg-[#F0E6D8] border border-[#D8C7B5] hover:border-[#A3431D] transition-all text-left group flex flex-col justify-between h-24 cursor-pointer shadow-2xs"
              >
                <div>
                  <div
                    className="font-stamp text-[10px] font-bold tracking-wider truncate uppercase"
                    style={{ color: stamp.color }}
                  >
                    {stamp.country}
                  </div>
                  <div className="font-serif-vintage text-xs font-bold text-[#2A1B0F] group-hover:text-[#A3431D] line-clamp-1 mt-0.5">
                    {stamp.name}
                  </div>
                </div>
                <div
                  className="font-stamp text-xs font-bold self-end bg-[#F4EADB] px-2 py-0.5 rounded"
                  style={{ color: stamp.color }}
                >
                  {stamp.denomination}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Custom Photo Stamp Generator */
        <div className="space-y-3 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
          <div>
            <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
              1. Carica la Tua Foto per il Francobollo:
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#C8B8A6] hover:border-[#A3431D] rounded-lg cursor-pointer bg-[#FFFFFF] transition-colors shadow-2xs">
              {customPhoto ? (
                <div className="w-18 h-22 relative border-2 border-[#C4A079] overflow-hidden rounded-sm shadow-sm">
                  <img
                    src={customPhoto}
                    alt="Anteprima foto francobollo"
                    className="w-full h-full object-cover filter sepia contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-7 h-7 text-[#A3431D] mb-1" />
                  <span className="text-xs font-bold text-[#24170E]">Seleziona una foto personale</span>
                  <span className="text-[11px] text-[#705842] mt-0.5">Supporta JPG, PNG, WebP</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <span className="text-xs font-bold text-[#5C4533] block mb-1">Nazione / Intestazione:</span>
              <input
                type="text"
                value={customCountry}
                onChange={e => setCustomCountry(e.target.value)}
                className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-2.5 py-1.5 text-xs font-bold text-[#1E1208] font-stamp uppercase outline-none focus:border-[#A3431D]"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-[#5C4533] block mb-1">Tariffa Postale:</span>
              <input
                type="text"
                value={customDenom}
                onChange={e => setCustomDenom(e.target.value)}
                className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-2.5 py-1.5 text-xs font-bold text-[#1E1208] font-stamp outline-none focus:border-[#A3431D]"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-[#5C4533] block mb-1.5">Colore Dentellatura:</span>
            <div className="flex gap-2.5">
              {['#753f22', '#1b4028', '#1a334d', '#611b22', '#523419'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setStampColor(c)}
                  className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                    stampColor === c ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/30' : 'border-[#CBB7A2]'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!customPhoto}
            onClick={() => {
              if (!customPhoto) return;
              onAddStamp({
                country: customCountry,
                denomination: customDenom,
                color: stampColor,
                customPhoto
              });
            }}
            className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
              customPhoto
                ? 'bg-[#A3431D] hover:bg-[#BA5227] text-white cursor-pointer shadow-sm'
                : 'bg-[#E0D4C5] text-[#8C7662] cursor-not-allowed'
            }`}
          >
            + Crea ed Incolla Francobollo Personale
          </button>
        </div>
      )}
    </div>
  );
};
