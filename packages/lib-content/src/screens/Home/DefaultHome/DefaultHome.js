'use client'

import { Box } from 'grommet'
import { SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from '../../../translations/i18n.js'

import ContainerBox from '../../../components/PageLayout/ContainerBox.js'
import MaxWidthContent from '../../../components/MaxWidthContent/MaxWidthContent.js'
import Introduction from './components/Introduction.js'
import Hero from './components/Hero.js'
import FeaturedProjects from './components/FeaturedProjects.js'
import Mobile from '../../../components/Mobile/Mobile.js'
import Researchers from './components/Researchers.js'
import SubHeading from '../../../components/HeadingForAboutNav/SubHeading.js'

export default function DefaultHome() {
  const { t } = useTranslation()

  return (
    <Box
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      align='center'
    >
      <Hero />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
        pad={{ horizontal: 'large' }}
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
          {t('Home.DefaultHome.headings.four')}
        </SpacedHeading>
        <SubHeading>{t('Home.DefaultHome.subheadings.four')}</SubHeading>
        <Mobile />
      </ContainerBox>
    </Box>
  )
}
