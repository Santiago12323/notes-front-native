export const notebookErrorCode = {
  emptyTitle: 'emptyTitle',
  notFound: 'notFound',
} as const;

export type NotebookErrorCode = keyof typeof notebookErrorCode;
