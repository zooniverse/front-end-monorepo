import { Anchor, Box, Heading } from 'grommet'
import styled from 'styled-components'
import { SpacedText, ZooniverseLogotype } from '@zooniverse/react-components'

import { useTranslation } from '../../../../translations/i18n.js'
import { mobileBreakpoint } from '../../../../components/SharedStyledComponents/SharedStyledComponents.js'

const Relative = styled(Box)`
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.global.colors['neutral-1']};
  height: 60vh;
`

const VideoContainer = styled(Box)`
  width: 100%;
  height: 60vh;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }

  @media (prefers-reduced-motion) {
    display: none;
  }
`

const MobileHeroImage = styled(Box)`
  width: 100%;
  height: 60vh;

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

const HeroCopy = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const StyledHeading = styled(Heading)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
`

const StyledLogo = styled(ZooniverseLogotype)`
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
`

const StyledLink = styled(Anchor)`
  width: 300px;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 8px 5px;
  text-align: center;
  color: black;
  background-color: ${props => props.theme.global.colors['neutral-2']};
  font-weight: normal;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    text-decoration: none;
  }
`

export default function Hero() {
  const { t } = useTranslation()

  return (
    <Relative width='100%'>
      <VideoContainer>
        <video
          autoPlay
          loop
          disablepictureinpicture
          muted
          preload='metadata'
        >
          <source type='video/webm' src='/assets/home-video.webm' />
          <source type='video/mp4' src='/assets/home-video.mp4' />
        </video>
      </VideoContainer>
      <MobileHeroImage
        background={`url(${'/assets/home-video-placeholder.jpg'})`}
      />
      <HeroCopy justify='center' align='center' pad='medium'>
        <StyledHeading level={1} margin={{ bottom: '30px', top: '0' }}>
          <SpacedText
            color='neutral-2'
            size='2.4rem'
            margin={{ bottom: 'small' }}
          >
            {t('Home.DefaultHome.mainHeading')}
          </SpacedText>
          <StyledLogo
            color='white'
            id='home-hero-heading-logo'
            width='min(100%, 45rem)' // same as MaxWidthContent
          />
        </StyledHeading>
        <StyledLink
          href='https://www.zooniverse.org/projects'
          label={t('Home.DefaultHome.projects')}
        />
      </HeroCopy>
    </Relative>
  )
}
