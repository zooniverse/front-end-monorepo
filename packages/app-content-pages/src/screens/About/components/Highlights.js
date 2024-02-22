import { Anchor, Box, Heading, Image, Paragraph, Text, Tip } from 'grommet'
import { Trans, useTranslation } from 'next-i18next'
import { CircleInformation } from 'grommet-icons'

export default function Highlights() {
  const { t } = useTranslation()

  return (
    <>
      <Heading
        level={3}
        size='1.5rem'
        alignSelf='center'
        weight='normal'
        margin='0'
        textAlign='center'
      >
        {t('AboutPage.highlights.subheading')}
      </Heading>
      <Paragraph>
        <Trans
          i18nKey={'AboutPage.highlights.paragraphs.one'}
          t={t}
          components={[
            <Anchor
              key='publications-page'
              href='/publications' // after switch to app-root, this will need to be /about/publications
            />
          ]}
        />
      </Paragraph>
      <Paragraph margin='0'>
        {t('AboutPage.highlights.paragraphs.two')}
      </Paragraph>
      <Box
        justify='center'
        gap='xsmall'
        margin={{ top: '30px' }}
        direction='row'
      >
        <Image
          alt=''
          src='/about/assets/into-the-zooniverse1.jpg'
          fit='contain'
        />
        <Image
          alt=''
          src='/about/assets/into-the-zooniverse2.png'
          fit='contain'
        />
        <Image
          alt=''
          src='/about/assets/into-the-zooniverse3.jpg'
          fit='contain'
        />
      </Box>
      <Box direction='row' gap='6px' margin={{ bottom: 'medium', top: '8px' }} alignContent='center'>
        <Text>
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
            align: { left: 'right' },
            background: 'dark-4',
            round: '5px',
            pad: '5px'
          }}
        >
          <CircleInformation size='1rem' />
        </Tip>
      </Box>
    </>
  )
}
