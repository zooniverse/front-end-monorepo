import { Anchor, Box, Image, Paragraph, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { Trans, useTranslation } from '../../../translations/i18n.js'

import ContainerBox from '../../../components/PageLayout/ContainerBox.js'
import MaxWidthContent from '../../../components/MaxWidthContent/MaxWidthContent.js'
import Stats from '../../../components/Stats/Stats.js'
import Mobile from '../../../components/Mobile/Mobile.js'
import { mobileBreakpoint } from '../../../components/SharedStyledComponents/SharedStyledComponents.js'
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
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <MaxWidthContent>
          <Stats />

          <Mobile />
        </MaxWidthContent>
      </ContainerBox>
    </Box>
  )
}
