import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { func, string } from 'prop-types'
import React from 'react'

import ProjectStatistics from '../../shared/components/ProjectStatistics'
import ConnectWithProject from '../../shared/components/ConnectWithProject'

import FinishedForTheDay from './components/FinishedForTheDay'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), {
  ssr: false
}
)

function ClassifyPage (props) {
  const { addToCollection } = props
  return (
    <Box
      background={props.mode === 'light' ? 'light-1' : 'dark-1'}
      pad={{ top: 'medium' }}
    >
      <Grid gap='medium' margin='medium'>
        <ClassifierWrapper
          onAddToCollection={addToCollection}
        />
        <FinishedForTheDay />
        <ProjectStatistics />
        <ConnectWithProject />
      </Grid>
    </Box>
  )
}

ClassifyPage.propTypes = {
  addToCollection: func,
  mode: string
}

export default ClassifyPage
