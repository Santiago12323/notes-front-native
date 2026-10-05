import { useWindowDimensions } from 'react-native';

import { layoutDensities } from '@/constants/layout';
import { getLayoutDensity } from '@/utils/layout-density';

export function useLayoutDensity() {
  const { width, height } = useWindowDimensions();
  const density = getLayoutDensity(width, height);

  return {
    width,
    height,
    density,
    isLandscape: density === layoutDensities.compact,
  };
}
