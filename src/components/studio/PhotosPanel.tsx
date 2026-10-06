import React, { useState } from 'react';
import { PhotoFilterType, PhotoFrameType } from '../../types';
import { PHOTO_FILTERS, fileToDataUrl, getCssFilterForType } from '../../services/photoFilter';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
  onAddPhoto: (config: {
    url: string;
    fileName: string;
    filter: PhotoFilterType;
    frame: PhotoFrameType;
  }) => void;
}

export const PhotosPanel: React.FC<Props> = ({ onAddPhoto }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('mia_foto.jpg');
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilterType>('sepia-1910');
  const [selectedFrame, setSelectedFrame] = useState<PhotoFrameType>('vintage-corners');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await fileToDataUrl(file);
      setPhotoUrl(data);
      setFileName(file.name);
    }
  };

  const frames: { id: PhotoFrameType; label: string }[] = [
    { id: 'vintage-corners', label: 'Angolini d\'Album dei Nonni' },
    { id: 'polaroid-retro', label: 'Bordo Istantanea Retrò' },
    { id: 'scalloped', label: 'Dentellato tipo Francobollo' },
    { id: 'oval-cameo', label: 'Cammeo Ovale Antico' },
    { id: 'deckle-border', label: 'Bordo Carta Ritagliata a Mano' },
    { id: 'none', label: 'Senza Cornice' }
  ];

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Carica la Tua Foto Personale:
        </label>
        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#C8B8A6] hover:border-[#A3431D] rounded-lg cursor-pointer bg-[#FFFFFF] transition-colors shadow-2xs">
          {photoUrl ? (
            <div className="w-36 h-28 relative border-2 border-[#C4A079] overflow-hidden rounded shadow-sm">
              <img
                src={photoUrl}
                alt="Anteprima foto"
                className="w-full h-full object-cover transition-all"
                style={{ filter: getCssFilterForType(selectedFilter) }}
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <Upload className="w-7 h-7 text-[#A3431D] mb-1" />
              <span className="text-xs font-bold text-[#24170E]">Trascina o clicca per caricare foto</span>
              <span className="text-[11px] text-[#705842] mt-0.5">Supporta JPG, PNG, WebP</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter Presets */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Filtro Fotografico Vintage (Camera Oscura):
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PHOTO_FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`p-2.5 rounded-lg text-left border text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#F2E8DC] border-[#A3431D] text-[#24170E] font-bold shadow-xs'
                  : 'bg-[#FAF5ED] border-[#D8C7B5] text-[#5C4533] hover:bg-[#F0E6D8]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Styles */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Cornice & Montaggio della Foto:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {frames.map(fr => (
            <button
              key={fr.id}
              type="button"
              onClick={() => setSelectedFrame(fr.id)}
              className={`p-2.5 rounded-lg text-left border text-xs font-semibold transition-all cursor-pointer ${
                selectedFrame === fr.id
                  ? 'bg-[#F2E8DC] border-[#A3431D] text-[#24170E] font-bold shadow-xs'
                  : 'bg-[#FAF5ED] border-[#D8C7B5] text-[#5C4533] hover:bg-[#F0E6D8]'
              }`}
            >
              {fr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Photo Button */}
      <button
        type="button"
        disabled={!photoUrl}
        onClick={() => {
          if (!photoUrl) return;
          onAddPhoto({
            url: photoUrl,
            fileName,
            filter: selectedFilter,
            frame: selectedFrame
          });
        }}
        className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 ${
          photoUrl
            ? 'bg-[#A3431D] hover:bg-[#BA5227] text-white cursor-pointer shadow-sm'
            : 'bg-[#E0D4C5] text-[#8C7662] cursor-not-allowed'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>+ Inserisci Foto sulla Cartolina</span>
      </button>
    </div>
  );
};
