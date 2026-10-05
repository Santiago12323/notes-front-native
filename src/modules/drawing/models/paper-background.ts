export const paperBackgrounds = {
  blank: 'blank',
  grid: 'grid',
  lined: 'lined',
  dotted: 'dotted',
} as const;

export type PaperBackground = (typeof paperBackgrounds)[keyof typeof paperBackgrounds];

export const DEFAULT_PAPER_BACKGROUND = paperBackgrounds.blank;
