import { Anchor, Box, Heading, Text } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import { HeadingForAboutNav } from '../About.js'

const GradientBox = styled(Box)`
  background: linear-gradient(
    212deg,
    rgba(0, 151, 157, 0.2) 8.04%,
    rgba(255, 255, 255, 0.2) 11.21%,
    rgba(0, 93, 105, 0.2) 24.51%,
    rgba(255, 255, 255, 0.2) 45.18%,
    rgba(0, 93, 105, 0.2) 67.56%,
    rgba(255, 255, 255, 0.2) 85.31%,
    rgba(0, 151, 157, 0.2) 86.6%,
    rgba(255, 255, 255, 0) 100.98%
  );
`

const ArrowBox = styled(Box)`
  border: solid white 1px;
  backdrop-filter: blur(10px) brightness(130%);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  align-items: center;
  padding: 10px 20px;
`

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <Box background='neutral-1' round='16px'>
      <Box align='center'>
        <HeadingForAboutNav
          color='accent-1'
          sectionName={t('AboutPage.howItWorks.heading')}
          slug='how-it-works'
        />
        <Heading
          level={3}
          size='2rem'
          alignSelf='center'
          margin='0'
          color='white'
          weight='normal'
        >
          {t('AboutPage.howItWorks.subheading')}
        </Heading>
      </Box>
      <GradientBox direction='row' pad='medium'>
        <Box width='50%'>
          <ArrowBox>
            <Text color='white' weight='bold'>
              {t('AboutPage.howItWorks.participants.description')}
            </Text>
          </ArrowBox>
        </Box>
      </GradientBox>
    </Box>
  )
}
