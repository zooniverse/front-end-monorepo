import {
  Anchor,
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
  Text,
  Tip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { Trans, useTranslation } from '../../../translations/i18n.js'
import styled from 'styled-components'
import { useContext } from 'react'

import Stats from '../../../components/Stats/Stats.js'
import { YouTubeEmbed } from '@next/third-parties/google'

const VideoWrapper = styled(Box)`
  border-radius: 8px; // same as Stat component
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin: 60px 0;
`

const CircleImage = styled(Box)`
  border-radius: 50%;
  overflow: hidden;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  width: 8rem;
  height: 8rem;
  margin-bottom: 10px;
`

const Discovery = ({ href, src, labelString }) => (
  <Anchor href={href}>
    <Box width='8rem'>
      <CircleImage>
        <Image alt='' loading='lazy' src={src} width='100%' height='100%' />
      </CircleImage>
      <Text
        color={{ light: 'dark-5', dark: 'white' }}
        textAlign='center'
        weight='normal'
        size='0.875rem'
      >
        {labelString}
      </Text>
    </Box>
  </Anchor>
)

export default function OurMission() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.one'
          t={t}
          components={[
            <Anchor key='publications-page' href='/about/publications' />
          ]}
        />
      </Paragraph>
      <Heading level={3} size='1.125rem' textAlign='start' margin='0'>
        {t('AboutPage.ourMission.subheadings.two')}
      </Heading>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.two'
          t={t}
          components={[
            <Anchor
              key='projects-page'
              href='https://www.zooniverse.org/projects'
            /> // hardcoded while /projects exists in a separate app
          ]}
        />
      </Paragraph>
      <Heading level={3} size='1.125rem' margin='0'>
        {t('AboutPage.ourMission.subheadings.three')}
      </Heading>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.three'
          t={t}
          components={[
            <Anchor
              key='crowd-wisdom'
              href='https://en.wikipedia.org/wiki/Wisdom_of_the_crowd'
            />
          ]}
        />
      </Paragraph>
      <Paragraph margin={{ top: '0', bottom: '50px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.four'
          t={t}
          components={[
            <Anchor key='talk-page' href='https://www.zooniverse.org/talk' /> // hardcoded while /talk exists in a separate app
          ]}
        />
      </Paragraph>

      <Heading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        fill
        level={3}
        size='1.125rem'
        textAlign='center'
        alignSelf='center'
      >
        {t('AboutPage.ourMission.subheadings.four').toUpperCase()}
      </Heading>

      <Stats />

      <VideoWrapper>
        <YouTubeEmbed
          height='100%'
          width='100%'
          videoid='F-B8gXJyMHc'
          title={t('AboutPage.ourMission.video')}
        />
      </VideoWrapper>

      <Box direction='row' justify='center' gap='10px'>
        <Heading
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          level={3}
          margin='0'
          size='1.125rem'
          textAlign='center'
        >
          {t('AboutPage.ourMission.subheadings.five').toUpperCase()}
        </Heading>
        <Tip
          content={<Text>{t('AboutPage.ourMission.discoveries.tip')}</Text>}
          plain
          dropProps={{
            align: { top: 'bottom' },
            background: 'dark-4',
            round: '5px',
            pad: '5px'
          }}
        >
          <Button plain icon={<CircleInformation size='1rem' />} />
        </Tip>
      </Box>
      <Grid
        columns={size === 'small' ? ['8rem', '8rem'] : ['8rem', '8rem', '8rem', '8rem']}
        rows={size === 'small' ? ['1fr', '1fr'] : 'auto'}
        justifyContent={size === 'small' ? 'around' : 'between'}
        margin={{ top: 'medium', bottom: 'large' }}
        gap={size === 'small' ? 'large' : 'none'}
      >
        <Discovery
          href='https://academic.oup.com/mnras/article/399/3/1191/1073770'
          src='https://static.zooniverse.org/fem-assets/green-pea.jpg'
          labelString={t('AboutPage.ourMission.discoveries.one')}
        />
        <Discovery
          href='https://en.wikipedia.org/wiki/Planet_Hunters'
          src='https://static.zooniverse.org/fem-assets/exoplanet.jpg'
          labelString={t('AboutPage.ourMission.discoveries.two')}
        />
        <Discovery
          href='https://blog.shakespearesworld.org/2017/04/05/shakespeares-world-and-updating-the-oed-a-splendid-antedating-of-white-lie/'
          src='https://static.zooniverse.org/fem-assets/transcription.jpg'
          labelString={t('AboutPage.ourMission.discoveries.three')}
        />
        <Discovery
          href='https://en.wikipedia.org/wiki/Tabby%27s_Star'
          src='https://static.zooniverse.org/fem-assets/star.jpg'
          labelString={t('AboutPage.ourMission.discoveries.four')}
        />
      </Grid>
    </>
  )
}
