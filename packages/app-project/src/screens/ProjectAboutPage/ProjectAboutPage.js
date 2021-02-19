import { Box, Grid, Heading, Paragraph } from 'grommet'
import React from 'react'
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'
import {
  ZooFooter,
  Markdownz,
  SpacedHeading,
} from '@zooniverse/react-components'
import styled from 'styled-components'
import AboutSidebar from './components/AboutSidebar'
import { withResponsiveContext } from '@zooniverse/react-components'
import AboutDropdownNav from './components/AboutDropdownNav'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

const StyledHeading = styled(Heading)`
  font-weight: 400;
`

const components = {
  h1: (nodeProps) => <Heading children={nodeProps.children} color="#005D69" />, // darkTeal
  h2: (nodeProps) => <Heading children={nodeProps.children} color="#005D69" />,
}

function ProjectAboutPage({ aboutPageData, screenSize }) {
  const { content = '', title = '' } = aboutPageData

  return (
    <Box>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      {screenSize !== 'small' && (
        <FullHeightBox
          margin={{ left: 'large', right: 'large' }}
          width={{ max: 'xxlarge' }}
          background="white"
          pad="large"
          border="2px"
        >
          <Grid columns={['small', 'flex']} gap="xlarge">
            <Box>
              <SpacedHeading children="About" style={{ padding: '5px 20px' }} />
              <AboutSidebar />
            </Box>
            <Box>
              <StyledHeading level="2" size="large">
                {title}
              </StyledHeading>
              <Markdownz children={content} components={components} />
            </Box>
          </Grid>
        </FullHeightBox>
      )}
      {screenSize === 'small' && (
        <Box background='white' pad='small'>
          <AboutDropdownNav />
          <StyledHeading level="2" size="medium">
            {title}
          </StyledHeading>
          <Markdownz children={content} components={components} />
        </Box>
      )}
      <ZooFooter />
    </Box>
  )
}

export default withResponsiveContext(ProjectAboutPage)
