import React, { useState, useEffect, useRef } from 'react';
import {
  PostcardElement,
  PostcardProject,
  PostcardSide,
  CustomUploadedFont,
  CreateElementInput,
  PaperTextureType
} from './types';
import { createBlankPostcard } from './blankPostcard';
import { CustomFontService } from './services/fontManager';
import { fileToDataUrl } from './services/photoFilter';
import { PostcardCanvas } from './components/canvas/PostcardCanvas';
import { DrawingsPanel } from './components/studio/DrawingsPanel';
import { SpeechBubblesPanel } from './components/studio/SpeechBubblesPanel';
import { BlobsPanel } from './components/studio/BlobsPanel';
import { CustomFontsPanel } from './components/studio/CustomFontsPanel';
import { ExportModal } from './components/ExportModal';
import { VINTAGE_FONTS } from './vintageLibrary';
import { PHOTO_FILTERS } from './services/photoFilter';
import {
  Type,
  MessageSquare,
  Image as ImageIcon,
  Stamp,
  Feather,
  Droplet,
  FolderUp,
  Printer,
  Trash2,
  X,
  RotateCw,
  Plus,
  Palette
} from 'lucide-react';

export default function App() {
  // Start with a completely clean blank postcard
  const [project, setProject] = useState<PostcardProject>(() => {
    try {
      localStorage.removeItem('atelier_vintage_saved_project');
      localStorage.removeItem('atelier_vintage_saved_project_v2');
      const saved = localStorage.getItem('atelier_vintage_saved_project_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load project', e);
    }
    return createBlankPostcard();
  });

  const [activeSide, setActiveSide] = useState<PostcardSide>('front');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [customFonts, setCustomFonts] = useState<CustomUploadedFont[]>([]);
  
  // Modal states for library pickers
  const [activeModal, setActiveModal] = useState<'drawings' | 'bubbles' | 'blobs' | 'fonts' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom fonts
  useEffect(() => {
    const saved = CustomFontService.getSavedFontMetadata();
    setCustomFonts(saved);
  }, []);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem('atelier_vintage_saved_project_v4', JSON.stringify(project));
    } catch (e) {
      console.warn('Could not save draft', e);
    }
  }, [project]);

  const selectedElement = project.elements.find(el => el.id === selectedElementId);

  const handleUpdateElement = (id: string, updates: Partial<PostcardElement>) => {
    setProject(prev => ({
      ...prev,
      updatedAt: Date.now(),
      elements: prev.elements.map(el => (el.id === id ? ({ ...el, ...updates } as PostcardElement) : el))
    }));
  };

  const handleDeleteElement = (id: string) => {
    setProject(prev => ({
      ...prev,
      updatedAt: Date.now(),
      elements: prev.elements.filter(el => el.id !== id)
    }));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  const handleDuplicateElement = (id: string) => {
    const el = project.elements.find(e => e.id === id);
    if (!el) return;
    const newEl: PostcardElement = {
      ...el,
      id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      x: Math.min(80, el.x + 5),
      y: Math.min(80, el.y + 5),
      zIndex: Math.max(...project.elements.map(e => e.zIndex), 0) + 1
    };
    setProject(prev => ({
      ...prev,
      elements: [...prev.elements, newEl]
    }));
    setSelectedElementId(newEl.id);
  };

  const handleReorderElement = (id: string, direction: 'up' | 'down') => {
    const currentZ = project.elements.find(e => e.id === id)?.zIndex || 1;
    const delta = direction === 'up' ? 1 : -1;
    handleUpdateElement(id, { zIndex: Math.max(1, currentZ + delta) });
  };

  const handleUpdateBackMetadata = (updates: Partial<PostcardProject>) => {
    setProject(prev => ({
      ...prev,
      ...updates,
      updatedAt: Date.now()
    }));
  };

  const addElement = (elementData: CreateElementInput) => {
    const maxZ = project.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
    const newElement = {
      ...elementData,
      id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      zIndex: maxZ + 1,
      side: activeSide
    } as PostcardElement;

    setProject(prev => ({
      ...prev,
      updatedAt: Date.now(),
      elements: [...prev.elements, newElement]
    }));
    setSelectedElementId(newElement.id);
  };

  // 1-Click: Add Text
  const handleAddText = () => {
    addElement({
      type: 'calligraphy',
      text: 'Il tuo testo qui',
      fontFamily: customFonts.length > 0 ? customFonts[0].familyName : 'Great Vibes',
      fontSize: 36,
      color: '#1F2937',
      textAlign: 'center',
      italic: false,
      x: 20,
      y: 40,
      width: 60,
      height: 20,
      rotation: 0,
      opacity: 1
    });
  };

  // 1-Click: Add Postmark Stamp
  const handleAddPostmark = () => {
    addElement({
      type: 'postmark',
      city: 'POSTA AEREA',
      dateStr: '1930',
      department: 'RACCOMANDATA',
      style: 'single-ring-wavy',
      inkColor: '#1F2937',
      x: 55,
      y: 10,
      width: 38,
      height: 38,
      rotation: -6,
      opacity: 0.9,
      blendMode: 'multiply'
    });
  };

  // 1-Click: Upload Photo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataUrl(file);
      addElement({
        type: 'photo',
        url: dataUrl,
        fileName: file.name,
        filter: 'sepia-1910',
        frame: 'vintage-corners',
        x: 25,
        y: 20,
        width: 50,
        height: 60,
        rotation: 0,
        opacity: 1
      });
      e.target.value = '';
    }
  };

  // 1-Click: Clear everything to blank postcard
  const handleClearPostcard = () => {
    setProject(createBlankPostcard());
    setSelectedElementId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Hidden Photo Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* TOP APP BAR: CLEAN, ELEGANT, MODERN */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-30">
        {/* App Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            ✉
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            Studio Cartoline Vintage
          </span>
        </div>

        {/* Fronte / Retro Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveSide('front')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              activeSide === 'front'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fronte ({project.elements.filter(e => e.side === 'front').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSide('back')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              activeSide === 'back'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Retro ({project.elements.filter(e => e.side === 'back').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md transition-transform active:rotate-180 cursor-pointer ml-0.5"
            title="Gira la cartolina"
            aria-label="Gira la cartolina"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleClearPostcard}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title="Svuota la cartolina e riparti da zero"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Svuota Cartolina</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Esporta Cartolina</span>
          </button>
        </div>
      </header>

      {/* SINGLE CLEAN TOOLBAR (Canva/Figma style) */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shadow-2xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
          Aggiungi:
        </span>

        {/* Add Text */}
        <button
          type="button"
          onClick={handleAddText}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <Type className="w-4 h-4 text-blue-600" />
          <span>+ Scritta / Testo</span>
        </button>

        {/* Add Speech Bubble */}
        <button
          type="button"
          onClick={() => setActiveModal('bubbles')}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>+ Nuvoletta / Cartiglio</span>
        </button>

        {/* Add Photo */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <ImageIcon className="w-4 h-4 text-purple-600" />
          <span>+ La Mia Foto</span>
        </button>

        {/* Add Postmark */}
        <button
          type="button"
          onClick={handleAddPostmark}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <Stamp className="w-4 h-4 text-amber-600" />
          <span>+ Timbro Postale</span>
        </button>

        {/* Add Drawing */}
        <button
          type="button"
          onClick={() => setActiveModal('drawings')}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <Feather className="w-4 h-4 text-indigo-600" />
          <span>+ Disegno Retrò</span>
        </button>

        {/* Add Blob / Seal */}
        <button
          type="button"
          onClick={() => setActiveModal('blobs')}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <Droplet className="w-4 h-4 text-rose-600" />
          <span>+ Ceralacca & Macchie</span>
        </button>

        {/* Upload Custom Font */}
        <button
          type="button"
          onClick={() => setActiveModal('fonts')}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
        >
          <FolderUp className="w-4 h-4 text-teal-600" />
          <span>+ I Miei Font ({customFonts.length})</span>
        </button>

        {/* Paper Background Color Selector */}
        <div className="ml-auto flex items-center gap-1 shrink-0 pl-3 border-l border-slate-200">
          <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
          <span className="text-xs font-semibold text-slate-600 mr-1.5">Carta:</span>
          {[
            { id: 'deckle-white' as PaperTextureType, label: 'Bianco', color: '#FFFFFF' },
            { id: 'ivory-linen' as PaperTextureType, label: 'Avorio', color: '#FAF8F3' },
            { id: 'tea-stained' as PaperTextureType, label: 'Pergamena', color: '#F5EFE4' },
            { id: 'kraft' as PaperTextureType, label: 'Kraft', color: '#EDE2D0' }
          ].map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleUpdateBackMetadata({ paperTexture: p.id })}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                project.paperTexture === p.id
                  ? 'border-blue-600 text-blue-700 shadow-2xs ring-1 ring-blue-600 font-bold'
                  : 'border-slate-300 text-slate-700 hover:bg-white'
              }`}
              style={{ backgroundColor: p.color }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* FLOATING TEXT EDITOR (Appears when ANY text or bubble is clicked) */}
      {selectedElement && (selectedElement.type === 'text' || selectedElement.type === 'calligraphy' || selectedElement.type === 'speech-bubble') && (
        <div className="bg-white border-b border-blue-200 px-6 py-2.5 flex flex-wrap items-center gap-4 z-20 shadow-xs animate-in fade-in duration-150">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide shrink-0">
            Modifica Testo:
          </span>

          {/* Quick text input */}
          <input
            type="text"
            value={selectedElement.text}
            onChange={e => handleUpdateElement(selectedElement.id, { text: e.target.value })}
            placeholder="Scrivi qui il tuo testo..."
            className="flex-1 min-w-[200px] bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
          />

          {/* Font dropdown */}
          <select
            value={selectedElement.fontFamily}
            onChange={e => handleUpdateElement(selectedElement.id, { fontFamily: e.target.value })}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 outline-none cursor-pointer focus:bg-white"
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
            <optgroup label="Caratteri Scrittura Vintage">
              {VINTAGE_FONTS.map(f => (
                <option key={f.family} value={f.family}>
                  {f.name}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Font size (+ / -) */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Taglia:</span>
            <button
              type="button"
              onClick={() => handleUpdateElement(selectedElement.id, { fontSize: Math.max(12, selectedElement.fontSize - 4) })}
              className="w-6 h-6 rounded bg-white hover:bg-slate-200 font-bold border border-slate-200 cursor-pointer flex items-center justify-center text-slate-800"
            >
              -
            </button>
            <span className="font-bold w-6 text-center text-slate-800">{selectedElement.fontSize}</span>
            <button
              type="button"
              onClick={() => handleUpdateElement(selectedElement.id, { fontSize: Math.min(96, selectedElement.fontSize + 4) })}
              className="w-6 h-6 rounded bg-white hover:bg-slate-200 font-bold border border-slate-200 cursor-pointer flex items-center justify-center text-slate-800"
            >
              +
            </button>
          </div>

          {/* Color Circles */}
          <div className="flex items-center gap-1.5">
            {['#1F2937', '#78350F', '#881337', '#1E3A8A', '#065F46', '#D97706'].map(c => {
              const activeColor =
                selectedElement.type === 'speech-bubble'
                  ? selectedElement.textColor
                  : selectedElement.color;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    if (selectedElement.type === 'speech-bubble') {
                      handleUpdateElement(selectedElement.id, { textColor: c, strokeColor: c });
                    } else {
                      handleUpdateElement(selectedElement.id, { color: c });
                    }
                  }}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${
                    activeColor === c ? 'border-blue-600 scale-110 shadow-xs ring-2 ring-blue-600/30' : 'border-white'
                  }`}
                  style={{ backgroundColor: c }}
                  title={`Colore ${c}`}
                />
              );
            })}
          </div>

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleDeleteElement(selectedElement.id)}
            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs flex items-center gap-1 cursor-pointer ml-auto border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Elimina</span>
          </button>
        </div>
      )}

      {/* FLOATING PHOTO EDITOR (Appears when a photo is clicked) */}
      {selectedElement && selectedElement.type === 'photo' && (
        <div className="bg-white border-b border-purple-200 px-6 py-2.5 flex flex-wrap items-center gap-4 z-20 shadow-xs animate-in fade-in duration-150">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wide shrink-0">
            Filtro & Cornice Foto:
          </span>

          {/* Filter */}
          <select
            value={selectedElement.filter}
            onChange={e => handleUpdateElement(selectedElement.id, { filter: e.target.value as any })}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 outline-none cursor-pointer"
          >
            {PHOTO_FILTERS.map(f => (
              <option key={f.id} value={f.id}>
                Filtro: {f.label}
              </option>
            ))}
          </select>

          {/* Frame */}
          <select
            value={selectedElement.frame}
            onChange={e => handleUpdateElement(selectedElement.id, { frame: e.target.value as any })}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 outline-none cursor-pointer"
          >
            <option value="vintage-corners">Angolini Album d'Epoca</option>
            <option value="polaroid-retro">Istantanea Retrò</option>
            <option value="scalloped">Dentellatura Francobollo</option>
            <option value="oval-cameo">Cammeo Ovale Antico</option>
            <option value="none">Senza Cornice</option>
          </select>

          {/* Delete Photo */}
          <button
            type="button"
            onClick={() => handleDeleteElement(selectedElement.id)}
            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs flex items-center gap-1 cursor-pointer ml-auto border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Elimina Foto</span>
          </button>
        </div>
      )}

      {/* MAIN WORKSPACE: CLEAN, AIRY, CALM */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <PostcardCanvas
          project={project}
          activeSide={activeSide}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onDuplicateElement={handleDuplicateElement}
          onReorderElement={handleReorderElement}
          onUpdateBackMetadata={handleUpdateBackMetadata}
          onQuickAddText={handleAddText}
        />
      </main>

      {/* CLEAN MODALS FOR PICKERS (Drawings, Bubbles, Blobs, Fonts) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 relative max-h-[85vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              aria-label="Chiudi finestra"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {activeModal === 'drawings' && 'Scegli un Disegno Retrò'}
              {activeModal === 'bubbles' && 'Scegli Nuvoletta o Cartiglio'}
              {activeModal === 'blobs' && 'Scegli Ceralacca o Macchia'}
              {activeModal === 'fonts' && 'Carica i Tuoi Font Personali'}
            </h3>

            {/* Modal Content */}
            {activeModal === 'drawings' && (
              <DrawingsPanel
                onAddDrawing={(drawing, inkColor) => {
                  addElement({
                    type: 'drawing',
                    drawingId: drawing.id,
                    title: drawing.name,
                    color: inkColor,
                    strokeWidth: 2,
                    x: 35,
                    y: 30,
                    width: 28,
                    height: 40,
                    rotation: 0,
                    opacity: 1,
                    blendMode: 'multiply'
                  });
                  setActiveModal(null);
                }}
              />
            )}

            {activeModal === 'bubbles' && (
              <SpeechBubblesPanel
                customFonts={customFonts}
                onAddSpeechBubble={config => {
                  addElement({
                    type: 'speech-bubble',
                    variant: config.variant,
                    text: config.text,
                    fontFamily: config.fontFamily,
                    fontSize: 22,
                    fillColor: config.fillColor,
                    strokeColor: config.strokeColor,
                    textColor: config.textColor,
                    x: 20,
                    y: 35,
                    width: 60,
                    height: 28,
                    rotation: 0,
                    opacity: 1
                  });
                  setActiveModal(null);
                }}
              />
            )}

            {activeModal === 'blobs' && (
              <BlobsPanel
                onAddBlob={(variant, color) => {
                  addElement({
                    type: 'blob',
                    blobVariant: variant,
                    color,
                    x: 30,
                    y: 30,
                    width: 38,
                    height: 48,
                    rotation: 0,
                    opacity: 0.6,
                    blendMode: 'multiply'
                  });
                  setActiveModal(null);
                }}
                onAddWaxSeal={(sealColor, symbol) => {
                  addElement({
                    type: 'wax-seal',
                    sealColor,
                    symbol,
                    x: 70,
                    y: 60,
                    width: 20,
                    height: 28,
                    rotation: 6,
                    opacity: 1
                  });
                  setActiveModal(null);
                }}
                onAddWashiTape={(pattern, color) => {
                  addElement({
                    type: 'washi-tape',
                    pattern,
                    color,
                    x: 20,
                    y: 8,
                    width: 45,
                    height: 7,
                    rotation: -3,
                    opacity: 0.9
                  });
                  setActiveModal(null);
                }}
              />
            )}

            {activeModal === 'fonts' && (
              <CustomFontsPanel
                customFonts={customFonts}
                onFontAdded={font => setCustomFonts(prev => [font, ...prev])}
                onFontRemoved={fontId => setCustomFonts(prev => prev.filter(f => f.id !== fontId))}
                onAddTextWithFont={(fontFamily, sampleText) => {
                  addElement({
                    type: 'calligraphy',
                    text: sampleText || 'Il tuo testo personale',
                    fontFamily,
                    fontSize: 36,
                    color: '#1F2937',
                    textAlign: 'center',
                    x: 20,
                    y: 40,
                    width: 60,
                    height: 20,
                    rotation: 0,
                    opacity: 1
                  });
                  setActiveModal(null);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      <ExportModal
        project={project}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
