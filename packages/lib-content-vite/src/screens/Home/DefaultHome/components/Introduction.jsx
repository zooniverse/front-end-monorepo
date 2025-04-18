import { Box, Button, Paragraph } from 'grommet'
import { useState } from 'react'
import styled from 'styled-components'
import { AuthModal, SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n.jsx'

import Stats from '../../../../components/Stats/Stats.jsx'
import SubHeading from '../../../../components/HeadingForAboutNav/SubHeading.jsx'
import { YouTubeEmbed } from '@next/third-parties/google'

const StyledSignIn = styled(Button)`
  width: 47%;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 0.8rem;
  padding: 8px 5px;
  text-align: center;
  color: black;
  background-color: white;
  font-weight: normal;

  &:hover {
    text-decoration: none;
  }
`

const StyledRegister = styled(Button)`
  width: 47%;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 0.8rem;
  padding: 8px 5px;
  text-align: center;
  font-weight: normal;
  color: white;
  background-color: ${props => props.theme.global.colors['neutral-1']};

  &:hover {
    text-decoration: none;
  }
`

const VideoWrapper = styled(Box)`
  border-radius: 8px; // same as Stat component
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin: 60px 0;
`

export default function Introduction() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(-1)

  function openRegisterModal() {
    setActiveIndex(1)
  }

  function openSignInModal() {
    setActiveIndex(0)
  }

  function closeAuthModal() {
    setActiveIndex(-1)
  }

  return (
    <>
      <AuthModal
        activeIndex={activeIndex}
        closeModal={closeAuthModal}
        onActive={setActiveIndex}
      />
      <SpacedHeading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        level={2}
        size='1.5rem'
        alignSelf='center'
        margin={{ top: '30px', bottom: '10px' }}
        textAlign='center'
      >
        {t('Home.DefaultHome.headings.first')}
      </SpacedHeading>
      <SubHeading>{t('Home.DefaultHome.subheadings.first')}</SubHeading>
      <Paragraph
        color={{ light: 'black', dark: 'white' }}
        margin={{ top: 'medium' }}
      >
        {t('Home.DefaultHome.Introduction.description1')}
      </Paragraph>
      <Paragraph
        color={{ light: 'black', dark: 'white' }}
        margin={{ bottom: 'medium' }}
      >
        {t('Home.DefaultHome.Introduction.description2')}
      </Paragraph>
      <Box direction='row' justify='between' margin={{ bottom: '60px' }}>
        <StyledSignIn
          label={t('Home.DefaultHome.Introduction.signIn')}
          onClick={openSignInModal}
          plain
        />
        <StyledRegister
          label={t('Home.DefaultHome.Introduction.register')}
          onClick={openRegisterModal}
          plain
        />
      </Box>
      <SpacedHeading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        level={3}
        size='1rem'
        alignSelf='center'
        margin={{ bottom: 'small', top: '0' }}
      >
        {t('Home.DefaultHome.subheadings.second')}
      </SpacedHeading>
      <Stats />
      <VideoWrapper>
        <YouTubeEmbed
          height='100%'
          width='100%'
          videoid='F-B8gXJyMHc'
          title={t('Home.DefaultHome.Introduction.video')}
        />
      </VideoWrapper>
    </>
  )
}
