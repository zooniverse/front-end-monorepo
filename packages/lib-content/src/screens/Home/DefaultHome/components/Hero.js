import { Anchor, Box, Heading, Paragraph, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { SpacedText, ZooniverseLogotype } from '@zooniverse/react-components'
import { useHasMounted } from '@zooniverse/react-components/hooks'
import { useContext, useRef } from 'react'

import { useTranslation } from '../../../../translations/i18n.js'

const Relative = styled(Box)`
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.global.colors['neutral-1']};
  min-height: 60vh;
`

const HeroImage = styled(Box)`
  width: 100%;
  height: 60vh;

  @media (width > 768px) {
    height: 90vh;
  }
`

const HeroCopy = styled(Box)`
  background: rgba(0, 93, 105, 0.6);
  backdrop-filter: blur(3px);
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
  width: min(100%, 45rem); // Same as MaxWidthContent
`

const StyledParagraph = styled(Paragraph)`
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  width: min(100%, 45rem); // Same as MaxWidthContent
`

const StyledLogo = styled(ZooniverseLogotype)`
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  min-width: 100%;
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
  const videoRef = useRef(null)
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const hasMounted = useHasMounted()

  let prefersReducedMotion
  if (hasMounted) {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = reducedMotionQuery?.matches
  }

  // Only autoplay a video element if desktop width and device does not prefer reduced motion
   if (size !== 'small' && !prefersReducedMotion && hasMounted && videoRef.current) {
    videoRef.current.play()
   }

  return (
    <Relative width='100%'>
      {size !== 'small' && !prefersReducedMotion ? (
        <Box fill>
          <video loop disablePictureInPicture muted preload='metadata' ref={videoRef}>
            <source type='video/webm' src='https://static.zooniverse.org/fem-assets/home-video.webm' />
            <source type='video/mp4' src='https://static.zooniverse.org/fem-assets/home-video.mp4' />
          </video>
        </Box>
      ) : (
        <HeroImage
          background={`url(${'https://static.zooniverse.org/fem-assets/home-video-placeholder.jpg'})`}
        />
      )}
      <HeroCopy justify='center' align='center' pad='medium'>
        <StyledHeading level={1} margin='0'>
          <SpacedText
            color='accent-2'
            weight='bold'
            size={size === 'small' ? '1.125rem' : '2.4rem'}
            margin={{ bottom: 'small' }}
          >
            {t('Home.DefaultHome.mainHeading')}
          </SpacedText>
          <StyledLogo color='white' id='home-hero-heading-logo' width='100%' />
        </StyledHeading>
        <StyledParagraph
          color='accent-2'
          size={size === 'small' ? '1rem' : '1.5rem'}
          textAlign='center'
        >
          {t('Home.DefaultHome.heroText')}
        </StyledParagraph>
        <StyledLink
          href='https://www.zooniverse.org/projects'
          label={t('Home.DefaultHome.projects')}
        />
      </HeroCopy>
    </Relative>
  )
}
