import { Anchor, Box, Heading, Text } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { StatusGood } from 'grommet-icons'

import MaxWidthContent from '@shared/components/MaxWidthContent/MaxWidthContent.js'
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
  position: relative;
  width: 240px; // same as ArrowSVG
  height: 46px; // text portion of SVG
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  margin-bottom: 50px;
`

const ArrowSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='240px'
    viewBox='0 0 248 68'
    fill='none'
    aria-hidden
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      filter: 'drop-shadow(3px 3px 4px rgba(0 0 0 0.5))'
    }}
  >
    <path
      d='M237 2.55109H7.33333C3.33333 2.55109 2.11111 6.56608 2 8.57358V39.6898C2 45.3108 5.55556 46.716 7.33333 46.716H95.9036C97.4877 46.716 99.0361 47.1863 100.353 48.0673L117.853 59.7779C120.561 61.5901 124.098 61.5787 126.794 59.7489L143.966 48.0963C145.291 47.1969 146.856 46.716 148.458 46.716H236.667H237C241 46.716 242 42.0319 242 39.6898V10.0792C242 4.05671 238.667 2.55109 237 2.55109Z'
      fill='white'
      fill-opacity='0.2'
      stroke-width='1px'
      stroke='white'
    />
  </svg>
)

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <MaxWidthContent background='neutral-1' round='16px'>
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
        <Box as='ul' width='50%' align='center' margin='0' pad='0'>
          <ArrowBox>
            <ArrowSVG />
            <Text color='white' weight='bold' size='1.125rem'>
              {`${t('AboutPage.howItWorks.participants.description')}:`}
            </Text>
          </ArrowBox>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.participants.steps.one')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.participants.steps.two')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.participants.steps.three')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px'>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.participants.steps.four')}
            </Text>
          </Box>
        </Box>
        <Box as='ul' width='50%' align='center' margin='0' pad='0'>
          <ArrowBox>
            <ArrowSVG />
            <Text color='white' weight='bold' size='1.125rem'>
              {`${t('AboutPage.howItWorks.researchers.description')}:`}
            </Text>
          </ArrowBox>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.researchers.steps.one')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.researchers.steps.two')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px' margin={{ bottom: '70px' }}>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.researchers.steps.three')}
            </Text>
          </Box>
          <Box as='li' direction='row' align='center' width='240px'>
            <StatusGood color='white' size='50px' />
            <Text margin={{ left: '10px' }} size='1rem'>
              {t('AboutPage.howItWorks.researchers.steps.four')}
            </Text>
          </Box>
        </Box>
      </GradientBox>
    </MaxWidthContent>
  )
}
