import styled from 'styled-components'
import { Box, Heading } from 'grommet'
import { ZooniverseLogotype } from '@zooniverse/react-components'

import Projects from './Projects'
import PROJECTS from '@test/mocks/projects.mock'
import FEATURED_PROJECTS from '@test/mocks/featuredProjects.mock'

// Mimics layout.js in app-root
const LayoutBackground = styled(Box)`
  background-image: radial-gradient(#14868eff, #005d69);
  background-size: 100% 635px;
  background-position: top;
  background-repeat: no-repeat;
`

function ComponentDecorator(Story) {
  return (
    <LayoutBackground
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      align='center'
    >
      <Story />
    </LayoutBackground>
  )
}

export default {
  title: 'Projects / Projects',
  component: Projects,
  decorators: [ComponentDecorator],
  args: {
    featuredProjects: FEATURED_PROJECTS,
    projects: PROJECTS
  }
}

export const Default = {}
