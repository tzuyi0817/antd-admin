import {
  baseColorPalettes,
  colorPaletteNumbers,
  colors,
  neutralColorPalettes,
  neutralColors,
  prefix,
  productLevelColorSystem,
} from './constants';
import { hexToRGB, isRGBColor } from './utils';
import type { GlobalToken } from 'antd';

export function createColorPalettes() {
  const colorPaletteVar: Record<string, string> = {
    transparent: 'transparent',
    inherit: 'inherit',
    current: 'currentColor',
    white: 'rgb(255 255 255)',
    black: 'rgb(0 0 0)',
  };

  colors.forEach(color => {
    colorPaletteNumbers.forEach((number, index) => {
      const colorCount = index === 0 ? '' : `-${index}`;

      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${prefix}-${color}${colorCount}))`;
    });
  });

  colorPaletteNumbers.forEach((number, index) => {
    const rgb = hexToRGB(neutralColorPalettes[index]);

    colorPaletteVar[`gray-${number}`] = `rgb(${rgb})`;
  });

  productLevelColorSystem.forEach(key => {
    const keyName = key.replace('color', '');
    const camelCaseName = keyName.charAt(0).toLowerCase() + keyName.slice(1);

    colorPaletteVar[camelCaseName] = `rgb(var(--${prefix}-${key}))`;
  });

  neutralColors.forEach(key => {
    colorPaletteVar[key] = `var(--${prefix}-${key})`;
  });

  return colorPaletteVar;
}

export function getCSSVariablesByTokens(tokens: GlobalToken) {
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    if (productLevelColorSystem.includes(key)) {
      const rgb = hexToRGB(value);

      return `${acc}--${prefix}-${key}:${rgb};`;
    }

    if (neutralColors.includes(key)) {
      const rgb = isRGBColor(value) ? value : `rgb(${hexToRGB(value)})`;

      return `${acc}--${prefix}-${key}:${rgb};`;
    }

    return baseColorPalettes.includes(key) ? `${acc}--${prefix}-${key}:${hexToRGB(value)};` : acc;
  }, '');
}
