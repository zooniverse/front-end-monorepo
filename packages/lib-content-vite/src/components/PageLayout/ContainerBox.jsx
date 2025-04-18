import styled, { css } from 'styled-components'
import { Box } from 'grommet'

// elevation elements
const ContainerBox = styled(Box)`
  position: relative;

  @media (width > 90rem) {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3); // Grommet elevation = 'medium'
    clip-path: inset(0px -30px 0 -30px); // don't put elevation top and bottom

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 100% 100%);

      ${props =>
        props.theme.dark
          ? css`
              background: linear-gradient(
                to bottom left,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `
          : css`
              background: linear-gradient(
                to bottom left,
                rgba(92, 92, 92, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `}
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -30px;
      width: 30px;
      height: 300px;
      clip-path: polygon(100% 0, 0 0, 0 100%);

      ${props =>
        props.theme.dark
          ? css`
              background: linear-gradient(
                to bottom right,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `
          : css`
              background: linear-gradient(
                to bottom right,
                rgba(92, 92, 92, 0.3) 0%,
                rgba(92, 92, 92, 0) 60%
              );
            `}
    }
  }
`

export default ContainerBox
