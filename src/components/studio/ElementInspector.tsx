import React from 'react';
import { PostcardElement, CustomUploadedFont } from '../../types';
import { VINTAGE_FONTS } from '../../vintageLibrary';
import { PHOTO_FILTERS } from '../../services/photoFilter';
import { Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  element: PostcardElement;
  customFonts: CustomUploadedFont[];
  onUpdateElement: (id: string, updates: Partial<PostcardElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onReorderElement: (id: string, direction: 'up' | 'down') => void;
}

export const ElementInspector: React.FC<Props> = ({
  element,
  customFonts,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onReorderElement
}) => {
  return (
    <div className="space-y-4">
      {/* Header with Type & Quick Actions */}
      <div className="flex items-center justify-between border-b border-[#D8C7B5] pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#755941] block">
            Proprietà Elemento
          </span>
          <div className="text-sm font-serif-vintage font-bold text-[#24170E] capitalize">
            {element.type === 'speech-bubble'
              ? 'Nuvoletta / Cartiglio'
              : element.type === 'calligraphy' || element.type === 'text'
              ? 'Scritta Calligrafica'
              : element.type === 'drawing'
              ? 'Disegno Vintage'
              : element.type === 'postmark'
              ? 'Timbro Postale'
              : element.type === 'stamp'
              ? 'Francobollo'
              : element.type === 'blob'
              ? 'Macchia / Blob'
              : element.type === 'photo'
              ? 'Foto Personale'
              : element.type === 'wax-seal'
              ? 'Sigillo Ceralacca'
              : 'Nastro Washi Tape'}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onReorderElement(element.id, 'up')}
            className="p-1.5 rounded-md bg-[#FAF5ED] hover:bg-[#EAE0D2] text-[#3C2817] border border-[#D8C7B5] cursor-pointer"
            title="Porta avanti"
            aria-label="Porta avanti"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onReorderElement(element.id, 'down')}
            className="p-1.5 rounded-md bg-[#FAF5ED] hover:bg-[#EAE0D2] text-[#3C2817] border border-[#D8C7B5] cursor-pointer"
            title="Invia indietro"
            aria-label="Invia indietro"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicateElement(element.id)}
            className="p-1.5 rounded-md bg-[#FAF5ED] hover:bg-[#EAE0D2] text-[#3C2817] border border-[#D8C7B5] cursor-pointer"
            title="Duplica"
            aria-label="Duplica"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDeleteElement(element.id)}
            className="p-1.5 rounded-md bg-[#FDE8E8] hover:bg-[#FCD4D4] text-[#C92A2A] border border-[#F8B4B4] cursor-pointer"
            title="Elimina"
            aria-label="Elimina"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side Placement Toggle */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] block uppercase mb-1.5">
          Posizionato su:
        </label>
        <div className="flex p-1 bg-[#F0E6D8] rounded-lg border border-[#D5C2AE]">
          <button
            type="button"
            onClick={() => onUpdateElement(element.id, { side: 'front' })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              element.side === 'front'
                ? 'bg-[#FDFBF7] text-[#24170E] shadow-xs border border-[#D5C2AE]'
                : 'text-[#614A36] hover:text-[#1F140B]'
            }`}
          >
            Fronte Cartolina
          </button>
          <button
            type="button"
            onClick={() => onUpdateElement(element.id, { side: 'back' })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              element.side === 'back'
                ? 'bg-[#FDFBF7] text-[#24170E] shadow-xs border border-[#D5C2AE]'
                : 'text-[#614A36] hover:text-[#1F140B]'
            }`}
          >
            Retro Postale
          </button>
        </div>
      </div>

      {/* Specific Element Type Attributes */}
      {(element.type === 'text' || element.type === 'calligraphy') && (
        <div className="space-y-3 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Testo:</label>
            <textarea
              rows={2}
              value={element.text}
              onChange={e => onUpdateElement(element.id, { text: e.target.value })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-sm font-medium text-[#1E1208] outline-none focus:border-[#A3431D]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Carattere (Font):</label>
            <select
              value={element.fontFamily}
              onChange={e => onUpdateElement(element.id, { fontFamily: e.target.value })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-xs font-medium text-[#1E1208] outline-none cursor-pointer"
            >
              {customFonts.length > 0 && (
                <optgroup label="I tuoi Font Personali">
                  {customFonts.map(f => (
                    <option key={f.id} value={f.familyName}>
                      ★ {f.name} (Caricato)
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

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <span className="text-xs font-bold text-[#4A3423] block mb-1">
                Dimensione ({element.fontSize}px):
              </span>
              <input
                type="range"
                min={14}
                max={90}
                value={element.fontSize}
                onChange={e => onUpdateElement(element.id, { fontSize: Number(e.target.value) })}
                className="w-full accent-[#A3431D] cursor-pointer"
              />
            </div>
            <button
              type="button"
              onClick={() => onUpdateElement(element.id, { italic: !element.italic })}
              className={`px-3 py-2 text-xs font-bold border rounded-md transition-colors cursor-pointer mt-3 ${
                element.italic
                  ? 'bg-[#EAE0D2] border-[#A3431D] text-[#A3431D]'
                  : 'bg-[#FFFFFF] border-[#D8C7B5] text-[#5C4533]'
              }`}
            >
              Italic
            </button>
          </div>
        </div>
      )}

      {element.type === 'speech-bubble' && (
        <div className="space-y-3 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Testo nella Nuvoletta:</label>
            <input
              type="text"
              value={element.text}
              onChange={e => onUpdateElement(element.id, { text: e.target.value })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-sm font-medium text-[#1E1208] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Carattere:</label>
            <select
              value={element.fontFamily}
              onChange={e => onUpdateElement(element.id, { fontFamily: e.target.value })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-xs font-medium text-[#1E1208] outline-none cursor-pointer"
            >
              {customFonts.map(f => (
                <option key={f.id} value={f.familyName}>
                  ★ {f.name}
                </option>
              ))}
              {VINTAGE_FONTS.map(f => (
                <option key={f.family} value={f.family}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {element.type === 'photo' && (
        <div className="space-y-3 bg-[#FAF5ED] p-3 rounded-lg border border-[#D8C7B5]">
          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Filtro Fotografico:</label>
            <select
              value={element.filter}
              onChange={e => onUpdateElement(element.id, { filter: e.target.value as any })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-xs font-medium text-[#1E1208] outline-none cursor-pointer"
            >
              {PHOTO_FILTERS.map(f => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#4A3423] block uppercase mb-1">Cornice:</label>
            <select
              value={element.frame}
              onChange={e => onUpdateElement(element.id, { frame: e.target.value as any })}
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-2 text-xs font-medium text-[#1E1208] outline-none cursor-pointer"
            >
              <option value="vintage-corners">Angolini d'Album d'Epoca</option>
              <option value="polaroid-retro">Istantanea Retrò</option>
              <option value="scalloped">Dentellatura Francobollo</option>
              <option value="oval-cameo">Cammeo Ovale Antico</option>
              <option value="deckle-border">Bordo Tagliacarte</option>
              <option value="none">Senza Cornice</option>
            </select>
          </div>
        </div>
      )}

      {/* Universal Transform Controls: Opacity & Rotation & Ink Blend */}
      <div className="border-t border-[#D8C7B5] pt-3 space-y-3.5">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#4A3423] mb-1">
            <span>Opacità:</span>
            <span>{Math.round(element.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={element.opacity}
            onChange={e => onUpdateElement(element.id, { opacity: Number(e.target.value) })}
            className="w-full accent-[#A3431D] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#4A3423] mb-1">
            <span>Rotazione:</span>
            <span>{element.rotation}°</span>
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            value={element.rotation}
            onChange={e => onUpdateElement(element.id, { rotation: Number(e.target.value) })}
            className="w-full accent-[#A3431D] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF5ED] border border-[#D8C7B5]">
          <div>
            <span className="text-xs font-bold text-[#24170E] block font-serif-vintage">
              Inchiostro Fuso nella Carta
            </span>
            <span className="text-[11px] text-[#6E5540]">
              Simula l'assorbimento dell'inchiostro nei pori
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              onUpdateElement(element.id, {
                blendMode: element.blendMode === 'multiply' ? 'normal' : 'multiply'
              })
            }
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
              element.blendMode === 'multiply'
                ? 'bg-[#A3431D] text-white'
                : 'bg-[#EAE0D2] text-[#4E3624]'
            }`}
          >
            {element.blendMode === 'multiply' ? 'Attivo' : 'Disattivo'}
          </button>
        </div>
      </div>
    </div>
  );
};
