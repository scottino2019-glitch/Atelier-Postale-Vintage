export interface DrawingItem {
  id: string;
  name: string;
  category: 'fauna' | 'flora' | 'oggetti' | 'viaggio' | 'ornamenti';
  svgPath: string;
  viewBox: string;
}

export interface SpeechBubblePreset {
  id: string;
  variant: 'retro-ribbon' | 'engraved-cloud' | 'vintage-balloon' | 'antique-scroll' | 'callout-banner';
  name: string;
  sampleText: string;
}

export interface StampPreset {
  id: string;
  country: string;
  denomination: string;
  name: string;
  color: string;
  iconPath?: string;
}

export interface PostmarkPreset {
  id: string;
  name: string;
  city: string;
  dateStr: string;
  department: string;
  style: 'double-ring' | 'single-ring-wavy' | 'airmail-box' | 'censorship-seal' | 'cancellation-bars';
  inkColor: string;
}

export interface BlobPreset {
  id: string;
  name: string;
  variant: 'watercolor-sepia' | 'coffee-ring' | 'ink-splatter' | 'organic-blob-1' | 'organic-blob-2' | 'organic-blob-3' | 'tea-wash';
  color: string;
}

export interface CalligraphyPreset {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  italic?: boolean;
}

export const PAPER_TEXTURE_URL = '/src/assets/images/vintage_paper_texture_1791278962069.jpg';
export const POSTAL_STAMPS_URL = '/src/assets/images/vintage_postal_stamps_1791278974982.jpg';
export const RETRO_ENGRAVINGS_URL = '/src/assets/images/vintage_retro_engravings_1791278986721.jpg';
export const WAX_SEALS_URL = '/src/assets/images/vintage_wax_seals_1791278996789.jpg';

