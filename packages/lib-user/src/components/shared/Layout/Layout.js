'use client'

import { Box } from 'grommet'
import { node } from 'prop-types'
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

const PageHeader = styled(Box)`
  grid-column: 1 / 6;
  grid-row: 1 / 3;
`

const PageLeftColumn = styled(Box)`
  position: relative;
  grid-column: 2 / 3;
  grid-row: 3 / 4;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
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
  padding-bottom: 2rem;
`

const PageRightColumn = styled(Box)`
  position: relative;
  grid-column: 4 / 5;
  grid-row: 3 / 4;

  &::before {
    content: '';
    position: absolute;
    top: 0;
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

function Layout ({ children }) {
  return (
    <PageContainer>
      <PageHeader
        background="brand"
      />
      <PageLeftColumn 
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        border={{
          color: {
            dark: 'dark-2',
            light: 'light-5'
          },
          side: 'left'
        }}
      />
      <PageBody
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
      >
        {children}
      </PageBody>
      <PageRightColumn
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        border={{
          color: {
            dark: 'dark-2',
            light: 'light-5'
          },
          side: 'right'
        }}
      />
    </PageContainer>   
  )
}

Layout.propTypes = {
  children: node
}

export default Layout
