import { type NotebookCover } from './notebook-cover';

export interface Notebook {
  id: string;
  title: string;
  description: string;
  cover: NotebookCover;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotebookInput {
  title: string;
  description?: string;
  cover?: NotebookCover;
}
