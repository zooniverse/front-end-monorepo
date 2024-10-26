import { Anchor, Box, Paragraph } from 'grommet'
import { YouTubeEmbed } from '@next/third-parties/google'
import { useTranslation } from '../../../../translations/i18n.js'
import styled, { css } from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'

import SubHeading from '../../../../components/HeadingForAboutNav/SubHeading.js'
import MaxWidthContent from '../../../../components/MaxWidthContent/MaxWidthContent.js'

const StyledLink = styled(Anchor)`
  display: flex;
  justify-content: center;
  width: 300px;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 8px 5px;
  color: black;
  background-color: ${props => props.theme.global.colors['neutral-2']};
  font-weight: normal;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    text-decoration: none;
  }
`

const Relative = styled(Box)`
  position: relative;
`

const OverlayFade = styled(Box)`
  position: absolute;
  right: -1px;
  top: 0;
  width: 30px;
  height: 100%;
  ${props =>
    props.theme.dark
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            ${props.theme.global.colors['dark-3']} 100%
          );
        `
      : css`
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            #fff 100%
          );
        `}
`

const VideoWrapper = styled(Box)`
  min-width: 478px;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  @media (width <= 769px) {
    min-width: 370px;
  }
`

const YOUTUBE_SOURCES = [
  ['CaTNIoJy4Dg', 'Around the Zoo – Planet Hunters TESS'],
  ['8lZiZoBcMjE', 'Around the Zoo – Wildcam Gorongosa'],
  ['B6diEbpEblQ', 'Around the Zoo – Backyard Worlds'],
]

export default function Researchers() {
  const { t } = useTranslation()

  return (
    <Box align='center' margin={{ vertical: '60px' }}>
      <MaxWidthContent>
        <SpacedHeading
          level={2}
          size='1.5rem'
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          textAlign='center'
          fill
        >
          {t('Home.DefaultHome.headings.three')}
        </SpacedHeading>
        <SubHeading>{t('Home.DefaultHome.subheadings.three')}</SubHeading>
      </MaxWidthContent>
      <Relative>
        <Box
          direction='row'
          justify='between'
          margin={{ top: 'medium' }}
          gap='small'
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
          overflow={{ horizontal: 'auto' }}
        >
          {YOUTUBE_SOURCES.map(([id, title]) => (
            <VideoWrapper key={id}>
              <YouTubeEmbed
                height='100%'
                width='100%'
                videoid={id}
                title={title}
              />
            </VideoWrapper>
          ))}
        </Box>
        <OverlayFade />
      </Relative>
      <MaxWidthContent>
        <Paragraph
          color={{ light: 'black', dark: 'white' }}
          margin={{ vertical: 'medium' }}
        >
          {t('Home.DefaultHome.Researchers.description')}
        </Paragraph>
        <StyledLink
          href='https://www.zooniverse.org/lab'
          label={t('Home.DefaultHome.Researchers.build')}
          alignSelf='center'
        />
      </MaxWidthContent>
    </Box>
  )
}
