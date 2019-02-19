import { Grid } from 'grommet'
import dynamic from 'next/dynamic'
import React from 'react'

import ProjectStatistics from '../../shared/components/ProjectStatistics'
import ConnectWithProject from '../../shared/components/ConnectWithProject'

import FinishedForTheDay from './components/FinishedForTheDay'

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
