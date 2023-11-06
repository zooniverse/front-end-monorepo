// Note that this file is named in the Next.js App Router convention for future refactor

import { Box } from 'grommet'
import styled from 'styled-components'
import AboutHeader from '../AboutHeader'

// elevation elements
const ContainerBox = styled(Box)`
  position: relative;

  @media (width > 90rem) {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.30); // Grommet elevation = 'medium'

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -30px;
      width: 30px;
      height: clamp(100px, 10%, 500px);
      background: linear-gradient(
        to bottom left,
        rgba(92, 92, 92, 0.3) 0%,
        rgba(92, 92, 92, 0) 60%
      );
      clip-path: polygon(100% 0, 0 0, 100% 100%);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -30px;
      width: 30px;
      height: clamp(100px, 10%, 500px);
      background: linear-gradient(
        to bottom right,
        rgba(92, 92, 92, 0.3) 0%,
        rgba(92, 92, 92, 0) 60%
      );
      clip-path: polygon(100% 0, 0 0, 0 100%);
    }
  }
`

function PageLayout({ children }) {
  return (
    <>
      <AboutHeader />
      <main>
        <Box background='light-1' align='center'>
          <ContainerBox
            background={{ dark: 'dark-3', light: 'neutral-6' }}
            width='min(100%, 90rem)'
            align='center'
          >
            {children}
          </ContainerBox>
        </Box>
      </main>
    </>
  )
}

export default PageLayout
