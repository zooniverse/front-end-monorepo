'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Box, Heading, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import { useContext } from 'react'

const LayoutBackground = styled(Box)`
  background-image: radial-gradient(#14868eff, #005d69);
  background-size: 100% 635px;
  background-position: top;
  background-repeat: no-repeat;
`

function ProjectsPageLayout({ children }) {
  const size = useContext(ResponsiveContext)

  return (
    <main>
      <LayoutBackground align='center'>
        <Heading level='1' margin={{ top: '65px', bottom: 'small' }}>
          <ZooniverseLogotype
            id='projects-landing-page-h1'
            width={size === 'small' ? 360 : 450}
            color='white'
          />
        </Heading>
        <NuqsAdapter>{children}</NuqsAdapter>
      </LayoutBackground>
    </main>
  )
}

export default ProjectsPageLayout
