import React, { useRef, useState, useEffect } from 'react';
import { PostcardElement, PostcardProject, PostcardSide } from '../../types';
import { DrawingRenderer } from '../renderers/DrawingRenderer';
import { SpeechBubbleRenderer } from '../renderers/SpeechBubbleRenderer';
import { PostmarkRenderer } from '../renderers/PostmarkRenderer';
import { StampRenderer } from '../renderers/StampRenderer';
import { BlobRenderer } from '../renderers/BlobRenderer';
import { PhotoRenderer } from '../renderers/PhotoRenderer';
import { WaxSealRenderer, WashiTapeRenderer } from '../renderers/WaxSealRenderer';
import { Trash2, Copy, ArrowUp, ArrowDown, RotateCw, Edit2, Plus, Type } from 'lucide-react';

interface Props {
  project: PostcardProject;
  activeSide: PostcardSide;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<PostcardElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onReorderElement: (id: string, direction: 'up' | 'down') => void;
  onUpdateBackMetadata: (updates: Partial<PostcardProject>) => void;
  onQuickAddText?: () => void;
}

export const PostcardCanvas: React.FC<Props> = ({
  project,
  activeSide,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onReorderElement,
  onUpdateBackMetadata,
  onQuickAddText
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inlineInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Dragging & Transforming state
  const [dragState, setDragState] = useState<{
    type: 'move' | 'resize' | 'rotate';
    elementId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    origRotation: number;
    resizeHandle?: string;
  } | null>(null);

  const [editingElementId, setEditingElementId] = useState<string | null>(null);

  const selectedElement = project.elements.find(el => el.id === selectedElementId);

  // Focus inline input when editing
  useEffect(() => {
    if (editingElementId && inlineInputRef.current) {
      inlineInputRef.current.focus();
      inlineInputRef.current.select();
    }
  }, [editingElementId]);

  // Pointer move handler
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragState || !containerRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = containerRef.current.getBoundingClientRect();

      const deltaXPercent = ((clientX - dragState.startX) / rect.width) * 100;
      const deltaYPercent = ((clientY - dragState.startY) / rect.height) * 100;

      if (dragState.type === 'move') {
        const newX = Math.max(-5, Math.min(95, dragState.origX + deltaXPercent));
        const newY = Math.max(-5, Math.min(95, dragState.origY + deltaYPercent));
        onUpdateElement(dragState.elementId, { x: newX, y: newY });
      } else if (dragState.type === 'resize') {
        const handle = dragState.resizeHandle;
        let newW = dragState.origW;
        let newH = dragState.origH;
        let newX = dragState.origX;
        let newY = dragState.origY;

        if (handle?.includes('e')) newW = Math.max(8, dragState.origW + deltaXPercent);
        if (handle?.includes('s')) newH = Math.max(8, dragState.origH + deltaYPercent);
        if (handle?.includes('w')) {
          const delta = deltaXPercent;
          newW = Math.max(8, dragState.origW - delta);
          newX = dragState.origX + delta;
        }
        if (handle?.includes('n')) {
          const delta = deltaYPercent;
          newH = Math.max(8, dragState.origH - delta);
          newY = dragState.origY + delta;
        }

        onUpdateElement(dragState.elementId, {
          x: newX,
          y: newY,
          width: newW,
          height: newH
        });
      } else if (dragState.type === 'rotate') {
        const elCenterX = (dragState.origX + dragState.origW / 2) / 100 * rect.width + rect.left;
        const elCenterY = (dragState.origY + dragState.origH / 2) / 100 * rect.height + rect.top;
        const angleRad = Math.atan2(clientY - elCenterY, clientX - elCenterX);
        const angleDeg = (angleRad * 180) / Math.PI - 90;
        onUpdateElement(dragState.elementId, { rotation: Math.round(angleDeg) });
      }
    };

    const handlePointerUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragState, onUpdateElement]);

  // Keyboard navigation & deletion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedElementId) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDeleteElement(selectedElementId);
        setEditingElementId(null);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 1;
        onUpdateElement(selectedElementId, { y: (selectedElement?.y ?? 0) - step });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 1;
        onUpdateElement(selectedElementId, { y: (selectedElement?.y ?? 0) + step });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 1;
        onUpdateElement(selectedElementId, { x: (selectedElement?.x ?? 0) - step });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const step = e.shiftKey ? 3 : 1;
        onUpdateElement(selectedElementId, { x: (selectedElement?.x ?? 0) + step });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, selectedElement, onDeleteElement, onUpdateElement]);

  const handleStartMove = (e: React.MouseEvent | React.TouchEvent, el: PostcardElement) => {
    if (editingElementId === el.id) return;
    e.stopPropagation();
    onSelectElement(el.id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragState({
      type: 'move',
      elementId: el.id,
      startX: clientX,
      startY: clientY,
      origX: el.x,
      origY: el.y,
      origW: el.width,
      origH: el.height,
      origRotation: el.rotation
    });
  };

  const handleStartResize = (e: React.MouseEvent | React.TouchEvent, handle: string) => {
    e.stopPropagation();
    if (!selectedElement) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragState({
      type: 'resize',
      elementId: selectedElement.id,
      startX: clientX,
      startY: clientY,
      origX: selectedElement.x,
      origY: selectedElement.y,
      origW: selectedElement.width,
      origH: selectedElement.height,
      origRotation: selectedElement.rotation,
      resizeHandle: handle
    });
  };

  const handleStartRotate = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!selectedElement) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragState({
      type: 'rotate',
      elementId: selectedElement.id,
      startX: clientX,
      startY: clientY,
      origX: selectedElement.x,
      origY: selectedElement.y,
      origW: selectedElement.width,
      origH: selectedElement.height,
      origRotation: selectedElement.rotation
    });
  };

  const currentSideElements = project.elements
    .filter(el => el.side === activeSide)
    .sort((a, b) => a.zIndex - b.zIndex);

  const getBackgroundColor = () => {
    switch (project.paperTexture) {
      case 'deckle-white': return '#FFFFFF';
      case 'ivory-linen': return '#FAF8F3';
      case 'tea-stained': return '#F5EFE4';
      case 'kraft': return '#EDE2D0';
      default: return '#FFFFFF';
    }
  };

  return (
    <div
      className="relative w-full max-w-[820px] aspect-[1.55] select-none mx-auto my-2"
      onClick={() => {
        onSelectElement(null);
        setEditingElementId(null);
      }}
    >
      {/* Postal Paper Card Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative rounded-md overflow-hidden shadow-xl border border-gray-300 transition-all duration-200"
        style={{
          backgroundColor: getBackgroundColor()
        }}
      >
        {/* Subtle, clean paper edge shadow */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]" />

        {/* FRONT SIDE EMPTY STATE (Clean, welcoming hint) */}
        {activeSide === 'front' && currentSideElements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
              <Type className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-gray-800">
              Cartolina Bianca
            </p>
            <p className="text-xs text-gray-500 mt-0.5 mb-3">
              Il foglio è pulito. Clicca per aggiungere il tuo testo o una foto.
            </p>
            {onQuickAddText && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onQuickAddText();
                }}
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-md shadow-sm transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Scrivi il tuo primo testo</span>
              </button>
            )}
          </div>
        )}

        {/* BACK OF POSTCARD: CLEAN, MINIMALIST, RESPONSIVE (NO FORCED HARDCODED TEXT!) */}
        {activeSide === 'back' && (
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between pointer-events-auto">
            {/* Main Divided Area */}
            <div className="flex-1 flex gap-6 sm:gap-8 my-1 relative">
              {/* Left Side: Clean handwritten message area (Starts completely blank!) */}
              <div className="flex-1 flex flex-col justify-start relative pr-3">
                <textarea
                  value={project.postalNote}
                  onChange={e => onUpdateBackMetadata({ postalNote: e.target.value })}
                  placeholder="Scrivi qui il tuo messaggio personale..."
                  className="w-full flex-1 bg-transparent resize-none outline-none font-caveat text-2xl sm:text-3xl text-gray-900 placeholder:text-gray-400 leading-relaxed font-medium"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0, 0, 0, 0.08) 32px)',
                    lineHeight: '32px'
                  }}
                />
              </div>

              {/* Vertical subtle dividing line */}
              <div className="w-px bg-gray-300 self-stretch relative shrink-0" />

              {/* Right Side: Stamp Box & Address Lines */}
              <div className="w-[45%] flex flex-col justify-between pl-3">
                {/* Stamp box on top right */}
                <div className="flex justify-end mb-3">
                  <div className="w-20 sm:w-24 h-24 sm:h-28 border border-dashed border-gray-400 rounded-sm p-1 flex flex-col items-center justify-center text-center bg-black/[0.01]">
                    <span className="text-[10px] sm:text-xs font-sans text-gray-400 uppercase tracking-widest font-semibold">
                      Francobollo
                    </span>
                  </div>
                </div>

                {/* Recipient Address Lines (Zero forced headers!) */}
                <div className="space-y-4 mb-2">
                  {[0, 1, 2, 3].map(lineIndex => (
                    <div key={lineIndex} className="relative">
                      <input
                        type="text"
                        value={project.recipientLines[lineIndex] || ''}
                        onChange={e => {
                          const updated = [...project.recipientLines];
                          updated[lineIndex] = e.target.value;
                          onUpdateBackMetadata({ recipientLines: updated });
                        }}
                        placeholder={
                          lineIndex === 0
                            ? 'Destinatario (Nome e Cognome)'
                            : lineIndex === 1
                            ? 'Indirizzo e N° civico'
                            : lineIndex === 2
                            ? 'Città e CAP'
                            : 'Nazione'
                        }
                        className="w-full bg-transparent border-b border-gray-300 outline-none font-caveat text-xl sm:text-2xl text-gray-900 font-medium pb-0.5 placeholder:text-gray-400 placeholder:font-sans placeholder:text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC ELEMENTS LAYER */}
        {currentSideElements.map(el => {
          const isSelected = el.id === selectedElementId;
          const isEditing = el.id === editingElementId;

          return (
            <div
              key={el.id}
              id={`element-node-${el.id}`}
              className={`absolute cursor-move select-none transition-shadow ${
                isSelected ? 'ring-2 ring-blue-600 z-50' : 'hover:ring-1 hover:ring-gray-400'
              }`}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                transform: `rotate(${el.rotation}deg)`,
                opacity: el.opacity,
                mixBlendMode: el.blendMode || 'normal',
                zIndex: isSelected ? 99 : el.zIndex
              }}
              onMouseDown={e => handleStartMove(e, el)}
              onTouchStart={e => handleStartMove(e, el)}
              onDoubleClick={e => {
                e.stopPropagation();
                if (el.type === 'text' || el.type === 'calligraphy' || el.type === 'speech-bubble') {
                  setEditingElementId(el.id);
                }
              }}
            >
              {/* Element Renderers */}
              {el.type === 'drawing' && <DrawingRenderer element={el} />}
              {el.type === 'postmark' && <PostmarkRenderer element={el} />}
              {el.type === 'stamp' && <StampRenderer element={el} />}
              {el.type === 'blob' && <BlobRenderer element={el} />}
              {el.type === 'photo' && <PhotoRenderer element={el} />}
              {el.type === 'wax-seal' && <WaxSealRenderer element={el} />}
              {el.type === 'washi-tape' && <WashiTapeRenderer element={el} />}

              {/* Speech bubble rendering & inline edit */}
              {el.type === 'speech-bubble' && (
                <>
                  <SpeechBubbleRenderer element={el} />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center p-3 bg-white/95 z-30 rounded shadow-lg border border-blue-500">
                      <input
                        ref={inlineInputRef as any}
                        type="text"
                        value={el.text}
                        onChange={e => onUpdateElement(el.id, { text: e.target.value })}
                        onKeyDown={e => {
                          if (e.key === 'Enter') setEditingElementId(null);
                        }}
                        onBlur={() => setEditingElementId(null)}
                        className="w-full text-center text-sm font-semibold border-b-2 border-blue-600 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Text / Calligraphy rendering & inline edit */}
              {(el.type === 'text' || el.type === 'calligraphy') && (
                <div
                  className="w-full h-full flex items-center justify-center p-1 leading-tight select-none relative"
                  style={{
                    fontFamily: el.fontFamily,
                    fontSize: `${el.fontSize}px`,
                    color: el.color,
                    textAlign: el.textAlign || 'center',
                    fontStyle: el.italic ? 'italic' : 'normal',
                    letterSpacing: `${el.letterSpacing || 0}px`
                  }}
                >
                  {isEditing ? (
                    <textarea
                      ref={inlineInputRef as any}
                      value={el.text}
                      onChange={e => onUpdateElement(el.id, { text: e.target.value })}
                      onBlur={() => setEditingElementId(null)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          setEditingElementId(null);
                        }
                      }}
                      className="w-full h-full resize-none text-center outline-none bg-white/95 border-2 border-blue-600 rounded p-1 text-gray-900 shadow-lg z-30"
                      style={{
                        fontFamily: el.fontFamily,
                        fontSize: `${el.fontSize}px`
                      }}
                    />
                  ) : (
                    <span className="break-words w-full">{el.text}</span>
                  )}
                </div>
              )}

              {/* SELECTION BOUNDING BOX & INTERACTION HANDLES */}
              {isSelected && (
                <>
                  {/* Top Rotation Handle */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <button
                      type="button"
                      aria-label="Ruota elemento"
                      className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md border border-gray-300 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                      onMouseDown={handleStartRotate}
                      onTouchStart={handleStartRotate}
                    >
                      <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <div className="w-0.5 h-2 bg-blue-600" />
                  </div>

                  {/* 4 Corner Resize Handles */}
                  <div
                    aria-label="Ridimensiona nord-ovest"
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-xs cursor-nwse-resize shadow-xs"
                    onMouseDown={e => handleStartResize(e, 'nw')}
                    onTouchStart={e => handleStartResize(e, 'nw')}
                  />
                  <div
                    aria-label="Ridimensiona nord-est"
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-xs cursor-nesw-resize shadow-xs"
                    onMouseDown={e => handleStartResize(e, 'ne')}
                    onTouchStart={e => handleStartResize(e, 'ne')}
                  />
                  <div
                    aria-label="Ridimensiona sud-ovest"
                    className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-xs cursor-nesw-resize shadow-xs"
                    onMouseDown={e => handleStartResize(e, 'sw')}
                    onTouchStart={e => handleStartResize(e, 'sw')}
                  />
                  <div
                    aria-label="Ridimensiona sud-est"
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-600 rounded-xs cursor-nwse-resize shadow-xs"
                    onMouseDown={e => handleStartResize(e, 'se')}
                    onTouchStart={e => handleStartResize(e, 'se')}
                  />

                  {/* Clean, Modern Floating Action Toolbar */}
                  <div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xl z-50 text-xs font-medium text-gray-800 whitespace-nowrap"
                    onClick={e => e.stopPropagation()}
                  >
                    {(el.type === 'text' || el.type === 'calligraphy' || el.type === 'speech-bubble') && (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditingElementId(editingElementId === el.id ? null : el.id)}
                          className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>{editingElementId === el.id ? 'Fine' : 'Modifica'}</span>
                        </button>
                        <span className="w-px h-3.5 bg-gray-200" />
                      </>
                    )}

                    <button
                      type="button"
                      aria-label="Porta avanti"
                      onClick={() => onReorderElement(el.id, 'up')}
                      className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                      title="Porta avanti"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Invia indietro"
                      onClick={() => onReorderElement(el.id, 'down')}
                      className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                      title="Invia indietro"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-px h-3.5 bg-gray-200" />
                    <button
                      type="button"
                      aria-label="Duplica elemento"
                      onClick={() => onDuplicateElement(el.id)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                      title="Duplica"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Elimina elemento"
                      onClick={() => onDeleteElement(el.id)}
                      className="p-1 hover:bg-red-50 text-red-600 rounded font-semibold flex items-center gap-1 cursor-pointer"
                      title="Elimina"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Elimina</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
