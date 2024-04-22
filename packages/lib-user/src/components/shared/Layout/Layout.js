'use client'

import { ZooniverseLogotype } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, node } from 'prop-types'
import styled, { css } from 'styled-components'

const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 0 0 1fr 0 0;
  grid-template-rows: 0 0 1fr;
  min-height: 90vh;

  @media (48rem <= width < 80rem) {
    grid-template-columns: 0 2rem minmax(44rem, 76rem) 2rem 0;
    grid-template-rows: 50px 50px 1fr;
  }

  @media (80rem <= width) {
    grid-template-columns: auto minmax(2rem, 5rem) minmax(74rem, 80rem) minmax(2rem, 5rem) auto;
    grid-template-rows: 70px 70px 1fr;
  }
`

const PageLeftHeader = styled(Box)`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
`

const PageHeader = styled(Box)`
  grid-column: 3 / 4;
  grid-row: 1 / 3;
`

const PageRightHeader = styled(Box)`
  grid-column: 4 / 6;
  grid-row: 1 / 3;
`

const PageLeftColumn = styled(Box)`
  box-shadow: -6px 0px 6px -6px rgba(0, 0, 0, 0.50);
  position: relative;
  grid-column: 2 / 3;
  grid-row: 3 / 4;

  @media (91rem <= width) {
    border-left: 0.5px solid ${props => props.theme.dark ? props.theme.global.colors['dark-2'] : props.theme.global.colors['light-5']};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 300px;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    
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
          `
    }
  }
`

const PageBody = styled(Box)`
  grid-column: 3 / 4;
  grid-row: 2 / 4;
  border-radius: 8px 8px 0 0;
  padding-bottom: 50px;
`

const PageRightColumn = styled(Box)`
  box-shadow: 6px 0px 6px -6px rgba(0, 0, 0, 0.50);
  position: relative;
  grid-column: 4 / 5;
  grid-row: 3 / 4;

  @media (91rem <= width) {
    border-right: 0.5px solid ${props => props.theme.dark ? props.theme.global.colors['dark-2'] : props.theme.global.colors['light-5']};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
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
          `
    }
  }
`

function Layout ({
  children,
  primaryHeaderItem = '',
  secondaryHeaderItems = []
}) {
  return (
    <PageContainer>
      <PageLeftHeader background='neutral-1' />
      <PageHeader
        background='neutral-1'
        direction='row'
        justify='between'
      >
        <Box
          align='center'
          direction='row'
          justify='start'
          height='50%'
        >
          {primaryHeaderItem}
        </Box>
        <Box
          align='center'
          justify='end'
          direction='row'
          gap='small'
          height='50%'
        >
          {(secondaryHeaderItems.length > 0)
            ? secondaryHeaderItems.map((Component, index) => (
              <Component key={`SecondaryHeaderIndex${index}`} />
            )) : <ZooniverseLogotype id='HeaderZooniverseLogo' />}
        </Box>
      </PageHeader>
      <PageRightHeader background='neutral-1' />
      <PageLeftColumn 
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
      />
      <PageBody
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        gap='30px'
      >
        {children}
      </PageBody>
      <PageRightColumn
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
      />
    </PageContainer>   
  )
}

Layout.propTypes = {
  children: node,
  primaryHeaderItem: node,
  secondaryHeaderItems: arrayOf(node)
}

export default Layout
