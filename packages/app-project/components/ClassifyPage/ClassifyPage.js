import { Grid } from 'grommet'
import React from 'react'

import FinishedForTheDay from './components/FinishedForTheDay'
import ProjectStatistics from './components/ProjectStatistics'

function ClassifyPage () {
  return (
    <Grid gap='medium' margin='medium'>
      <FinishedForTheDay />
      <ProjectStatistics />
    </Grid>
  )
}

export default ClassifyPage
