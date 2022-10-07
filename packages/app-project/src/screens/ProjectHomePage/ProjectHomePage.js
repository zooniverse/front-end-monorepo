import { Box, Grid } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import { AdminCheckbox, ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'

import { useAdminMode } from '@hooks'
import {
  AdminContainer,
  Announcements,
  ProjectHeader,
  ThemeModeToggle,
  ZooHeaderWrapper,
} from '@components'
import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from './components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import { Media } from '@shared/components/Media'

export const adminBorderImage = 'repeating-linear-gradient(45deg,#000,#000 25px,#ff0 25px,#ff0 50px) 5'

const PageBox = styled(Box)`
  &.admin {
    border-image: ${adminBorderImage};
  }
`

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

const RemainingHeightBox = styled(Box)`
  flex-grow: 1;
`

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { inBeta } = store.project
  return {
    inBeta
  }
}

function ProjectHomePage ({
  workflows
}) {
  const { inBeta } = useStores()
  const { adminMode, toggleAdmin } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale

  const adminBorder = { size: 'medium' }
  const betaBorder = { color: 'brand', size: 'medium' }
  let border = adminMode ? adminBorder : false
  border = inBeta ? betaBorder : border
  const className = adminMode ? 'admin' : undefined

  return (
    <PageBox
      className={className}
      data-testid='project-home-page'
      border={border}
    >
      <Media at='default'>
        <header>
          <ZooHeaderWrapper />
          <ProjectHeader adminMode={adminMode} />
          <Announcements />
        </header>
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
          <header>
            <ZooHeaderWrapper />
            <ProjectHeader adminMode={adminMode} />
            <Announcements />
          </header>
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
      <ZooFooter
        adminContainer={<AdminContainer onChange={toggleAdmin} checked={adminMode} />}
        locale={locale}
      />
    </PageBox>
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

export default observer(ProjectHomePage)
