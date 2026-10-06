import { PhotoFilterType } from '../types';

export const PHOTO_FILTERS: { id: PhotoFilterType; label: string; cssFilter: string }[] = [
  {
    id: 'none',
    label: 'Naturale / Originale',
    cssFilter: 'none'
  },
  {
    id: 'sepia-1910',
    label: 'Seppia d\'Epoca (1910)',
    cssFilter: 'sepia(0.85) contrast(1.1) brightness(0.92) hue-rotate(-15deg)'
  },
  {
    id: 'noir-daguerreotype',
    label: 'Dagherrotipo Argentico (B&N)',
    cssFilter: 'grayscale(1) contrast(1.35) brightness(0.9)'
  },
  {
    id: 'cyanotype',
    label: 'Cianotipia Blu di Prussia (1885)',
    cssFilter: 'grayscale(1) sepia(0.6) hue-rotate(185deg) saturate(2.5) contrast(1.2)'
  },
  {
    id: 'kodachrome',
    label: 'Kodachrome Caldo Anni \'60',
    cssFilter: 'saturate(1.35) contrast(1.15) brightness(1.02) sepia(0.2)'
  },
  {
    id: 'faded-sun',
    label: 'Sbiadita dal Tempo & Sole',
    cssFilter: 'contrast(0.85) brightness(1.1) saturate(0.7) sepia(0.35)'
  }
];

export function getCssFilterForType(type: PhotoFilterType): string {
  const match = PHOTO_FILTERS.find(f => f.id === type);
  return match ? match.cssFilter : 'none';
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
