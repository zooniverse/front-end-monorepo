import { Grid } from 'grommet'
import React from 'react'

import ConnectWithProject from '../../shared/components/ConnectWithProject'
import ProjectStatistics from '../../shared/components/ProjectStatistics'

function ProjectHomePage () {
  return (
    <Grid gap='medium' margin='medium'>
      <ProjectStatistics />
      <ConnectWithProject />
    </Grid>
  )
}

export default ProjectHomePage
