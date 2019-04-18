import { Box } from 'grommet'
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
    <Box gap='medium' pad={{ bottom: 'medium', left: 'medium', right: 'small', top: 'medium' }}>
      <ClassifierWrapper
        onAddToCollection={addToCollection}
      />
      <FinishedForTheDay />
      <ProjectStatistics />
      <ConnectWithProject />
    </Box>
  )
}

ClassifyPage.propTypes = {
  addToCollection: func
}

export default ClassifyPage
