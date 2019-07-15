import { Grid } from 'grommet'
import React from 'react'

import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from '../../shared/components/AboutProject'
import ConnectWithProject from '../../shared/components/ConnectWithProject'
import ProjectStatistics from '../../shared/components/ProjectStatistics'

function ProjectHomePage () {
  return (
    <Grid gap='medium' margin='medium'>
      <ProjectStatistics />
      <Grid
        fill='horizontal'
        gap='medium'
        columns={['repeat(auto-fit, minmax(320px, 1fr))']}
      >
        <MessageFromResearcher />
        <AboutProject />
      </Grid>
      <ConnectWithProject />
    </Grid>
  )
}

export default ProjectHomePage
