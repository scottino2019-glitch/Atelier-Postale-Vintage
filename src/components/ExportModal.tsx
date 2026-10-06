import React, { useState } from 'react';
import { PostcardProject } from '../types';
import { ExportService } from '../services/exportService';
import { Download, X, Check, Loader2, Printer } from 'lucide-react';

interface Props {
  project: PostcardProject;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ project, isOpen, onClose }) => {
  const [exportingSide, setExportingSide] = useState<'front' | 'back' | 'both' | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async (side: 'front' | 'back') => {
    try {
      setExportingSide(side);
      const canvas = await ExportService.renderSideToCanvas(project, side, 2400, 1500);
      const filename = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${side}.${format}`;
      ExportService.downloadCanvas(canvas, filename, format);
      setSuccessMessage(`Cartolina (${side === 'front' ? 'Fronte' : 'Retro'}) scaricata con successo!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExportingSide(null);
    }
  };

  const handleExportBoth = async () => {
    try {
      setExportingSide('both');
      const frontCanvas = await ExportService.renderSideToCanvas(project, 'front', 2400, 1500);
      const backCanvas = await ExportService.renderSideToCanvas(project, 'back', 2400, 1500);

      const combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = 2400;
      combinedCanvas.height = 3080;
      const ctx = combinedCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
        // Draw Front on top
        ctx.drawImage(frontCanvas, 0, 0);
        // Dividing line
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(40, 1540);
        ctx.lineTo(2360, 1540);
        ctx.stroke();
        // Draw Back on bottom
        ctx.drawImage(backCanvas, 0, 1580);

        const filename = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_fronte_retro.${format}`;
        ExportService.downloadCanvas(combinedCanvas, filename, format);
        setSuccessMessage('Foglio Fronte & Retro scaricato con successo!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Combined export error:', err);
    } finally {
      setExportingSide(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-900 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Chiudi finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Esporta la Tua Cartolina
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Immagine in alta qualità (2400 × 1500 px) pronta per la stampa o condivisione.
          </p>
        </div>

        {/* Format Selector */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
            Formato:
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormat('png')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                format === 'png'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              PNG (Massima qualità)
            </button>
            <button
              type="button"
              onClick={() => setFormat('jpeg')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                format === 'jpeg'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              JPEG (Standard)
            </button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            disabled={exportingSide !== null}
            onClick={() => handleExport('front')}
            className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Scarica Lato Fronte</span>
            </div>
            {exportingSide === 'front' ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <span className="text-xs text-slate-400 font-normal">2400 × 1500 px</span>
            )}
          </button>

          <button
            type="button"
            disabled={exportingSide !== null}
            onClick={() => handleExport('back')}
            className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Scarica Lato Retro (Indirizzo & Messaggio)</span>
            </div>
            {exportingSide === 'back' ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <span className="text-xs text-slate-400 font-normal">2400 × 1500 px</span>
            )}
          </button>

          <button
            type="button"
            disabled={exportingSide !== null}
            onClick={handleExportBoth}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide flex items-center justify-between transition-colors shadow-md cursor-pointer active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              <span>Scarica Foglio Fronte & Retro (Pronto Stampa)</span>
            </div>
            {exportingSide === 'both' ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span className="text-xs text-blue-100 font-medium">Doppio</span>
            )}
          </button>
        </div>

        {/* Feedback notification */}
        {successMessage && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
