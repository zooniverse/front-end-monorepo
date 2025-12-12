import styled from 'styled-components'
import { Box } from 'grommet'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'

import ProjectsPageContainer from './ProjectsPageContainer'
import PROJECTS from '@test/mocks/projects.mock'
import FEATURED_PROJECTS from '@test/mocks/featuredProjects.mock'
import ORGANIZATIONS from '@test/mocks/organizations.mock'

// Mimics layout.js in app-root
const LayoutBackground = styled(Box)`
  background-image: radial-gradient(#14868eff, #005d69);
  background-size: 100% 635px;
  background-position: top;
  background-repeat: no-repeat;
`

function ComponentDecorator(Story) {
  return (
    <NuqsTestingAdapter>
      <LayoutBackground
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        align='center'
      >
        <Story />
      </LayoutBackground>
    </NuqsTestingAdapter>
  )
}

export default {
  title: 'Projects / Projects',
  component: ProjectsPageContainer,
  decorators: [ComponentDecorator],
  args: {
    featuredProjects: FEATURED_PROJECTS,
    numProjects: 20,
    organizations: ORGANIZATIONS,
    projects: PROJECTS
  }
}

export const Default = {}
