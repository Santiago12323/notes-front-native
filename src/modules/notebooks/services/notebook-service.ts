import { type Result } from '@/types/result';
import { type CreateNotebookInput, type Notebook } from '../models/notebook';
import { DEFAULT_NOTEBOOK_COVER } from '../models/notebook-cover';
import { notebookErrorCode, type NotebookErrorCode } from '../models/notebook-error';

export interface NotebookWriteContext {
  id: string;
  now: string;
}

function normalizeTitle(title: string): Result<string, NotebookErrorCode> {
  const normalized = title.trim();

  if (normalized.length === 0) {
    return { ok: false, error: notebookErrorCode.emptyTitle };
  }

  return { ok: true, value: normalized };
}

function normalizeDescription(description: string | undefined): string {
  return description?.trim() ?? '';
}

function findNotebook(notebooks: readonly Notebook[], id: string): Notebook | undefined {
  return notebooks.find((notebook) => notebook.id === id);
}

export function createNotebook(
  notebooks: readonly Notebook[],
  input: CreateNotebookInput,
  context: NotebookWriteContext,
): Result<Notebook[], NotebookErrorCode> {
  const title = normalizeTitle(input.title);

  if (!title.ok) {
    return title;
  }

  const notebook: Notebook = {
    id: context.id,
    title: title.value,
    description: normalizeDescription(input.description),
    cover: input.cover ?? DEFAULT_NOTEBOOK_COVER,
    createdAt: context.now,
    updatedAt: context.now,
  };

  return { ok: true, value: [...notebooks, notebook] };
}

export function renameNotebook(
  notebooks: readonly Notebook[],
  id: string,
  title: string,
  now: string,
): Result<Notebook[], NotebookErrorCode> {
  const notebook = findNotebook(notebooks, id);

  if (!notebook) {
    return { ok: false, error: notebookErrorCode.notFound };
  }

  const nextTitle = normalizeTitle(title);

  if (!nextTitle.ok) {
    return nextTitle;
  }

  return {
    ok: true,
    value: notebooks.map((item) =>
      item.id === id
        ? {
            ...item,
            title: nextTitle.value,
            updatedAt: now,
          }
        : item,
    ),
  };
}

export function deleteNotebook(
  notebooks: readonly Notebook[],
  id: string,
): Result<Notebook[], NotebookErrorCode> {
  const notebook = findNotebook(notebooks, id);

  if (!notebook) {
    return { ok: false, error: notebookErrorCode.notFound };
  }

  return {
    ok: true,
    value: notebooks.filter((item) => item.id !== id),
  };
}

export function getNotebookById(notebooks: readonly Notebook[], id: string): Notebook | undefined {
  return findNotebook(notebooks, id);
}
