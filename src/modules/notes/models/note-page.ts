import { type Drawing } from '@/modules/drawing/models/drawing';
import { type PaperBackground } from '@/modules/drawing/models/paper-background';

export interface NotePage {
  id: string;
  notebookId: string;
  title: string;
  subject: string;
  date: string;
  order: number;
  drawing: Drawing;
  paper: PaperBackground;
  createdAt: string;
  updatedAt: string;
}

export interface PageFormInput {
  title: string;
  subject: string;
  date: string;
}

export interface CreatePageInput {
  notebookId: string;
  title: string;
  subject?: string;
  date?: string;
}

export interface EditPageInput {
  title: string;
  subject?: string;
  date?: string;
}

export const pageMoveDirection = {
  up: 'up',
  down: 'down',
} as const;

export type PageMoveDirection = (typeof pageMoveDirection)[keyof typeof pageMoveDirection];
