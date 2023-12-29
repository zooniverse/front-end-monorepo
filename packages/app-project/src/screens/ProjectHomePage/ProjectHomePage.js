import { Box, Grid } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import { ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useAdminMode } from '@hooks'

import { AdminContainer, Announcements, ProjectHeader } from '@components'
import Hero from './components/Hero'
import MessageFromResearcher from './components/MessageFromResearcher'
import AboutProject from './components/AboutProject'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ZooniverseTalk from './components/ZooniverseTalk'
import { Media } from '@shared/components/Media'
import PageHeader from '../../components/PageHeader/PageHeader.js'

export const adminBorderImage = 'repeating-linear-gradient(45deg,#000,#000 25px,#ff0 25px,#ff0 50px) 5'

const PageBox = styled(Box)`
  &.admin {
    border-image: ${adminBorderImage};
  }
`

const FullHeightBox = styled(Box)`
  min-height: 90vh;
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

function ProjectHomePage({ workflows = [] }) {
  const { inBeta } = useStores()
  const { adminMode, toggleAdmin } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale
  const { t } = useTranslation()

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
        <header aria-label={t('StandardLayout.headerLabel')}>
          <PageHeader adminMode={adminMode} />
          <ProjectHeader adminMode={adminMode} />
          <Announcements />
        </header>
        <Hero workflows={workflows} />
        <Box gap='medium' pad='medium'>
          <ZooniverseTalk />
          <ProjectStatistics />
          <MessageFromResearcher />
          <AboutProject />
          <ConnectWithProject />
        </Box>
      </Media>

      <Media greaterThan='default'>
        <FullHeightBox>
          <header aria-label={t('StandardLayout.headerLabel')}>
            <PageHeader isAdmin={adminMode} />
            <ProjectHeader adminMode={adminMode} />
            <Announcements />
          </header>
          <RemainingHeightBox>
            <Hero isWide={true} workflows={workflows} />
          </RemainingHeightBox>
        </FullHeightBox>
        <Box align='center'>
          <Box gap='medium' pad='medium' width='min(100%, 90rem)'>
            <ZooniverseTalk />
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

ProjectHomePage.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
    })
  )
}

export default observer(ProjectHomePage)
