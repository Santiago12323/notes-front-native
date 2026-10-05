export interface Messages {
  common: {
    cancel: string;
    save: string;
    delete: string;
    create: string;
    edit: string;
    back: string;
    rename: string;
  };
  app: {
    name: string;
  };
  notebooks: {
    listTitle: string;
    emptyTitle: string;
    emptyMessage: string;
    createAction: string;
    createTitle: string;
    renameTitle: string;
    deleteTitle: string;
    deleteMessage: string;
    titleLabel: string;
    titlePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    coverLabel: string;
    addNotebook: string;
    notFoundTitle: string;
    notFoundMessage: string;
    created: string;
    updated: string;
    covers: {
      sage: string;
      clay: string;
      ink: string;
      sand: string;
    };
  };
  notes: {
    listTitle: string;
    emptyTitle: string;
    emptyMessage: string;
    createAction: string;
    createTitle: string;
    editTitle: string;
    deleteTitle: string;
    deleteMessage: string;
    titleLabel: string;
    titlePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    dateLabel: string;
    datePlaceholder: string;
    addPage: string;
    notFoundTitle: string;
    notFoundMessage: string;
    moveUp: string;
    moveDown: string;
    previousPage: string;
    nextPage: string;
  };
  settings: {
    title: string;
    appearance: string;
    theme: string;
    light: string;
    dark: string;
    language: string;
    english: string;
    spanish: string;
  };
  drawing: {
    pen: string;
    brush: string;
    eraser: string;
    undo: string;
    redo: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
    blank: string;
    grid: string;
    lined: string;
    dotted: string;
    paper: string;
    color: string;
    width: string;
    colors: {
      black: string;
      white: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      teal: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      brown: string;
    };
    zoomIn: string;
    zoomOut: string;
    zoomReset: string;
  };
}

type NestedKey<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${NestedKey<T[K]>}`;
    }[keyof T & string];

export type MessageKey = NestedKey<Messages>;

export type InterpolationValues = Record<string, string>;
