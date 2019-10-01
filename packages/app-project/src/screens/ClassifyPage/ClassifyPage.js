import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { func, string } from 'prop-types'
import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'

import FinishedForTheDay from './components/FinishedForTheDay'
import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectName from '@components/ProjectName'
import YourStats from './components/YourStats'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage (props) {
  const { addToCollection, screenSize } = props
  const responsiveColumns = (screenSize === 'small') ? ['auto'] : ['1em', 'auto', '1em']

  return (
    <Box gap='medium' pad={{ horizontal: 'small', vertical: 'medium' }}>

      <Box as='main'>
        <Grid columns={responsiveColumns} gap='small'>
          <ProjectName />
          <ClassifierWrapper
            onAddToCollection={addToCollection}
          />
          <ThemeModeToggle />
        </Grid>
      </Box>

      <Box as='aside' gap='medium'>
        <FinishedForTheDay />
        <Grid columns={['1fr', '2fr']} gap='medium'>
          <YourStats />
        </Grid>
        <ProjectStatistics />
        <ConnectWithProject />
      </Box>
    </Box>

  )
}

ClassifyPage.propTypes = {
  addToCollection: func,
  screenSize: string
}

export default withResponsiveContext(ClassifyPage)
export { ClassifyPage }
