import { Grid } from 'grommet'
import React from 'react'

import FinishedForTheDay from './components/FinishedForTheDay'
import ProjectStatistics from './components/ProjectStatistics'
import ConnectWithProject from './components/ConnectWithProject'

export default function ClassifyPage () {
  return (
    <Grid gap='medium' margin='medium'>
      <FinishedForTheDay />
      <ProjectStatistics />
      <ConnectWithProject />
    </Grid>
  )
}
