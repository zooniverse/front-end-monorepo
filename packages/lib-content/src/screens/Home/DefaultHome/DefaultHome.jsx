'use client'

import { Box } from 'grommet'
import { SpacedHeading } from '@zooniverse/react-components'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n.jsx'
import ContainerBox from '@components/PageLayout/ContainerBox.jsx'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent.jsx'
import SubHeading from '@components/HeadingForAboutNav/SubHeading.jsx'

import CommunityContainer from '../Community/CommunityContainer.jsx'
import Introduction from './components/Introduction.jsx'
import Hero from './components/Hero.jsx'
import FeaturedProjects from './components/FeaturedProjects.jsx'
import Mobile from '@components/Mobile/Mobile.jsx'
import Researchers from './components/Researchers.jsx'

const StyledBox = styled(Box)`
  padding: 0 0 50px 0;

  @media (width <= 90rem) {
    padding: 0 30px 50px;
  }
`

export default function DefaultHome({ dailyZooPosts = [], zooBlogPosts = [] }) {
  const { t } = useTranslation()

  return (
    <Box
      as='main'
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      align='center'
    >
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <Hero />
        <StyledBox
          align='center'
          width='min(100%, calc(90rem - 160px))' // Like 80px horizontal padding, matches lib-user Layout
        >
          <MaxWidthContent>
            <Introduction />
          </MaxWidthContent>
          <FeaturedProjects />
          <Researchers />
          <SpacedHeading
            level={2}
            size='1.5rem'
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            textAlign='center'
            fill
          >
            {t('Home.DefaultHome.headings.fourth')}
          </SpacedHeading>
          <SubHeading>{t('Home.DefaultHome.subheadings.fourth')}</SubHeading>
          <Box margin={{ bottom: 'medium' }}>
            <Mobile />
          </Box>
          <CommunityContainer
            dailyZooPosts={dailyZooPosts}
            zooBlogPosts={zooBlogPosts}
          />
        </StyledBox>
      </ContainerBox>
    </Box>
  )
}
