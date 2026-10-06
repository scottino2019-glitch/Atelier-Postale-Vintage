import React, { useState } from 'react';
import { CustomUploadedFont } from '../../types';
import { CustomFontService } from '../../services/fontManager';
import { Upload, Type, CheckCircle, Trash2 } from 'lucide-react';

interface Props {
  customFonts: CustomUploadedFont[];
  onFontAdded: (font: CustomUploadedFont) => void;
  onFontRemoved: (fontId: string) => void;
  onAddTextWithFont: (fontFamily: string, sampleText: string) => void;
}

export const CustomFontsPanel: React.FC<Props> = ({
  customFonts,
  onFontAdded,
  onFontRemoved,
  onAddTextWithFont
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewPhrase, setPreviewPhrase] = useState('Saluti affettuosi di vero cuore 1928');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('Caricamento ed attivazione font nel browser...');
      const registered = await CustomFontService.registerFontFromFile(file);
      onFontAdded(registered);
      setUploadStatus(`Font "${registered.name}" attivato con successo!`);
      setTimeout(() => setUploadStatus(null), 3500);
    } catch (err) {
      console.error('Error loading font:', err);
      setUploadStatus('Errore nel caricamento del font. Assicurati che sia TTF, OTF, WOFF o WOFF2.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload button area */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          Carica il Tuo Font Personale:
        </label>
        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#C8B8A6] hover:border-[#A3431D] rounded-lg cursor-pointer bg-[#FFFFFF] transition-colors shadow-2xs">
          <Upload className="w-7 h-7 text-[#A3431D] mb-1" />
          <span className="text-xs font-bold text-[#24170E] text-center">
            {isUploading ? 'Caricamento font in corso...' : 'Trascina o scegli un file Font dal computer'}
          </span>
          <span className="text-[11px] text-[#705842] mt-0.5">
            Formati compatibili: .ttf, .otf, .woff, .woff2
          </span>
          <input
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFontUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>

        {uploadStatus && (
          <div className="mt-2 text-xs p-2.5 rounded-md bg-[#EDF7ED] border border-[#BDE0BD] text-[#1E5C1E] font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}
      </div>

      {/* Live Font Tester Box */}
      <div className="border-t border-[#D8C7B5] pt-3 bg-[#FAF5ED] p-3 rounded-lg border">
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1 block uppercase">
          Banco di Prova Tipografico:
        </label>
        <input
          type="text"
          value={previewPhrase}
          onChange={e => setPreviewPhrase(e.target.value)}
          placeholder="Digita un testo di prova..."
          className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-1.5 text-xs font-medium text-[#1E1208] outline-none focus:border-[#A3431D] mb-2"
        />
      </div>

      {/* List of uploaded custom fonts */}
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-1.5 block uppercase">
          I Tuoi Font Personali Attivi ({customFonts.length}):
        </label>

        {customFonts.length === 0 ? (
          <div className="p-4 rounded-lg bg-[#FAF5ED] border border-[#D8C7B5] text-center shadow-2xs">
            <Type className="w-6 h-6 mx-auto text-[#A3431D] mb-1.5" />
            <p className="text-xs font-bold text-[#24170E]">Nessun font personale ancora caricato.</p>
            <p className="text-[11px] text-[#634E3C] mt-1 leading-relaxed">
              Puoi caricare file di caratteri calligrafici o autografi per personalizzare ogni testo della cartolina.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
            {customFonts.map(font => (
              <div
                key={font.id}
                className="p-3 rounded-lg bg-[#FAF5ED] border border-[#D8C7B5] hover:border-[#A3431D] transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#24170E] flex items-center gap-1">
                    <span className="text-[#A3431D]">★</span> {font.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => onFontRemoved(font.id)}
                    className="p-1 text-[#8C6B54] hover:text-[#C92A2A] transition-colors cursor-pointer"
                    title="Rimuovi font"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Render sample in this font! */}
                <div
                  className="text-xl text-[#1E1208] my-1.5 truncate p-2 bg-[#FFFFFF] rounded border border-[#D8C7B5]"
                  style={{ fontFamily: font.familyName }}
                >
                  {previewPhrase || font.name}
                </div>

                <button
                  type="button"
                  onClick={() => onAddTextWithFont(font.familyName, previewPhrase)}
                  className="w-full mt-1.5 py-1.5 px-2.5 text-xs font-bold bg-[#EAE0D2] hover:bg-[#A3431D] hover:text-white text-[#3C2817] rounded transition-colors text-center cursor-pointer"
                >
                  + Usa questo font per una nuova scritta sulla cartolina
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
