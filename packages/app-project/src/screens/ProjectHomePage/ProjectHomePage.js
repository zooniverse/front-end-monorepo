import { Grid } from 'grommet'
import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'

import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from '@shared/components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectAnnouncement from './components/ProjectAnnouncement'

function ProjectHomePage (props) {
  const { screenSize } = props
  const responsiveColumns = (screenSize === 'small') ? ['auto'] : ['auto', '1em']
  return (
    <>
      <ProjectAnnouncement />
      <Hero />
      <Grid gap='medium' margin='medium'>
        <Grid columns={responsiveColumns} gap='small'>
          <ZooniverseTalk />
          <ThemeModeToggle />
        </Grid>
        <ProjectStatistics />
        <Grid
          fill='horizontal'
          gap='medium'
          columns={['repeat(auto-fit, minmax(320px, 1fr))']}
        >
          <MessageFromResearcher />
          <AboutProject />
        </Grid>
        <ConnectWithProject />
      </Grid>
    </>
  )
}

export default withResponsiveContext(ProjectHomePage)
export { ProjectHomePage }
