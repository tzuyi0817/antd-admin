import { getCSSVariablesByTokens } from './css-variables';
import type { GlobalToken } from 'antd';

export function setupAntdTokens(antdTokens: GlobalToken) {
  const cssVariablesString = getCSSVariablesByTokens(antdTokens);
  const styleId = 'antd-theme-tokens';
  const styleSheet = document.querySelector(`#${styleId}`) || document.createElement('style');

  styleSheet.id = styleId;
  styleSheet.textContent = `:root { ${cssVariablesString} }`;
  document.head.append(styleSheet);
}
