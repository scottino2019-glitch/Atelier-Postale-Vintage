import { PostcardProject } from './types';
import { RETRO_ENGRAVINGS_URL, POSTAL_STAMPS_URL } from './vintageLibrary';

export const VINTAGE_TEMPLATES: PostcardProject[] = [
  {
    id: 'template-venezia-1932',
    title: 'Saluti da Venezia (1932)',
    updatedAt: Date.now(),
    paperTexture: 'aged-parchment',
    orientation: 'landscape',
    backStyle: 'divided-1907',
    postalNote: 'Carissimi amici,\nvi scrivo seduto alle Zattere al tramonto. Il viaggio in treno è stato incantevole. Ricevete il mio più caro abbraccio.',
    recipientLines: [
      'Preg.ma Famiglia De Luca',
      'Corso Vittorio Emanuele, 42',
      'Firenze',
      'Regno d\'Italia'
    ],
    elements: [
      // Coffee stain in background
      {
        id: 'el-blob-1',
        type: 'blob',
        blobVariant: 'coffee-ring',
        color: '#633d1c',
        x: 62,
        y: 45,
        width: 32,
        height: 48,
        rotation: 12,
        opacity: 0.55,
        zIndex: 1,
        blendMode: 'multiply',
        side: 'front'
      },
      // Botanical Swallow illustration
      {
        id: 'el-draw-1',
        type: 'drawing',
        drawingId: 'swallow-bird',
        title: 'Rondine',
        color: '#2b1d14',
        strokeWidth: 2,
        x: 8,
        y: 12,
        width: 22,
        height: 32,
        rotation: -8,
        opacity: 0.9,
        zIndex: 2,
        blendMode: 'multiply',
        side: 'front'
      },
      // Photo frame illustration
      {
        id: 'el-photo-1',
        type: 'photo',
        url: RETRO_ENGRAVINGS_URL,
        fileName: 'venezia_retro.jpg',
        filter: 'sepia-1910',
        frame: 'vintage-corners',
        x: 42,
        y: 16,
        width: 48,
        height: 60,
        rotation: 3,
        opacity: 0.95,
        zIndex: 3,
        side: 'front'
      },
      // Speech ribbon banner
      {
        id: 'el-banner-1',
        type: 'speech-bubble',
        variant: 'retro-ribbon',
        text: 'Saluti da Venezia!',
        fontFamily: 'Great Vibes',
        fontSize: 22,
        fillColor: '#f7eee1',
        strokeColor: '#422e1e',
        textColor: '#291b11',
        x: 6,
        y: 58,
        width: 46,
        height: 28,
        rotation: -4,
        opacity: 0.95,
        zIndex: 4,
        side: 'front'
      },
      // Postmark
      {
        id: 'el-postmark-1',
        type: 'postmark',
        city: 'VENEZIA S. LUCIA',
        dateStr: '18 . IX . 1932',
        department: 'CORRISPONDENZE',
        style: 'double-ring',
        inkColor: '#1c1b18',
        x: 65,
        y: 6,
        width: 32,
        height: 38,
        rotation: -14,
        opacity: 0.85,
        zIndex: 5,
        blendMode: 'multiply',
        side: 'front'
      },
      // Back side: Classic Stamp top right
      {
        id: 'el-stamp-back',
        type: 'stamp',
        stampId: 'stamp-leoni-20c',
        country: 'POSTE ITALIANE',
        denomination: 'Cent. 20',
        color: '#753f22',
        x: 74,
        y: 10,
        width: 18,
        height: 30,
        rotation: 2,
        opacity: 0.95,
        zIndex: 1,
        side: 'back'
      },
      // Back side: Postmark striking the stamp
      {
        id: 'el-cancel-back',
        type: 'postmark',
        city: 'VENEZIA S. LUCIA',
        dateStr: '18 . IX . 1932',
        department: 'PARTENZA',
        style: 'single-ring-wavy',
        inkColor: '#211d19',
        x: 58,
        y: 8,
        width: 36,
        height: 35,
        rotation: -8,
        opacity: 0.88,
        zIndex: 2,
        blendMode: 'multiply',
        side: 'back'
      }
    ]
  },
  {
    id: 'template-amore-1914',
    title: 'Lettera d\'Amore Segreta (1914)',
    updatedAt: Date.now(),
    paperTexture: 'aged-parchment',
    orientation: 'landscape',
    backStyle: 'divided-1907',
    postalNote: 'Mio dolce amore,\nil pensiero di te riempie ogni mia ora lontana. Custodisci questa cartolina sotto il cuscino finché non tornerò.',
    recipientLines: [
      'Alla Gentilissima Signorina Elena',
      'Villa dei Cipressi, N° 12',
      'Como',
      'Italia'
    ],
    elements: [
      // Sepia watercolor wash
      {
        id: 'el-blob-amore',
        type: 'blob',
        blobVariant: 'watercolor-sepia',
        color: '#b08d57',
        x: 18,
        y: 20,
        width: 65,
        height: 65,
        rotation: 0,
        opacity: 0.45,
        zIndex: 1,
        blendMode: 'multiply',
        side: 'front'
      },
      // Antique Rose Drawing
      {
        id: 'el-rose',
        type: 'drawing',
        drawingId: 'vintage-rose',
        title: 'Rosa Botanica',
        color: '#42241b',
        strokeWidth: 2,
        x: 12,
        y: 20,
        width: 34,
        height: 52,
        rotation: -6,
        opacity: 0.9,
        zIndex: 2,
        blendMode: 'multiply',
        side: 'front'
      },
      // Calligraphy
      {
        id: 'el-callig-amore',
        type: 'calligraphy',
        text: 'Un Dolce Ricordo Indelebile',
        fontFamily: 'Great Vibes',
        fontSize: 38,
        color: '#341d18',
        textAlign: 'center',
        italic: true,
        x: 35,
        y: 25,
        width: 60,
        height: 25,
        rotation: 2,
        opacity: 0.95,
        zIndex: 3,
        side: 'front'
      },
      // Wax seal bottom right
      {
        id: 'el-wax-amore',
        type: 'wax-seal',
        sealColor: 'burgundy',
        symbol: 'monogram-heart',
        x: 75,
        y: 60,
        width: 18,
        height: 28,
        rotation: 12,
        opacity: 0.95,
        zIndex: 4,
        side: 'front'
      }
    ]
  },
  {
    id: 'template-posta-aerea-1927',
    title: 'Posta Aerea Transatlantica (1927)',
    updatedAt: Date.now(),
    paperTexture: 'aged-parchment',
    orientation: 'landscape',
    backStyle: 'airmail-classic',
    postalNote: 'PRIMO VOLO DIRETTO TRANSOCEANICO.\nMessaggio inoltrato col Servizio Aereo Speciale.\nArrivo previsto entro le 48 ore.',
    recipientLines: [
      'Monsieur Henri Laurent',
      'Boulevard Saint-Germain, 88',
      'Paris',
      'Francia'
    ],
    elements: [
      // Airmail washi tape top
      {
        id: 'el-airmail-tape',
        type: 'washi-tape',
        pattern: 'airmail-stripes',
        color: '#ece1cf',
        x: 4,
        y: 3,
        width: 92,
        height: 6,
        rotation: 0,
        opacity: 0.85,
        zIndex: 1,
        side: 'front'
      },
      // Hot air balloon or biplane
      {
        id: 'el-balloon',
        type: 'drawing',
        drawingId: 'hot-air-balloon',
        title: 'Mongolfiera',
        color: '#1a334d',
        strokeWidth: 2,
        x: 10,
        y: 20,
        width: 28,
        height: 48,
        rotation: 4,
        opacity: 0.9,
        zIndex: 2,
        blendMode: 'multiply',
        side: 'front'
      },
      // Par Avion Box stamp
      {
        id: 'el-par-avion',
        type: 'postmark',
        city: 'PAR AVION',
        dateStr: 'BY AIR MAIL',
        department: 'POSTES D\'ITALIE',
        style: 'airmail-box',
        inkColor: '#1d3e68',
        x: 48,
        y: 18,
        width: 44,
        height: 34,
        rotation: -4,
        opacity: 0.92,
        zIndex: 3,
        side: 'front'
      },
      // Telegram text
      {
        id: 'el-telegram',
        type: 'calligraphy',
        text: 'SPEDIZIONE POSTA AEREA // URGENTE // STOP',
        fontFamily: 'Special Elite',
        fontSize: 16,
        color: '#1e1c18',
        textAlign: 'center',
        x: 35,
        y: 65,
        width: 58,
        height: 20,
        rotation: 0,
        opacity: 0.9,
        zIndex: 4,
        side: 'front'
      }
    ]
  }
];
