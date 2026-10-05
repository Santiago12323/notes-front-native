import { describe, expect, it } from '@jest/globals';

import { DEFAULT_NOTEBOOK_COVER } from '../models/notebook-cover';
import { notebookErrorCode } from '../models/notebook-error';
import { type Notebook } from '../models/notebook';
import {
  createNotebook,
  deleteNotebook,
  getNotebookById,
  renameNotebook,
} from './notebook-service';

const now = '2026-10-05T12:00:00.000Z';
const later = '2026-10-05T13:00:00.000Z';

const context = {
  id: 'notebook-1',
  now,
};

function notebook(overrides: Partial<Notebook> = {}): Notebook {
  return {
    id: 'notebook-1',
    title: 'Ideas',
    description: 'Daily notes',
    cover: DEFAULT_NOTEBOOK_COVER,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('createNotebook', () => {
  it('appends a notebook with trimmed fields and default cover', () => {
    const result = createNotebook(
      [],
      {
        title: '  Travel  ',
        description: '  summer  ',
      },
      context,
    );

    expect(result).toEqual({
      ok: true,
      value: [
        {
          id: 'notebook-1',
          title: 'Travel',
          description: 'summer',
          cover: DEFAULT_NOTEBOOK_COVER,
          createdAt: now,
          updatedAt: now,
        },
      ],
    });
  });

  it('uses the selected cover', () => {
    const result = createNotebook([], { title: 'Travel', cover: 'clay' }, context);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[0]?.cover).toBe('clay');
    }
  });

  it('rejects a blank title', () => {
    const result = createNotebook([], { title: '   ' }, context);

    expect(result).toEqual({ ok: false, error: notebookErrorCode.emptyTitle });
  });

  it('does not mutate the original list', () => {
    const existing = [notebook({ id: 'existing' })];
    const result = createNotebook(existing, { title: 'New' }, context);

    expect(existing).toHaveLength(1);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(2);
    }
  });
});

describe('renameNotebook', () => {
  it('updates the title and timestamp', () => {
    const result = renameNotebook([notebook()], 'notebook-1', '  Updated  ', later);

    expect(result).toEqual({
      ok: true,
      value: [notebook({ title: 'Updated', updatedAt: later })],
    });
  });

  it('rejects a missing notebook', () => {
    const result = renameNotebook([], 'missing', 'Updated', later);

    expect(result).toEqual({ ok: false, error: notebookErrorCode.notFound });
  });

  it('rejects a blank title', () => {
    const result = renameNotebook([notebook()], 'notebook-1', ' ', later);

    expect(result).toEqual({ ok: false, error: notebookErrorCode.emptyTitle });
  });
});

describe('deleteNotebook', () => {
  it('removes the notebook', () => {
    const result = deleteNotebook([notebook(), notebook({ id: 'notebook-2' })], 'notebook-1');

    expect(result).toEqual({
      ok: true,
      value: [notebook({ id: 'notebook-2' })],
    });
  });

  it('rejects a missing notebook', () => {
    const result = deleteNotebook([notebook()], 'missing');

    expect(result).toEqual({ ok: false, error: notebookErrorCode.notFound });
  });
});

describe('getNotebookById', () => {
  it('returns the matching notebook', () => {
    expect(getNotebookById([notebook()], 'notebook-1')).toEqual(notebook());
  });

  it('returns undefined when the notebook does not exist', () => {
    expect(getNotebookById([notebook()], 'missing')).toBeUndefined();
  });
});
