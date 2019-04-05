import { Grid } from 'grommet'
import React from 'react'

import ConnectWithProject from '../../shared/components/ConnectWithProject'
import ProjectStatistics from '../../shared/components/ProjectStatistics'
import MessageFromResearcher from '../../shared/components/MessageFromResearcher'
import AboutProject from '../../shared/components/AboutProject'

function ProjectHomePage() {
  return (
    <Grid gap="medium" margin="medium">
      <ProjectStatistics />
      <Grid
        fill="horizontal"
        gap="medium"
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
