import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { string } from 'prop-types'
import React from 'react'

import CollectionsModal from './components/CollectionsModal'
import ProjectStatistics from '../../shared/components/ProjectStatistics'
import ConnectWithProject from '../../shared/components/ConnectWithProject'

import FinishedForTheDay from './components/FinishedForTheDay'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), {
  ssr: false
}
)

function ClassifyPage (props) {
  const collectionsModal = React.createRef()
  function addToCollection (subjectId) {
    collectionsModal.current.wrappedInstance.open(subjectId)
  }
  return (
    <Box
      background={props.mode === 'light' ? 'light-1' : 'dark-1'}
      pad={{ top: 'medium' }}
    >
      <CollectionsModal
        ref={collectionsModal}
      />
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
  mode: string
}

export default ClassifyPage