// Curated Retro Vector Drawings (Classic 19th/20th century Victorian etchings & engravings)
export const VINTAGE_DRAWINGS: DrawingItem[] = [
  {
    id: 'swallow-bird',
    name: 'Rondine Messaggera (1902)',
    category: 'fauna',
    viewBox: '0 0 100 100',
    svgPath: 'M 90 20 C 75 25 60 40 50 50 C 45 42 35 30 20 25 C 28 35 38 48 44 55 C 32 60 15 65 5 75 C 25 72 40 68 47 62 C 45 72 40 85 30 95 C 42 85 52 75 55 64 C 62 70 78 78 95 82 C 80 72 68 62 60 56 C 72 50 82 38 90 20 Z'
  },
  {
    id: 'hot-air-balloon',
    name: 'Mongolfiera Aerostatica',
    category: 'viaggio',
    viewBox: '0 0 100 120',
    svgPath: 'M 50 5 C 25 5 15 30 15 50 C 15 68 35 85 45 92 L 44 100 L 56 100 L 55 92 C 65 85 85 68 85 50 C 85 30 75 5 50 5 Z M 44 105 L 42 115 L 58 115 L 56 105 Z M 50 15 C 60 25 62 45 60 85 C 55 88 45 88 40 85 C 38 45 40 25 50 15 Z'
  },
  {
    id: 'penny-farthing',
    name: 'Biciclo d\'Epoca (1885)',
    category: 'viaggio',
    viewBox: '0 0 100 100',
    svgPath: 'M 35 55 A 25 25 0 1 0 35 5 A 25 25 0 1 0 35 55 Z M 35 30 L 60 45 L 80 75 M 60 45 L 55 25 L 45 25 M 60 45 L 68 55 M 80 75 A 10 10 0 1 0 80 55 A 10 10 0 1 0 80 75 Z'
  },
  {
    id: 'pocket-watch',
    name: 'Orologio da Taschino',
    category: 'oggetti',
    viewBox: '0 0 100 110',
    svgPath: 'M 50 5 A 8 8 0 0 0 50 21 A 38 38 0 1 0 50 97 A 38 38 0 0 0 50 21 Z M 50 29 A 30 30 0 1 1 50 89 A 30 30 0 0 1 50 29 Z M 50 59 L 50 40 M 50 59 L 65 65'
  },
  {
    id: 'vintage-rose',
    name: 'Rosa Botanica Incisa',
    category: 'flora',
    viewBox: '0 0 100 100',
    svgPath: 'M 50 20 C 40 10 25 20 30 35 C 20 40 20 55 35 60 C 35 75 50 78 55 70 C 65 75 80 65 75 50 C 85 40 80 25 65 25 C 60 15 52 15 50 20 Z M 50 72 C 50 85 52 95 55 98 M 51 80 C 40 80 30 85 28 88 M 53 88 C 65 88 72 82 75 80'
  },
  {
    id: 'antique-key',
    name: 'Chiave del Segreto',
    category: 'oggetti',
    viewBox: '0 0 100 100',
    svgPath: 'M 25 35 A 15 15 0 1 0 25 15 A 15 15 0 0 0 25 35 Z M 25 20 A 5 5 0 1 1 25 30 A 5 5 0 0 1 25 20 Z M 35 30 L 80 75 L 85 70 L 90 75 L 85 80 L 80 75 L 75 80 L 70 75 M 80 85 L 70 75'
  },
  {
    id: 'sailing-ship',
    name: 'Veliero Transoceanico',
    category: 'viaggio',
    viewBox: '0 0 100 100',
    svgPath: 'M 10 75 C 25 85 75 85 90 75 L 80 85 C 60 92 35 92 18 85 Z M 50 15 L 50 70 M 52 20 C 68 25 70 45 52 50 C 68 53 66 68 52 70 M 48 30 C 35 33 33 48 48 50 C 32 55 34 68 48 70 M 20 50 L 50 15 L 85 50'
  },
  {
    id: 'fountain-pen',
    name: 'Pennino Calligrafico',
    category: 'oggetti',
    viewBox: '0 0 100 100',
    svgPath: 'M 20 80 L 70 30 L 80 40 L 30 90 Z M 70 30 L 85 15 C 90 20 85 25 80 40 Z M 85 15 L 80 20 M 20 80 L 10 95 L 25 85 Z'
  },
  {
    id: 'crescent-sun',
    name: 'Sole & Luna Alchemica',
    category: 'ornamenti',
    viewBox: '0 0 100 100',
    svgPath: 'M 50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 1 50 10 Z M 50 5 L 50 0 M 50 95 L 50 100 M 5 50 L 0 50 M 95 50 L 100 50 M 18 18 L 14 14 M 82 82 L 86 86 M 18 82 L 14 86 M 82 18 L 86 14'
  },
  {
    id: 'art-nouveau-corner',
    name: 'Fregio Liberty Angolare',
    category: 'ornamenti',
    viewBox: '0 0 100 100',
    svgPath: 'M 5 5 L 90 5 C 70 15 50 15 35 35 C 15 50 15 70 5 90 Z M 20 20 C 35 20 40 35 30 45 C 20 35 25 25 20 20 Z'
  },
  {
    id: 'olive-wreath',
    name: 'Corona d\'Ulivo & Alloro',
    category: 'flora',
    viewBox: '0 0 100 100',
    svgPath: 'M 50 90 C 25 85 10 60 15 35 C 20 45 30 48 32 38 C 35 48 45 50 45 40 M 50 90 C 75 85 90 60 85 35 C 80 45 70 48 68 38 C 65 48 55 50 55 40'
  },
  {
    id: 'royal-bee',
    name: 'Ape Napoleonica',
    category: 'fauna',
    viewBox: '0 0 100 100',
    svgPath: 'M 50 35 C 45 35 40 42 40 55 C 40 70 47 80 50 85 C 53 80 60 70 60 55 C 60 42 55 35 50 35 Z M 40 50 C 25 45 10 40 10 30 C 20 25 35 35 40 45 Z M 60 50 C 75 45 90 40 90 30 C 80 25 65 35 60 45 Z M 50 25 A 6 6 0 1 0 50 37 A 6 6 0 1 0 50 25 Z'
  }
];

