export const sizes = {
  iconSm: 18,
  iconMd: 22,
  iconLg: 28,
  control: 44,
  controlComfortable: 48,
  contentMax: 760,
  settingsMax: 980,
  tablet: 768,
  iconBadge: 40,
} as const;

export type SizeName = keyof typeof sizes;
