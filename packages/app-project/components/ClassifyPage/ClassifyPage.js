import { Grid } from 'grommet'
import React from 'react'
import dynamic from 'next/dynamic'

import FinishedForTheDay from './components/FinishedForTheDay'
import ProjectStatistics from './components/ProjectStatistics'
import ConnectWithProject from './components/ConnectWithProject'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), {
    ssr: false
  }
)

export default function ClassifyPage () {
  return (
    <Grid gap='medium' margin='medium'>
      <ClassifierWrapper />
      <FinishedForTheDay />
      <ProjectStatistics />
      <ConnectWithProject />
    </Grid>
  )
}