// Nuvolette & Cartigli (Speech Bubbles, Ribbons, Banners)
export const VINTAGE_SPEECH_BUBBLES: SpeechBubblePreset[] = [
  {
    id: 'ribbon-banner',
    variant: 'retro-ribbon',
    name: 'Cartiglio Arricciato d\'Epoca',
    sampleText: 'Saluti da Roma!'
  },
  {
    id: 'engraved-cloud',
    variant: 'engraved-cloud',
    name: 'Nuvola con Tratteggio Inciso',
    sampleText: 'Un dolce pensiero per te…'
  },
  {
    id: 'vintage-balloon',
    variant: 'vintage-balloon',
    name: 'Fumetto Retrò Anni \'30',
    sampleText: 'Baci affettuosi!'
  },
  {
    id: 'antique-scroll',
    variant: 'antique-scroll',
    name: 'Pergamena Arrotolata',
    sampleText: 'Ricordo Indelebile'
  },
  {
    id: 'callout-banner',
    variant: 'callout-banner',
    name: 'Stendardo Postale Sagomato',
    sampleText: 'Posta Aerea Celere'
  }
];

// Timbri Postali Gommati (Rubber Postal Cancellation & Transit Marks)
export const VINTAGE_POSTMARKS: PostmarkPreset[] = [
  {
    id: 'postmark-milano',
    name: 'Milano Ferrovia (1932)',
    city: 'MILANO FERROVIA',
    dateStr: '18 . IX . 1932',
    department: 'POSTA AMBULANTE',
    style: 'double-ring',
    inkColor: '#1e1c18'
  },
  {
    id: 'postmark-roma-air',
    name: 'Roma Posta Aerea',
    city: 'ROMA CENTRO',
    dateStr: '24 . IV . 1928',
    department: 'POSTA AEREA RACCOMANDATA',
    style: 'single-ring-wavy',
    inkColor: '#6b2d2d'
  },
  {
    id: 'postmark-venezia',
    name: 'Venezia Santa Lucia',
    city: 'VENEZIA S. LUCIA',
    dateStr: '03 . VI . 1914',
    department: 'CORRISPONDENZE',
    style: 'double-ring',
    inkColor: '#253552'
  },
  {
    id: 'postmark-par-avion',
    name: 'Cartiglio Par Avion',
    city: 'PAR AVION',
    dateStr: 'BY AIR MAIL',
    department: 'POSTES D\'ITALIE',
    style: 'airmail-box',
    inkColor: '#1d3e68'
  },
  {
    id: 'postmark-censura',
    name: 'Censura Postale Militare',
    city: 'VERIFICATO PER CENSURA',
    dateStr: 'UFFICIO REVISIONE',
    department: 'N° 402 - REGIO ESERCITO',
    style: 'censorship-seal',
    inkColor: '#582121'
  },
  {
    id: 'postmark-wavy-cancel',
    name: 'Annullamento a Barre Ondulate',
    city: 'BOLOGNA',
    dateStr: '12 . XI . 1925',
    department: 'ARRIVO E PARTENZA',
    style: 'cancellation-bars',
    inkColor: '#2b231c'
  }
];

// Francobolli d'Epoca (Vintage Postage Stamps)
export const VINTAGE_STAMPS: StampPreset[] = [
  {
    id: 'stamp-leoni-20c',
    country: 'POSTE ITALIANE',
    denomination: 'Cent. 20',
    name: 'Serie Leoni 1915',
    color: '#8b4513'
  },
  {
    id: 'stamp-posta-aerea',
    country: 'REGNO D\'ITALIA',
    denomination: 'L. 1,20',
    name: 'Idrovolante Posta Aerea 1926',
    color: '#1b4d3e'
  },
  {
    id: 'stamp-vittorio-emanuele',
    country: 'ITALIA',
    denomination: 'Cent. 25',
    name: 'Profilo Reale Imperiale',
    color: '#1e3f66'
  },
  {
    id: 'stamp-botanica-50c',
    country: 'POSTES BELGIQUE',
    denomination: '50 c.',
    name: 'Erbario Imperiale',
    color: '#654321'
  },
  {
    id: 'stamp-francia-marianna',
    country: 'RÉPUBLIQUE FRANÇAISE',
    denomination: '30 c.',
    name: 'Seminatrice Classica',
    color: '#800020'
  }
];

