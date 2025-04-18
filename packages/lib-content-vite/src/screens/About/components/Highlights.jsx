import {
  Anchor,
  Box,
  Button,
  Image,
  Paragraph,
  Text,
  Tip
} from 'grommet'
import { Trans, useTranslation } from '../../../translations/i18n.jsx'
import { CircleInformation } from 'grommet-icons'
import styled from 'styled-components'

const Relative = styled(Box)`
  // This is necessary so the Contact Us section's header margin doesn't overlap the interactive icon in this section
  position: relative;
`

export default function Highlights() {
  const { t } = useTranslation()

  return (
    <>
      <Paragraph>
        <Trans
          i18nKey={'AboutPage.highlights.paragraphs.first'}
          t={t}
          components={[
            <Anchor
              key='publications-page'
              href='/about/publications'
            />
          ]}
        />
      </Paragraph>
      <Paragraph margin='0'>
        {t('AboutPage.highlights.paragraphs.second')}
      </Paragraph>
      <Box
        justify='center'
        gap='xsmall'
        margin={{ top: '30px' }}
        direction='row'
      >
        <Box>
          <Image
            alt={t('AboutPage.highlights.pictures.first')}
            src='https://static.zooniverse.org/fem-assets/into-the-zooniverse1.jpg'
            loading='lazy'
            fit='contain'
            width='100%'
          />
        </Box>
        <Box>
          <Image
            alt={t('AboutPage.highlights.pictures.second')}
            src='https://static.zooniverse.org/fem-assets/into-the-zooniverse2.png'
            loading='lazy'
            fit='contain'
            width='100%'

          />
        </Box>
        <Box>
          <Image
            alt={t('AboutPage.highlights.pictures.third')}
            src='https://static.zooniverse.org/fem-assets/into-the-zooniverse3.jpg'
            loading='lazy'
            fit='contain'
            width='99%' // minor adjustment to align these images top/bottom
          />
        </Box>
      </Box>
      <Relative
        direction='row'
        gap='6px'
        margin={{ bottom: 'medium', top: '8px' }}
        alignContent='center'
      >
        <Text color={{ light: 'black', dark: 'white' }}>
          <Trans
            i18nKey={'AboutPage.highlights.description'}
            t={t}
            components={[
              <Anchor
                key='into-the-zooniverse'
                href='https://www.blurb.com/b/11384070-into-the-zooniverse-vol-iv'
              />
            ]}
          />
        </Text>
        <Tip
          content={<Text>{t('AboutPage.highlights.tip')}</Text>}
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
      </Relative>
    </>
  )
}
