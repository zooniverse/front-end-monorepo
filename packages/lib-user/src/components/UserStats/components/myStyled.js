import styledComponents from 'styled-components';

const styled = typeof styledComponents === 'function' ? styledComponents : styledComponents.default;
export const css = styledComponents.css;

export default styled
