import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { type Drawing } from '@/modules/drawing/models/drawing';
import { type PaperBackground } from '@/modules/drawing/models/paper-background';
import { type Result } from '@/types/result';
import { createId } from '@/utils/create-id';
import { nowIso } from '@/utils/now';
import { type NoteErrorCode } from '../models/note-error';
import {
  type CreatePageInput,
  type EditPageInput,
  type NotePage,
  type PageMoveDirection,
} from '../models/note-page';
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
} from '../services/note-page-service';

interface NotesContextValue {
  pages: readonly NotePage[];
  listByNotebookId: (notebookId: string) => NotePage[];
  getById: (id: string) => NotePage | undefined;
  create: (input: CreatePageInput) => Result<NotePage[], NoteErrorCode>;
  edit: (id: string, input: EditPageInput) => Result<NotePage[], NoteErrorCode>;
  remove: (id: string) => Result<NotePage[], NoteErrorCode>;
  removeByNotebookId: (notebookId: string) => void;
  move: (id: string, direction: PageMoveDirection) => Result<NotePage[], NoteErrorCode>;
  setDrawing: (id: string, drawing: Drawing) => Result<NotePage[], NoteErrorCode>;
  setPaper: (id: string, paper: PaperBackground) => Result<NotePage[], NoteErrorCode>;
}

const NotesContext = createContext<NotesContextValue | null>(null);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [pages, setPages] = useState<readonly NotePage[]>([]);

  const listByNotebookId = useCallback(
    (notebookId: string) => getPagesForNotebook(pages, notebookId),
    [pages],
  );

  const getById = useCallback((id: string) => getPageById(pages, id), [pages]);

  const create = useCallback(
    (input: CreatePageInput) => {
      const result = createPage(pages, input, { id: createId(), now: nowIso() });

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const edit = useCallback(
    (id: string, input: EditPageInput) => {
      const result = editPage(pages, id, input, nowIso());

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const remove = useCallback(
    (id: string) => {
      const result = deletePage(pages, id);

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const removeByNotebookId = useCallback((notebookId: string) => {
    setPages((current) => deletePagesByNotebookId(current, notebookId));
  }, []);

  const move = useCallback(
    (id: string, direction: PageMoveDirection) => {
      const result = movePage(pages, id, direction);

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const setDrawing = useCallback(
    (id: string, drawing: Drawing) => {
      const result = setPageDrawing(pages, id, drawing);

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const setPaper = useCallback(
    (id: string, paper: PaperBackground) => {
      const result = setPagePaper(pages, id, paper);

      if (result.ok) {
        setPages(result.value);
      }

      return result;
    },
    [pages],
  );

  const value = useMemo(
    () => ({
      pages,
      listByNotebookId,
      getById,
      create,
      edit,
      remove,
      removeByNotebookId,
      move,
      setDrawing,
      setPaper,
    }),
    [
      create,
      edit,
      getById,
      listByNotebookId,
      move,
      pages,
      remove,
      removeByNotebookId,
      setDrawing,
      setPaper,
    ],
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes(): NotesContextValue {
  const value = useContext(NotesContext);

  if (value === null) {
    throw new Error('useNotes must be used within NotesProvider');
  }

  return value;
}
