import { Box, Grid } from 'grommet'
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

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

function ProjectAboutPage({ aboutPageData }) {
  const { content = '', title = '' } = aboutPageData

  return (
    <Box>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      <FullHeightBox
        margin={{ left: 'large', right: 'large' }}
        width={{ max: 'xxlarge' }}
        background="white"
        pad="medium"
        border="2px"
      >
        <Grid columns={['small', 'flex']} gap="medium">
          <Box>
            <SpacedHeading children="About" />
            <AboutSidebar />
          </Box>
          <Box>
            <h1>{title}</h1>
            <Markdownz>{content}</Markdownz>
          </Box>
        </Grid>
      </FullHeightBox>
      <ZooFooter />
    </Box>
  )
}

export default ProjectAboutPage
