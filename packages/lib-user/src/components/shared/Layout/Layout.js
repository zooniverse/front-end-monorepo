import { Box } from 'grommet'
import { arrayOf, node } from 'prop-types'
import styled, { css } from 'styled-components'

import PageHeader from './components/PageHeader'

const InnerPageContainer = styled(Box)`
  box-shadow: 3px 0px 3px rgba(0, 0, 0, 0.25), -3px 0px 3px rgba(0, 0, 0, 0.25);

  // Grommet theme's size is definied in pixels
  // Size "small" is viewport widths less than 769px
  // If Grommet theme breakpoints are changed to rem units, adjust here as needed

  @media (768px < width <= 90rem) {
    padding: 0 30px;
  }

  @media width <= 769px {
    padding: 0;
  }
`

const PageBody = styled(Box)`
  position: relative;
  min-height: 90vh;
  max-width: min(100%, calc(90rem - 160px));

  margin-top: -70px; // half height of PageHeader
  border-radius: 8px 8px 0 0;
  padding-bottom: 50px;

  @media (width > 90rem) {
    &::before {
      content: '';
      position: absolute;
      top: 70px;
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
                transparent 60%
              );
            `
          : css`
              background: linear-gradient(
                to bottom left,
                rgba(92, 92, 92, 0.3) 0%,
                transparent 60%
              );
            `}
    }

    &::after {
      content: '';
      position: absolute;
      top: 70px;
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
                transparent 60%
              );
            `
          : css`
              background: linear-gradient(
                to bottom right,
                rgba(92, 92, 92, 0.3) 0%,
                transparent 60%
              );
            `}
    }
  }
`

function Layout({
  children,
  primaryHeaderItem = '',
  secondaryHeaderItems = []
}) {
  return (
    <>
      <PageHeader
        primaryHeaderItem={primaryHeaderItem}
        secondaryHeaderItems={secondaryHeaderItems}
      />
      <Box
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        align='center'
      >
        <InnerPageContainer
          align='center'
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          width='min(100%, 90rem)'
          elevation='medium'
        >
          <PageBody
            fill
            forwardedAs='main'
            gap='30px'
          >
            {children}
          </PageBody>
        </InnerPageContainer>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: node,
  primaryHeaderItem: node,
  secondaryHeaderItems: arrayOf(node)
}

export default Layout
