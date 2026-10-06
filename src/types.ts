export type PostcardSide = 'front' | 'back';

export type PaperTextureType = 
  | 'aged-parchment' 
  | 'kraft' 
  | 'ivory-linen' 
  | 'tea-stained' 
  | 'postal-card-1930'
  | 'deckle-white';

export type ElementType = 
  | 'text' 
  | 'calligraphy' 
  | 'drawing' 
  | 'speech-bubble' 
  | 'stamp' 
  | 'postmark' 
  | 'blob' 
  | 'photo' 
  | 'washi-tape' 
  | 'wax-seal';

export type PhotoFilterType = 
  | 'none' 
  | 'sepia-1910' 
  | 'noir-daguerreotype' 
  | 'cyanotype' 
  | 'kodachrome' 
  | 'faded-sun';

export type PhotoFrameType = 
  | 'none' 
  | 'vintage-corners' 
  | 'scalloped' 
  | 'polaroid-retro' 
  | 'oval-cameo' 
  | 'deckle-border';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number; // percentage (0 to 100) or pixels
  y: number; // percentage (0 to 100) or pixels
  width: number;
  height: number;
  rotation: number; // degrees (-180 to 180)
  opacity: number; // 0 to 1
  zIndex: number;
  blendMode?: 'normal' | 'multiply' | 'darken';
  side: PostcardSide;
}

export interface TextElement extends BaseElement {
  type: 'text' | 'calligraphy';
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  isCurved?: boolean;
  curveRadius?: number;
  italic?: boolean;
  letterSpacing?: number;
}

export interface DrawingElement extends BaseElement {
  type: 'drawing';
  drawingId: string;
  title: string;
  color: string;
  strokeWidth?: number;
}

export interface SpeechBubbleElement extends BaseElement {
  type: 'speech-bubble';
  variant: 'retro-ribbon' | 'engraved-cloud' | 'vintage-balloon' | 'antique-scroll' | 'callout-banner';
  text: string;
  fontFamily: string;
  fontSize: number;
  fillColor: string;
  strokeColor: string;
  textColor: string;
}

export interface StampElement extends BaseElement {
  type: 'stamp';
  stampId: string;
  country: string;
  denomination: string;
  imageUrl?: string;
  color: string;
  customPhoto?: string; // photo embedded into postage stamp!
}

export interface PostmarkElement extends BaseElement {
  type: 'postmark';
  city: string;
  dateStr: string;
  department: string;
  style: 'double-ring' | 'single-ring-wavy' | 'airmail-box' | 'censorship-seal' | 'cancellation-bars';
  inkColor: string; // faded-black, sepia, postal-violet, postal-red
}

export interface BlobElement extends BaseElement {
  type: 'blob';
  blobVariant: 'watercolor-sepia' | 'coffee-ring' | 'ink-splatter' | 'organic-blob-1' | 'organic-blob-2' | 'organic-blob-3' | 'tea-wash';
  color: string;
}

export interface PhotoElement extends BaseElement {
  type: 'photo';
  url: string;
  fileName: string;
  filter: PhotoFilterType;
  frame: PhotoFrameType;
  sepiaAmount?: number;
  grainAmount?: number;
}

export interface WashiTapeElement extends BaseElement {
  type: 'washi-tape';
  pattern: 'kraft-tape' | 'airmail-stripes' | 'vintage-lace' | 'postage-marks';
  color: string;
}

export interface WaxSealElement extends BaseElement {
  type: 'wax-seal';
  sealColor: 'crimson' | 'burgundy' | 'antique-gold' | 'royal-navy' | 'forest-green';
  symbol: 'fleur-de-lis' | 'monogram-heart' | 'crown' | 'botanical-rose' | 'bee';
}

export type PostcardElement = 
  | TextElement 
  | DrawingElement 
  | SpeechBubbleElement 
  | StampElement 
  | PostmarkElement 
  | BlobElement 
  | PhotoElement 
  | WashiTapeElement 
  | WaxSealElement;

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type CreateElementInput = DistributiveOmit<PostcardElement, 'id' | 'zIndex' | 'side'>;

export interface CustomUploadedFont {
  id: string;
  name: string;
  familyName: string;
  format: string;
}

export interface PostcardProject {
  id: string;
  title: string;
  updatedAt: number;
  paperTexture: PaperTextureType;
  orientation: 'landscape' | 'portrait';
  backStyle: 'divided-1907' | 'airmail-classic' | 'minimalist' | 'ornate-postal';
  elements: PostcardElement[];
  // Back card standard metadata
  postalNote: string;
  recipientLines: string[];
}
