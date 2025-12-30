import plugin from 'tailwindcss/plugin';
import { createColorPalettes } from './antd/css-variables';

const tailwindPlugin: ReturnType<typeof plugin.withOptions> = plugin.withOptions(
  () => {
    return () => {};
  },
  () => {
    return {
      theme: {
        colors: {
          ...createColorPalettes(),
        },
      },
    };
  },
);

export default tailwindPlugin;
