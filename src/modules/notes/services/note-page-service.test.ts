import { describe, expect, it } from '@jest/globals';

import { drawingTools } from '@/modules/drawing/models/drawing-tool';
import {
  DEFAULT_PAPER_BACKGROUND,
  paperBackgrounds,
} from '@/modules/drawing/models/paper-background';
import { createEmptyDrawing } from '@/modules/drawing/services/create-empty-drawing';
import { noteErrorCode } from '../models/note-error';
import { pageMoveDirection, type NotePage } from '../models/note-page';
import {
  createPage,
  deletePage,
  deletePagesByNotebookId,
  editPage,
  getPageById,
  getPagesForNotebook,
  movePage,
  setPageDrawing,
  setPagePaper,
} from './note-page-service';

const now = '2026-10-05T12:00:00.000Z';
const later = '2026-10-05T13:00:00.000Z';
const notebookId = 'notebook-1';

const context = {
  id: 'page-1',
  now,
};

function page(overrides: Partial<NotePage> = {}): NotePage {
  const id = overrides.id ?? 'page-1';

  return {
    id,
    notebookId,
    title: 'Lecture',
    subject: 'History',
    date: '2026-10-05',
    order: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides,
    drawing: overrides.drawing ?? createEmptyDrawing(id),
    paper: overrides.paper ?? DEFAULT_PAPER_BACKGROUND,
  };
}

describe('createPage', () => {
  it('creates a page belonging to a notebook', () => {
    const result = createPage(
      [],
      {
        notebookId,
        title: '  Lecture  ',
        subject: '  History  ',
        date: '2026-10-05',
      },
      context,
    );

    expect(result).toEqual({
      ok: true,
      value: [page({ title: 'Lecture', subject: 'History' })],
    });
  });

  it('defaults the date and uses the next order', () => {
    const existing = [page()];
    const result = createPage(existing, { notebookId, title: 'Notes' }, { id: 'page-2', now });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[1]).toEqual(
        page({
          id: 'page-2',
          title: 'Notes',
          subject: '',
          date: '2026-10-05',
          order: 1,
        }),
      );
    }
  });

  it('orders pages independently per notebook', () => {
    const existing = [page({ notebookId: 'notebook-2', order: 4 })];
    const result = createPage(existing, { notebookId, title: 'Lecture' }, context);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[1]?.order).toBe(0);
    }
  });

  it('rejects a blank title', () => {
    const result = createPage([], { notebookId, title: '   ' }, context);

    expect(result).toEqual({ ok: false, error: noteErrorCode.emptyTitle });
  });

  it('rejects an invalid date', () => {
    const result = createPage([], { notebookId, title: 'Lecture', date: '2026-02-31' }, context);

    expect(result).toEqual({ ok: false, error: noteErrorCode.invalidDate });
  });
});

describe('editPage', () => {
  it('updates title, subject, date and timestamp', () => {
    const result = editPage(
      [page()],
      'page-1',
      { title: '  Updated  ', subject: '  Math  ', date: '2026-10-06' },
      later,
    );

    expect(result).toEqual({
      ok: true,
      value: [
        page({
          title: 'Updated',
          subject: 'Math',
          date: '2026-10-06',
          updatedAt: later,
        }),
      ],
    });
  });

  it('rejects a missing page', () => {
    const result = editPage([], 'missing', { title: 'Updated' }, later);

    expect(result).toEqual({ ok: false, error: noteErrorCode.notFound });
  });

  it('rejects a blank title', () => {
    const result = editPage([page()], 'page-1', { title: ' ' }, later);

    expect(result).toEqual({ ok: false, error: noteErrorCode.emptyTitle });
  });
});

describe('deletePage', () => {
  it('removes the page', () => {
    const result = deletePage([page(), page({ id: 'page-2', order: 1 })], 'page-1');

    expect(result).toEqual({
      ok: true,
      value: [page({ id: 'page-2', order: 1 })],
    });
  });

  it('rejects a missing page', () => {
    const result = deletePage([page()], 'missing');

    expect(result).toEqual({ ok: false, error: noteErrorCode.notFound });
  });
});

