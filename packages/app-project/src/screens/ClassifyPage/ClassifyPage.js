import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { func } from 'prop-types'
import React from 'react'

import FinishedForTheDay from './components/FinishedForTheDay'
import ThemeModeToggle from '../../components/ThemeModeToggle'
import ProjectName from '../../components/ProjectName'
import ConnectWithProject from '../../shared/components/ConnectWithProject'
import ProjectStatistics from '../../shared/components/ProjectStatistics'
const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage (props) {
  const { addToCollection } = props
  return (
    <Grid columns={['auto', 'auto', 'auto']}>
      <ProjectName />
      <Box gap='medium' pad={{ bottom: 'medium', left: 'small', right: 'small', top: 'medium' }}>
        <ClassifierWrapper
          onAddToCollection={addToCollection}
        />
        <FinishedForTheDay />
        <ProjectStatistics />
        <ConnectWithProject />
      </Box>
      <ThemeModeToggle />
    </Grid>

  )
}

ClassifyPage.propTypes = {
  addToCollection: func
}

export default ClassifyPage
