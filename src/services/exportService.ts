import { PostcardElement, PostcardProject, PostcardSide } from '../types';
import { PAPER_TEXTURE_URL } from '../vintageLibrary';
import { getCssFilterForType } from './photoFilter';

export class ExportService {
  /**
   * Render a postcard side onto a high-res canvas (2400 x 1500 px = 300 DPI 4x6" card)
   */
  public static async renderSideToCanvas(
    project: PostcardProject,
    side: PostcardSide,
    targetWidth = 2400,
    targetHeight = 1500
  ): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D canvas context');

    // 1. Draw base clean paper color
    const paperColor = 
      project.paperTexture === 'deckle-white' ? '#FFFFFF' :
      project.paperTexture === 'kraft' ? '#F2E8DC' :
      project.paperTexture === 'tea-stained' ? '#F4EADA' : '#FCFAF6';
    
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // Subtle paper edge border
    ctx.strokeStyle = '#D8C7B5';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, targetWidth - 12, targetHeight - 12);

    // 3. Vintage border vignette
    const vignette = ctx.createRadialGradient(
      targetWidth / 2,
      targetHeight / 2,
      targetWidth * 0.4,
      targetWidth / 2,
      targetHeight / 2,
      targetWidth * 0.72
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(74, 48, 24, 0.35)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    // 4. If rendering BACK side, draw classical postal layout
    if (side === 'back') {
      this.drawBackPostalLayout(ctx, targetWidth, targetHeight, project);
    }

    // 5. Draw elements belonging to this side, sorted by zIndex
    const sideElements = project.elements
      .filter(el => el.side === side)
      .sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sideElements) {
      ctx.save();
      const elX = (el.x / 100) * targetWidth;
      const elY = (el.y / 100) * targetHeight;
      const elW = (el.width / 100) * targetWidth;
      const elH = (el.height / 100) * targetHeight;

      ctx.translate(elX + elW / 2, elY + elH / 2);
      ctx.rotate((el.rotation * Math.PI) / 180);
      ctx.globalAlpha = el.opacity;

      if (el.blendMode === 'multiply') {
        ctx.globalCompositeOperation = 'multiply';
      }

      await this.drawElement(ctx, el, -elW / 2, -elH / 2, elW, elH);
      ctx.restore();
    }

    return canvas;
  }

  private static drawBackPostalLayout(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    project: PostcardProject
  ) {
    ctx.save();
    ctx.strokeStyle = '#4a3826';
    ctx.fillStyle = '#382819';
    ctx.lineWidth = 3;

    // Header title
    ctx.font = 'bold 38px "IM Fell English SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('CARTOLINA POSTALE ITALIANA', w / 2, 90);

    ctx.font = 'italic 20px "Cormorant Garamond", serif';
    ctx.fillText('(CARTE POSTALE - POST CARD)', w / 2, 125);

    // Central vertical dividing line
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(w * 0.48, 160);
    ctx.lineTo(w * 0.48, h - 80);
    ctx.stroke();
    ctx.setLineDash([]);

    // Stamp placement rectangle (top-right)
    const stampBoxX = w - 240;
    const stampBoxY = 60;
    const stampBoxW = 180;
    const stampBoxH = 220;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(stampBoxX, stampBoxY, stampBoxW, stampBoxH);
    ctx.setLineDash([]);

    ctx.font = '16px "IM Fell English SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('AFFRANCARE', stampBoxX + stampBoxW / 2, stampBoxY + stampBoxH / 2 - 10);
    ctx.fillText('QUI', stampBoxX + stampBoxW / 2, stampBoxY + stampBoxH / 2 + 15);

    // Recipient address lines on the right side
    const startX = w * 0.52;
    const endX = w - 70;
    const startY = 380;
    const lineSpacing = 110;

    for (let i = 0; i < 5; i++) {
      const lineY = startY + i * lineSpacing;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, lineY);
      ctx.lineTo(endX, lineY);
      ctx.stroke();

      // Recipient line text if available
      const lineText = project.recipientLines[i];
      if (lineText) {
        ctx.font = 'italic 34px "Caveat", "Playfair Display", serif';
        ctx.textAlign = 'left';
        ctx.fillText(lineText, startX + 20, lineY - 12);
      }
    }

    // Message note on the left side if written
    if (project.postalNote) {
      ctx.font = '36px "Caveat", cursive';
      ctx.textAlign = 'left';
      const lines = project.postalNote.split('\n');
      let currentY = 220;
      for (const line of lines) {
        ctx.fillText(line, 80, currentY);
        currentY += 48;
      }
    }

    ctx.restore();
  }

  private static async drawElement(
    ctx: CanvasRenderingContext2D,
    el: PostcardElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    if (el.type === 'text' || el.type === 'calligraphy') {
      ctx.fillStyle = el.color;
      ctx.font = `${el.italic ? 'italic ' : ''}${Math.round(el.fontSize * 2.2)}px "${el.fontFamily}", cursive, serif`;
      ctx.textAlign = el.textAlign || 'center';
      const textX = el.textAlign === 'left' ? x : el.textAlign === 'right' ? x + w : x + w / 2;
      ctx.fillText(el.text, textX, y + h / 2 + el.fontSize * 0.7);
    } else if (el.type === 'photo' && el.url) {
      try {
        const img = await this.loadImage(el.url);
        ctx.drawImage(img, x, y, w, h);
      } catch (err) {
        console.error('Failed to draw photo on export canvas', err);
      }
    } else {
      // For SVG vector elements (postmark, drawing, speech-bubble, blob, stamp, wax-seal),
      // render using inline SVG converted to image
      await this.drawSvgElementToCanvas(ctx, el, x, y, w, h);
    }
  }

  private static async drawSvgElementToCanvas(
    ctx: CanvasRenderingContext2D,
    el: PostcardElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const elDom = document.getElementById(`element-node-${el.id}`);
    if (!elDom) return;

    const svg = elDom.querySelector('svg');
    if (!svg) return;

    try {
      const xml = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
      const urlHelper = window.URL || URL;
      const blobUrl = urlHelper.createObjectURL(svgBlob);
      const img = await this.loadImage(blobUrl);
      ctx.drawImage(img, x, y, w, h);
      urlHelper.revokeObjectURL(blobUrl);
    } catch (e) {
      console.warn('SVG export rasterization fallback', e);
    }
  }

  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Trigger immediate download of image
   */
  public static downloadCanvas(canvas: HTMLCanvasElement, filename: string, type: 'png' | 'jpeg' = 'png') {
    const mime = type === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality = type === 'jpeg' ? 0.94 : 1.0;
    const dataUrl = canvas.toDataURL(mime, quality);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
