import { Anchor, Box, Button, Heading, Image, Text } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import {
  Certificate,
  Compass,
  Compliance,
  Deploy,
  Download,
  Info,
  Troubleshoot,
  Validate
} from 'grommet-icons'

import MaxWidthContent from '@shared/components/MaxWidthContent/MaxWidthContent.js'
import { HeadingForAboutNav } from '../About.js'

const GradientBox = styled(Box)`
  position: relative;
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

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #a6a7a9 50%,
      transparent 100%
    );
  }
`

const ListsContainer = styled(Box)`
  flex-direction: row;

  @media (width < 37rem) {
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
  }
`

const Institute = styled(Box)`
  border: solid white 1px;
  width: 100%;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: rgba(239, 242, 245, 0.3);
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 5px;
  align-items: center;
`

const ArrowBox = styled(Box)`
  position: relative;
  width: 240px; // same as ArrowSVG
  height: 46px; // upper portion of SVG
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  margin-bottom: 50px;
`

const StyledButton = styled(Button)`
  background: white;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 0.8rem;
  padding: 5px;
  width: 240px; // same as ArrowSVG
  min-width: 130px;
  border-radius: 8px;
  border: solid 1px ${props => props.theme.global.colors['neutral-2']};
  text-align: center;

  &:hover {
    text-decoration: none;
  }
`

const BoxWithConnector = styled(Box)`
  position: relative;

  &:not(:nth-child(2)) {
    &:before {
      content: '';
      position: absolute;
      bottom: calc(50% + 40px);
      left: 24px;
      height: 30px;
      width: 2px;
      background: white;
    }
  }

  &:not(:last-child) {
    margin-bottom: 70px;

    &:after {
      content: '';
      position: absolute;
      top: calc(50% + 40px);
      left: 24px;
      height: 30px;
      width: 2px;
      background: white;
    }
  }
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

const ListItem = ({ children }) => (
  <BoxWithConnector
    forwardedAs='li'
    direction='row'
    align='center'
    width='240px'
  >
    {children}
  </BoxWithConnector>
)

const Step = ({ children }) => (
  <Text margin={{ left: '10px' }} size='1rem' color='white'>
    {children}
  </Text>
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
          color='white'
          weight='normal'
          margin={{ top: '0', bottom: 'medium' }}
        >
          {t('AboutPage.howItWorks.subheading')}
        </Heading>
      </Box>
      <GradientBox pad='large'>
        <ListsContainer direction='row' width='100%' justify='between'>
          {/** For Participants */}
          <Box
            as='ul'
            width={{ max: '240px' }}
            margin='0'
            pad='0'
            height='100%'
          >
            <ArrowBox>
              <ArrowSVG />
              <Text color='white' weight='bold' size='1.125rem'>
                {`${t('AboutPage.howItWorks.participants.description')}:`}
              </Text>
            </ArrowBox>
            <ListItem>
              <Compass color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.participants.steps.one')}</Step>
            </ListItem>
            <ListItem>
              <Info color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.participants.steps.two')}</Step>
            </ListItem>
            <ListItem>
              <Compliance color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.participants.steps.three')}</Step>
            </ListItem>
            <ListItem>
              <Certificate color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.participants.steps.four')}</Step>
            </ListItem>
          </Box>

          {/** For Researchers */}
          <Box
            as='ul'
            width={{ max: '240px' }}
            margin='0'
            pad='0'
            height='100%'
          >
            <ArrowBox>
              <ArrowSVG />
              <Text color='white' weight='bold' size='1.125rem'>
                {`${t('AboutPage.howItWorks.researchers.description')}:`}
              </Text>
            </ArrowBox>
            <ListItem>
              <Troubleshoot color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.researchers.steps.one')}</Step>
            </ListItem>
            <ListItem>
              <Validate color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.researchers.steps.two')}</Step>
            </ListItem>
            <ListItem>
              <Deploy color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.researchers.steps.three')}</Step>
            </ListItem>
            <ListItem>
              <Download color='white' size='50px' />
              <Step>{t('AboutPage.howItWorks.researchers.steps.four')}</Step>
            </ListItem>
          </Box>
        </ListsContainer>

        {/** Buttons */}
        <Box
          direction='row'
          pad={{ vertical: 'medium' }}
          gap='small'
          justify='between'
        >
          <StyledButton
            as={Anchor}
            color='black'
            plain
            href='https://www.zooniverse.org/projects'
            label={t('AboutPage.howItWorks.participants.link')}
            weight='normal'
          />
          <StyledButton
            as={Anchor}
            color='black'
            plain
            href='https://www.zooniverse.org/lab'
            label={t('AboutPage.howItWorks.researchers.link')}
            weight='normal'
          />
        </Box>

        {/** Institutes */}
        <Box direction='row' gap='small'>
          <Institute>
            <Image
              alt='The Adler Planetarium'
              width='100px'
              src='/about/assets/adler.png'
              fit='contain'
            />
          </Institute>
          <Institute>
            <Image
              alt='University of Minnesota'
              width='100%'
              src='/about/assets/minnesota.png'
              fit='contain'
            />
          </Institute>
          <Institute>
            <Image
              alt='University of Oxford'
              width='75px'
              src='/about/assets/oxford.jpg'
              fit='contain'
            />
          </Institute>
        </Box>
      </GradientBox>
    </MaxWidthContent>
  )
}
