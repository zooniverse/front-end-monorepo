import { Box, Grid } from 'grommet'
import React from 'react'

import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from '@shared/components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import ThemeModeToggle from '@components/ThemeModeToggle'
import { Media } from '../../shared/components/Media'

function ProjectHomePage (props) {
  return (
    <Box align='center'>
      <Hero />

      <Media at='default'>
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

    </Box>
  )
}

export default ProjectHomePage