// Macchie, Stampi & Forme Organiche Vintage (Blobs, Tea stains, Ink splatters)
export const VINTAGE_BLOBS: BlobPreset[] = [
  {
    id: 'coffee-ring',
    name: 'Alone di Tazza di Caffè',
    variant: 'coffee-ring',
    color: '#704822'
  },
  {
    id: 'watercolor-sepia',
    name: 'Lavatura ad Acquerello Seppia',
    variant: 'watercolor-sepia',
    color: '#b08d57'
  },
  {
    id: 'ink-splatter',
    name: 'Schizzo d\'Inchiostro di Pennino',
    variant: 'ink-splatter',
    color: '#2a2118'
  },
  {
    id: 'tea-wash',
    name: 'Sfumatura Infuso d\'Erba d\'Epoca',
    variant: 'tea-wash',
    color: '#9c663b'
  },
  {
    id: 'organic-blob-1',
    name: 'Forma Organica Decoupage A',
    variant: 'organic-blob-1',
    color: '#c29b68'
  },
  {
    id: 'organic-blob-2',
    name: 'Forma Organica Decoupage B',
    variant: 'organic-blob-2',
    color: '#826244'
  }
];

// Calligrafie e Frasi Vintage Pronte
export const CALLIGRAPHY_PRESETS: CalligraphyPreset[] = [
  {
    id: 'saluti-affettuosi',
    text: 'Saluti Affettuosi',
    fontFamily: 'Great Vibes',
    fontSize: 34,
    color: '#281c15',
    italic: true
  },
  {
    id: 'baci-abbracci',
    text: 'Baci e Abbracci dall\'Italia',
    fontFamily: 'Italianno',
    fontSize: 42,
    color: '#3d251e',
    italic: true
  },
  {
    id: 'posta-speciale',
    text: 'Posta Speciale per Te',
    fontFamily: 'Alex Brush',
    fontSize: 36,
    color: '#1a2436',
    italic: true
  },
  {
    id: 'ricordo-eterno',
    text: 'Un Dolce Ricordo Indelebile',
    fontFamily: 'Marck Script',
    fontSize: 30,
    color: '#422d22',
    italic: false
  },
  {
    id: 'buon-viaggio',
    text: 'Buon Viaggio & A Presto!',
    fontFamily: 'Caveat',
    fontSize: 32,
    color: '#242b1f',
    italic: false
  },
  {
    id: 'telegramma-urgente',
    text: 'TELEGRAMMA URGENTE // STOP // TI ATTENDO //',
    fontFamily: 'Special Elite',
    fontSize: 20,
    color: '#1f1b18',
    italic: false
  },
  {
    id: 'corrispondenza-privata',
    text: 'Corrispondenza Riservata',
    fontFamily: 'Cormorant Garamond',
    fontSize: 26,
    color: '#341f1a',
    italic: true
  }
];

export const VINTAGE_FONTS = [
  { name: 'Great Vibes (Corsivo Elegante)', family: 'Great Vibes' },
  { name: 'Italianno (Calligrafia Fluida)', family: 'Italianno' },
  { name: 'Alex Brush (Scrittura d\'Epoca)', family: 'Alex Brush' },
  { name: 'Marck Script (Corsivo Autografo)', family: 'Marck Script' },
  { name: 'Caveat (Scrittura a Mano Naturale)', family: 'Caveat' },
  { name: 'Special Elite (Macchina da Scrivere)', family: 'Special Elite' },
  { name: 'Cormorant Garamond (Serif Imperiale)', family: 'Cormorant Garamond' },
  { name: 'Playfair Display (Titolo d\'Epoca)', family: 'Playfair Display' },
  { name: 'Cinzel Decorative (Capilettera Monumentali)', family: 'Cinzel Decorative' },
  { name: 'IM Fell English SC (Stampa a Caratteri Mobili)', family: 'IM Fell English SC' },
  { name: 'Courier Prime (Dattiloscritto 1940)', family: 'Courier Prime' },
];
