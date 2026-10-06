import { PostcardProject } from './types';

export const createBlankPostcard = (): PostcardProject => ({
  id: `postcard_${Date.now()}`,
  title: 'La Mia Cartolina',
  updatedAt: Date.now(),
  paperTexture: 'deckle-white',
  orientation: 'landscape',
  backStyle: 'minimalist',
  postalNote: '',
  recipientLines: ['', '', '', ''],
  elements: []
});
