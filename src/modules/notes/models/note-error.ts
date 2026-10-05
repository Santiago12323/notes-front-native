export const noteErrorCode = {
  emptyTitle: 'emptyTitle',
  invalidDate: 'invalidDate',
  notFound: 'notFound',
} as const;

export type NoteErrorCode = keyof typeof noteErrorCode;
