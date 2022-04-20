import { Box, Grid } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import { ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'

import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from './components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import ThemeModeToggle from '@components/ThemeModeToggle'
import { Media } from '../../shared/components/Media'
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

const RemainingHeightBox = styled(Box)`
  flex-grow: 1;
`

function ProjectHomePage ({
  inBeta,
  workflows
}) {
  const { locale } = useRouter()
  return (
    <Box border={(inBeta) ? { color: 'brand', size: 'medium' } : false}>
      <Media at='default'>
        <ZooHeaderWrapper />
        <ProjectHeader />
        <Announcements />
        <Hero workflows={workflows} />
        <Box margin='small' gap='small'>
          <ThemeModeToggle />
          <ZooniverseTalk />
          <ProjectStatistics />
          <MessageFromResearcher />
          <AboutProject />
          <ConnectWithProject />
        </Box>
      </Media>

      <Media greaterThan='default'>
        <FullHeightBox margin={{ bottom: 'large' }}>
          <ZooHeaderWrapper />
          <ProjectHeader />
          <Announcements />
          <RemainingHeightBox>
            <Hero workflows={workflows} isWide={true} />
          </RemainingHeightBox>
        </FullHeightBox>
        <Box
          align='start'
          direction='row'
          margin='small'
          width={{ max: 'xxlarge' }}
        >
          <Box gap='medium'>
            <Grid columns={['auto', '1em']} gap='small'>
              <ZooniverseTalk />
              <ThemeModeToggle />
            </Grid>
            <ProjectStatistics />
            <Grid columns={['1fr', '1fr']} gap='medium'>
              <MessageFromResearcher />
              <AboutProject />
            </Grid>
            <ConnectWithProject />
          </Box>
        </Box>
      </Media>
      <ZooFooter locale={locale} />
    </Box>
  )
}

ProjectHomePage.defaultProps = {
  inBeta: false,
  workflows: []
}

ProjectHomePage.propTypes = {
  inBeta: bool,
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default ProjectHomePage
