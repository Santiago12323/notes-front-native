import { SymbolView } from 'expo-symbols';

import { ICON_SIZE } from '@/constants/layout';
import { useTheme } from '@/theme/theme-provider';

export const iconNames = {
  book: { ios: 'book', android: 'book_2', web: 'book_2' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  back: { ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' },
  up: { ios: 'chevron.up', android: 'keyboard_arrow_up', web: 'keyboard_arrow_up' },
  down: { ios: 'chevron.down', android: 'keyboard_arrow_down', web: 'keyboard_arrow_down' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  forward: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  sun: { ios: 'sun.max.fill', android: 'light_mode', web: 'light_mode' },
  moon: { ios: 'moon.fill', android: 'dark_mode', web: 'dark_mode' },
  globe: { ios: 'globe', android: 'language', web: 'language' },
  edit: { ios: 'pencil', android: 'edit', web: 'edit' },
  delete: { ios: 'trash', android: 'delete', web: 'delete' },
  previous: { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  next: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  pen: { ios: 'pencil.tip', android: 'edit', web: 'edit' },
  brush: { ios: 'paintbrush.pointed', android: 'brush', web: 'brush' },
  eraser: { ios: 'eraser', android: 'ink_eraser', web: 'ink_eraser' },
  undo: { ios: 'arrow.uturn.backward', android: 'undo', web: 'undo' },
  redo: { ios: 'arrow.uturn.forward', android: 'redo', web: 'redo' },
  paperBlank: { ios: 'square', android: 'crop_square', web: 'crop_square' },
  paperGrid: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' },
  paperLined: { ios: 'text.alignleft', android: 'format_align_left', web: 'format_align_left' },
  paperDotted: { ios: 'circle.grid.2x2', android: 'blur_on', web: 'blur_on' },
  zoomIn: { ios: 'plus.magnifyingglass', android: 'zoom_in', web: 'zoom_in' },
  zoomOut: { ios: 'minus.magnifyingglass', android: 'zoom_out', web: 'zoom_out' },
  zoomReset: { ios: 'arrow.up.left.and.down.right.magnifyingglass', android: 'zoom_out_map', web: 'zoom_out_map' },
} as const;

export type IconName = keyof typeof iconNames;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = ICON_SIZE, color }: IconProps) {
  const { colors } = useTheme();

  return <SymbolView name={iconNames[name]} size={size} tintColor={color ?? colors.textPrimary} />;
}
