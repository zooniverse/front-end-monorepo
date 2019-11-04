import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { func, string } from 'prop-types'
import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'

import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectName from '@components/ProjectName'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import FinishedForTheDay from './components/FinishedForTheDay'
import RecentSubjects from './components/RecentSubjects'
import YourStats from './components/YourStats'
import StandardLayout from '@shared/components/StandardLayout'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage (props) {
  const { addToCollection, screenSize } = props
  const responsiveColumns = (screenSize === 'small')
    ? ['auto']
    : ['1em', 'auto', '1em']

  return (
    <StandardLayout>

      <Box
        align='center'
        gap='medium'
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >

        <Box as='main' fill='horizontal'>
          <Grid columns={responsiveColumns} gap='small'>
            <ProjectName />
            <ClassifierWrapper
              onAddToCollection={addToCollection}
            />
            <ThemeModeToggle />
          </Grid>
        </Box>

        <Box as='aside' gap='medium' width={{ min: 'none', max: 'xxlarge' }}>
          <FinishedForTheDay />
          <Grid
            alignContent='stretch'
            columns={(screenSize === 'small') ? ['auto'] : ['1fr', '2fr']}
            gap='medium'
          >
            <YourStats />
            <RecentSubjects
              size={(screenSize === 'small') ? 1 : 3}
            />
          </Grid>
          <ProjectStatistics />
          <ConnectWithProject />
        </Box>

      </Box>
    </StandardLayout>
  )
}

ClassifyPage.propTypes = {
  addToCollection: func,
  screenSize: string
}

export default withResponsiveContext(ClassifyPage)
export { ClassifyPage }
