import { Box, Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { withResponsiveContext } from '@zooniverse/react-components'

import { useAdminMode } from '@hooks'
import Hero from './components/Hero/index.js'
import MessageFromResearcher from './components/MessageFromResearcher/index.js'
import AboutProject from './components/AboutProject/index.js'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import StandardLayout, { HeaderComponents } from '@shared/components/StandardLayout/StandardLayout.js'
import ZooniverseTalk from './components/ZooniverseTalk/index.js'

function ProjectHomePage({ screenSize, workflows = [] }) {
  const { adminMode } = useAdminMode()
  const mobileLayout = screenSize === 'small'

  return (
    <StandardLayout page='home'>
      <Box height={mobileLayout ? { min: '0' } : { min: '90vh' }}>
        <HeaderComponents adminMode={adminMode} />
        <Hero isWide={!mobileLayout} workflows={workflows} />
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
  screenSize: string,
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}

export default withResponsiveContext(ProjectHomePage)
