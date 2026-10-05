export const toolbarPanels = {
  color: 'color',
  width: 'width',
  paper: 'paper',
} as const;

export type ToolbarPanel = (typeof toolbarPanels)[keyof typeof toolbarPanels];
