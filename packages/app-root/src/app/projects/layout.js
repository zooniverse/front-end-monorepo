'use client'

import { Box, Heading } from 'grommet'
import styled from 'styled-components'
import { ZooniverseLogotype } from '@zooniverse/react-components'

const LayoutBackground = styled(Box)`
  background-image: radial-gradient( #14868eff, #005d69);
  background-size: 100% 635px;
  background-position: top;
  background-repeat: no-repeat;
`

function ProjectsPageLayout({ children }) {
  return (
    <main>
      <LayoutBackground
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        align='center'
      >
        <Heading level='1'>
          <ZooniverseLogotype
            id='projects-landing-page-h1'
            width={450}
            color='white'
          />
        </Heading>
        {children}
      </LayoutBackground>
    </main>
  )
}

export default ProjectsPageLayout
