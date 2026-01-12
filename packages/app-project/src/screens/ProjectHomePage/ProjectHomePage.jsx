import { Box, Grid, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import { useAdminMode } from '@hooks'
import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from './components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import StandardLayout, { HeaderComponents } from '@shared/components/StandardLayout/StandardLayout'
import ZooniverseTalk from './components/ZooniverseTalk'

function ProjectHomePage({ workflows = [] }) {
  const { adminMode } = useAdminMode()
  const size = useContext(ResponsiveContext)
  const mobileLayout = size === 'small'

  return (
    <StandardLayout page='home'>
      <Box height={mobileLayout ? { min: '0' } : { min: '90vh' }}>
        <HeaderComponents adminMode={adminMode} />
        <Hero workflows={workflows} />
      </Box>
      <Box align='center'>
        <Box gap='medium' pad='medium' width='min(100%, 90rem)'>
          <ZooniverseTalk />
          <ProjectStatistics />
          <Grid columns={mobileLayout ? ['1fr'] : ['1fr', '1fr']} gap='medium'>
            <MessageFromResearcher />
            <AboutProject />
          </Grid>
          <ConnectWithProject />
        </Box>
      </Box>
    </StandardLayout>
  )
}

ProjectHomePage.propTypes = {
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}

export default ProjectHomePage
