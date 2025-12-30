export const prefix = 'antd-admin';

export const colors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'gold',
  'lime',
];

export const brandColors = [
  'colorPrimary',
  'colorPrimaryBg',
  'colorPrimaryBgHover',
  'colorPrimaryBorder',
  'colorPrimaryBorderHover',
  'colorPrimaryHover',
  'colorPrimaryActive',
  'colorPrimaryTextHover',
  'colorPrimaryText',
  'colorPrimaryTextActive',
];

export const successColors = [
  'colorSuccess',
  'colorSuccessBg',
  'colorSuccessBgHover',
  'colorSuccessBorder',
  'colorSuccessBorderHover',
  'colorSuccessHover',
  'colorSuccessActive',
  'colorSuccessTextHover',
  'colorSuccessText',
  'colorSuccessTextActive',
];

export const warningColors = [
  'colorWarning',
  'colorWarningBg',
  'colorWarningBgHover',
  'colorWarningBorder',
  'colorWarningBorderHover',
  'colorWarningHover',
  'colorWarningActive',
  'colorWarningTextHover',
  'colorWarningText',
  'colorWarningTextActive',
];

export const errorColors = [
  'colorError',
  'colorErrorBg',
  'colorErrorBgHover',
  'colorErrorBorder',
  'colorErrorBorderHover',
  'colorErrorHover',
  'colorErrorActive',
  'colorErrorTextHover',
  'colorErrorText',
  'colorErrorTextActive',
];

export const infoColors = [
  'colorInfo',
  'colorInfoBg',
  'colorInfoBgHover',
  'colorInfoBorder',
  'colorInfoBorderHover',
  'colorInfoHover',
  'colorInfoActive',
  'colorInfoTextHover',
  'colorInfoText',
  'colorInfoTextActive',
];

export const functionalColors = [...successColors, ...warningColors, ...errorColors, ...infoColors];

export const neutralColors = [
  'colorText',
  'colorTextSecondary',
  'colorTextTertiary',
  'colorTextQuaternary',

  'colorBgContainer',
  'colorBgElevated',
  'colorBgLayout',
  'colorBgSpotlight',
  'colorBgMask',

  'colorBorder',
  'colorBorderSecondary',

  'colorFill',
  'colorFillSecondary',
  'colorFillTertiary',
  'colorFillQuaternary',
];

export const productLevelColorSystem = [...brandColors, ...functionalColors];
export const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const colorVariantsCount = 10;

export const baseColorPalettes = colors.flatMap(color => [
  color,
  ...Array.from({ length: colorVariantsCount }, (_, i) => `${color}-${i + 1}`),
]);

export const neutralColorPalettes = [
  '#fafafa',
  '#f5f5f5',
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#434343',
  '#262626',
  '#1f1f1f',
  '#141414',
];
