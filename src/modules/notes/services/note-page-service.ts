import { type Drawing } from '@/modules/drawing/models/drawing';
import {
  DEFAULT_PAPER_BACKGROUND,
  type PaperBackground,
} from '@/modules/drawing/models/paper-background';
import { createEmptyDrawing } from '@/modules/drawing/services/create-empty-drawing';
import { type Result } from '@/types/result';
import { formatIsoDate } from '@/utils/format-iso-date';
import { noteErrorCode, type NoteErrorCode } from '../models/note-error';
import {
  type CreatePageInput,
  type EditPageInput,
  type NotePage,
  type PageMoveDirection,
  pageMoveDirection,
} from '../models/note-page';
import { isIsoCalendarDate } from '../utils/iso-calendar-date';

export const FIRST_PAGE_ORDER = 0;
export const PAGE_ORDER_STEP = 1;

export interface PageWriteContext {
  id: string;
  now: string;
}

function normalizeTitle(title: string): Result<string, NoteErrorCode> {
  const normalized = title.trim();

  if (normalized.length === 0) {
    return { ok: false, error: noteErrorCode.emptyTitle };
  }

  return { ok: true, value: normalized };
}

function normalizeSubject(subject: string | undefined): string {
  return subject?.trim() ?? '';
}

function normalizeDate(date: string | undefined, fallback: string): Result<string, NoteErrorCode> {
  const normalized = (date ?? fallback).trim();

  if (!isIsoCalendarDate(normalized)) {
    return { ok: false, error: noteErrorCode.invalidDate };
  }

  return { ok: true, value: normalized };
}

function findPage(pages: readonly NotePage[], id: string): NotePage | undefined {
  return pages.find((page) => page.id === id);
}

function nextOrder(pages: readonly NotePage[], notebookId: string): number {
  const siblings = getPagesForNotebook(pages, notebookId);

  if (siblings.length === 0) {
    return FIRST_PAGE_ORDER;
  }

  const lastPage = siblings[siblings.length - 1];

  if (lastPage === undefined) {
    return FIRST_PAGE_ORDER;
  }

  return lastPage.order + PAGE_ORDER_STEP;
}

export function getPagesForNotebook(pages: readonly NotePage[], notebookId: string): NotePage[] {
  return pages
    .filter((page) => page.notebookId === notebookId)
    .slice()
    .sort((left, right) => left.order - right.order);
}

export function getPageById(pages: readonly NotePage[], id: string): NotePage | undefined {
  return findPage(pages, id);
}

export function createPage(
  pages: readonly NotePage[],
  input: CreatePageInput,
  context: PageWriteContext,
): Result<NotePage[], NoteErrorCode> {
  const title = normalizeTitle(input.title);

  if (!title.ok) {
    return title;
  }

  const date = normalizeDate(input.date, formatIsoDate(context.now));

  if (!date.ok) {
    return date;
  }

  const page: NotePage = {
    id: context.id,
    notebookId: input.notebookId,
    title: title.value,
    subject: normalizeSubject(input.subject),
    date: date.value,
    order: nextOrder(pages, input.notebookId),
    drawing: createEmptyDrawing(context.id),
    paper: DEFAULT_PAPER_BACKGROUND,
    createdAt: context.now,
    updatedAt: context.now,
  };

  return { ok: true, value: [...pages, page] };
}

export function editPage(
  pages: readonly NotePage[],
  id: string,
  input: EditPageInput,
  now: string,
): Result<NotePage[], NoteErrorCode> {
  const page = findPage(pages, id);

  if (!page) {
    return { ok: false, error: noteErrorCode.notFound };
  }

  const title = normalizeTitle(input.title);

  if (!title.ok) {
    return title;
  }

  const date = normalizeDate(input.date, page.date);

  if (!date.ok) {
    return date;
  }

  return {
    ok: true,
    value: pages.map((item) =>
      item.id === id
        ? {
            ...item,
            title: title.value,
            subject: normalizeSubject(input.subject),
            date: date.value,
            updatedAt: now,
          }
        : item,
    ),
  };
}

export function deletePage(
  pages: readonly NotePage[],
  id: string,
): Result<NotePage[], NoteErrorCode> {
  const page = findPage(pages, id);

  if (!page) {
    return { ok: false, error: noteErrorCode.notFound };
  }

  return {
    ok: true,
    value: pages.filter((item) => item.id !== id),
  };
}

export function setPageDrawing(
  pages: readonly NotePage[],
  id: string,
  drawing: Drawing,
): Result<NotePage[], NoteErrorCode> {
  const page = findPage(pages, id);

  if (!page) {
    return { ok: false, error: noteErrorCode.notFound };
  }

  return {
    ok: true,
    value: pages.map((item) => (item.id === id ? { ...item, drawing } : item)),
  };
}

export function setPagePaper(
  pages: readonly NotePage[],
  id: string,
  paper: PaperBackground,
): Result<NotePage[], NoteErrorCode> {
  const page = findPage(pages, id);

  if (!page) {
    return { ok: false, error: noteErrorCode.notFound };
  }

  return {
    ok: true,
    value: pages.map((item) => (item.id === id ? { ...item, paper } : item)),
  };
}

export function deletePagesByNotebookId(
  pages: readonly NotePage[],
  notebookId: string,
): NotePage[] {
  return pages.filter((page) => page.notebookId !== notebookId);
}

export function movePage(
  pages: readonly NotePage[],
  id: string,
  direction: PageMoveDirection,
): Result<NotePage[], NoteErrorCode> {
  const page = findPage(pages, id);

  if (!page) {
    return { ok: false, error: noteErrorCode.notFound };
  }

  const siblings = getPagesForNotebook(pages, page.notebookId);
  const currentIndex = siblings.findIndex((item) => item.id === id);
  const offset = direction === pageMoveDirection.up ? -PAGE_ORDER_STEP : PAGE_ORDER_STEP;
  const target = siblings[currentIndex + offset];

  if (currentIndex < 0 || target === undefined) {
    return { ok: true, value: [...pages] };
  }

  return {
    ok: true,
    value: pages.map((item) => {
      if (item.id === page.id) {
        return { ...item, order: target.order };
      }

      if (item.id === target.id) {
        return { ...item, order: page.order };
      }

      return item;
    }),
  };
}
