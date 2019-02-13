import { Grid } from 'grommet'
import React from 'react'

import ConnectWithProject from 'components/ConnectWithProject'
import ProjectStatistics from 'components/ProjectStatistics'

export default function ProjectHomePage () {
  return (
    <Grid gap='medium' margin='medium'>
      <ProjectStatistics />
      <ConnectWithProject />
    </Grid>
  )
}
