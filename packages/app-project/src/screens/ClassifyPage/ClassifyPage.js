import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { func } from 'prop-types'
import React from 'react'

import FinishedForTheDay from './components/FinishedForTheDay'
import ConnectWithProject from '../../shared/components/ConnectWithProject'
import ProjectStatistics from '../../shared/components/ProjectStatistics'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage (props) {
  const { addToCollection } = props
  return (
    <Box pad={{ top: 'medium' }}>
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
  addToCollection: func
}

export default ClassifyPage
