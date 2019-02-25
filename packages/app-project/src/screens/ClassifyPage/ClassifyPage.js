import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { string } from 'prop-types'
import React from 'react'

import ProjectStatistics from '../../shared/components/ProjectStatistics'
import ConnectWithProject from '../../shared/components/ConnectWithProject'

import FinishedForTheDay from './components/FinishedForTheDay'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), {
  ssr: false
}
)

function ClassifyPage ({ mode }) {
  return (
    <Box
      background={mode === 'light' ? 'lighterGrey' : 'midDarkGrey'}
      pad={{ top: 'medium' }}
    >
      <Grid gap='medium' margin='medium'>
        <ClassifierWrapper />
        <FinishedForTheDay />
        <ProjectStatistics />
        <ConnectWithProject />
      </Grid>
    </Box>
  )
}

ClassifyPage.propTypes = {
  mode: string
}

export default ClassifyPage
