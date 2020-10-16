import { Box, Grid } from 'grommet'
import React from 'react'
import { bool } from 'prop-types'
import styled from 'styled-components'
import { ZooFooter } from '@zooniverse/react-components'

import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from '@shared/components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import ThemeModeToggle from '@components/ThemeModeToggle'
import { Media } from '../../shared/components/Media'
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

const RemainingHeightBox = styled(Box)`
  flex-grow: 1;
`

function ProjectHomePage ({ inBeta }) {
  return (
    <Box border={(inBeta) ? { color: 'brand', size: 'medium' } : false}>
      <Media at='default'>
        <ZooHeaderWrapper />
        <ProjectHeader />
        <Announcements />
        <Hero />
        <Box margin='small' gap='small'>
          <ThemeModeToggle />
          <ZooniverseTalk />
          <ProjectStatistics />
          <MessageFromResearcher />
          <AboutProject />
          <ConnectWithProject />
        </Box>
      </Media>

      <Media greaterThan='default'>
        <FullHeightBox margin={{ bottom: 'large' }}>
          <ZooHeaderWrapper />
          <ProjectHeader />
          <Announcements />
          <RemainingHeightBox>
            <Hero isWide={true} />
          </RemainingHeightBox>
        </FullHeightBox>
        <Box
          align='start'
          direction='row'
          gap='small'
          margin='small'
          width={{ max: 'xxlarge' }}
        >
          <Box gap='medium'>
            <ZooniverseTalk />
            <ProjectStatistics />
            <Grid columns={['1fr', '1fr']} gap='medium'>
              <MessageFromResearcher />
              <AboutProject />
            </Grid>
            <ConnectWithProject />
          </Box>
          <ThemeModeToggle />
        </Box>
      </Media>
      <ZooFooter />
    </Box>
  )
}

ProjectHomePage.defaultProps = {
  inBeta: false
}

ProjectHomePage.propTypes = {
  inBeta: bool
}

export default ProjectHomePage