describe('deletePagesByNotebookId', () => {
  it('removes pages that belong to the notebook', () => {
    const pages = [page(), page({ id: 'page-2', notebookId: 'notebook-2' })];

    expect(deletePagesByNotebookId(pages, notebookId)).toEqual([
      page({ id: 'page-2', notebookId: 'notebook-2' }),
    ]);
  });
});

describe('getPagesForNotebook', () => {
  it('returns the notebook pages sorted by order', () => {
    const pages = [
      page({ id: 'page-2', order: 2, title: 'Second' }),
      page({ id: 'other', notebookId: 'notebook-2' }),
      page({ id: 'page-1', order: 1, title: 'First' }),
    ];

    expect(getPagesForNotebook(pages, notebookId).map((item) => item.id)).toEqual([
      'page-1',
      'page-2',
    ]);
  });
});

describe('getPageById', () => {
  it('returns the matching page', () => {
    expect(getPageById([page()], 'page-1')).toEqual(page());
  });
});

describe('movePage', () => {
  it('moves a page up by swapping order', () => {
    const pages = [page({ id: 'page-1', order: 0 }), page({ id: 'page-2', order: 1 })];
    const result = movePage(pages, 'page-2', pageMoveDirection.up);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(getPagesForNotebook(result.value, notebookId).map((item) => item.id)).toEqual([
        'page-2',
        'page-1',
      ]);
    }
  });

  it('moves a page down by swapping order', () => {
    const pages = [page({ id: 'page-1', order: 0 }), page({ id: 'page-2', order: 1 })];
    const result = movePage(pages, 'page-1', pageMoveDirection.down);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(getPagesForNotebook(result.value, notebookId).map((item) => item.id)).toEqual([
        'page-2',
        'page-1',
      ]);
    }
  });

  it('does not change pages at the boundary', () => {
    const pages = [page()];
    const result = movePage(pages, 'page-1', pageMoveDirection.up);

    expect(result).toEqual({ ok: true, value: pages });
  });

  it('rejects a missing page', () => {
    const result = movePage([page()], 'missing', pageMoveDirection.up);

    expect(result).toEqual({ ok: false, error: noteErrorCode.notFound });
  });
});

describe('setPageDrawing', () => {
  it('replaces the page drawing', () => {
    const drawing = {
      id: 'page-1',
      strokes: [
        {
          id: 'stroke-1',
          color: '#1F1A16',
          width: 5,
          tool: drawingTools.pen,
          points: [{ x: 0, y: 0 }],
        },
      ],
    };
    const result = setPageDrawing([page()], 'page-1', drawing);

    expect(result).toEqual({
      ok: true,
      value: [page({ drawing })],
    });
  });

  it('rejects a missing page', () => {
    const result = setPageDrawing([], 'missing', createEmptyDrawing('missing'));

    expect(result).toEqual({ ok: false, error: noteErrorCode.notFound });
  });
});

describe('setPagePaper', () => {
  it('changes the paper without modifying strokes', () => {
    const drawing = {
      id: 'page-1',
      strokes: [
        {
          id: 'stroke-1',
          color: '#1F1A16',
          width: 5,
          tool: drawingTools.pen,
          points: [{ x: 0, y: 0 }],
        },
      ],
    };
    const existing = page({ drawing });
    const result = setPagePaper([existing], 'page-1', paperBackgrounds.grid);

    expect(result).toEqual({
      ok: true,
      value: [page({ drawing, paper: paperBackgrounds.grid })],
    });
    expect(result.ok && result.value[0]?.drawing).toBe(drawing);
  });

  it('rejects a missing page', () => {
    const result = setPagePaper([], 'missing', paperBackgrounds.lined);

    expect(result).toEqual({ ok: false, error: noteErrorCode.notFound });
  });
});
