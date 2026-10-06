import { CustomUploadedFont } from '../types';

const FONT_STORAGE_KEY = 'atelier_vintage_custom_fonts';

export class CustomFontService {
  private static registeredFonts: Map<string, FontFace> = new Map();

  /**
   * Load stored font references from previous sessions if any
   */
  public static getSavedFontMetadata(): CustomUploadedFont[] {
    try {
      const data = localStorage.getItem(FONT_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Register a font file provided by the user (TTF, OTF, WOFF, WOFF2)
   */
  public static async registerFontFromFile(file: File): Promise<CustomUploadedFont> {
    const rawName = file.name.replace(/\.[^/.]+$/, '');
    const cleanFamily = `UserFont_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`;
    const buffer = await file.arrayBuffer();

    // Determine font format
    let format = 'truetype';
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'woff2') format = 'woff2';
    else if (ext === 'woff') format = 'woff';
    else if (ext === 'otf') format = 'opentype';

    // Register via native FontFace API
    const fontFace = new FontFace(cleanFamily, buffer);
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
    this.registeredFonts.set(cleanFamily, loadedFont);

    const customFont: CustomUploadedFont = {
      id: `font_${Date.now()}`,
      name: rawName,
      familyName: cleanFamily,
      format
    };

    // Save metadata
    try {
      const existing = this.getSavedFontMetadata();
      const updated = [customFont, ...existing.filter(f => f.name !== rawName)];
      localStorage.setItem(FONT_STORAGE_KEY, JSON.stringify(updated.slice(0, 15)));
    } catch (e) {
      console.warn('Could not persist font metadata to localStorage:', e);
    }

    return customFont;
  }

  /**
   * Register a web font or custom name directly
   */
  public static isFontLoaded(fontFamily: string): boolean {
    return document.fonts.check(`16px "${fontFamily}"`);
  }
}
