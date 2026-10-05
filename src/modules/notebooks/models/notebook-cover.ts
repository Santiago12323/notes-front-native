export const notebookCoverNames = ['sage', 'clay', 'ink', 'sand'] as const;

export type NotebookCover = (typeof notebookCoverNames)[number];

export const notebookCovers: Record<NotebookCover, string> = {
  sage: '#2F5D50',
  clay: '#A65D3F',
  ink: '#3D4A5C',
  sand: '#C4A574',
};

export const DEFAULT_NOTEBOOK_COVER: NotebookCover = 'sage';
