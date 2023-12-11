import { Anchor, Heading, Paragraph } from 'grommet'
import { Trans, useTranslation } from 'next-i18next'
import Link from 'next/link'

function LinkInParagraph({ children, href }) {
  return (
    <Anchor as={Link} href={href}>
      {children}
    </Anchor>
  )
}

export default function OurMission() {
  const { t } = useTranslation()
  return (
    <>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.one'
          t={t}
          components={[<LinkInParagraph href='/publications' />]} // after switch to app-root, this will need to be /about/publications
        />
      </Paragraph>
      <Heading level={3} size='1rem' textAlign='start' margin='0'>
        {t('AboutPage.ourMission.subheadings.two')}
      </Heading>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.two'
          t={t}
          components={[
            <LinkInParagraph href='https://www.zooniverse.org/projects' /> // hardcoded while /projects exists in a separate app
          ]}
        />
      </Paragraph>
      <Heading level={3} size='1rem' margin='0'>
        {t('AboutPage.ourMission.subheadings.three')}
      </Heading>
      <Paragraph margin={{ vertical: '20px' }}>
        <Trans
          i18nKey='AboutPage.ourMission.paragraphs.three'
          t={t}
          components={[
            <LinkInParagraph href='https://en.wikipedia.org/wiki/Wisdom_of_the_crowd' />
          ]}
        />
      </Paragraph>
      <Paragraph margin={{ top: '0', bottom:'30px' }}>
      <Trans
          i18nKey='AboutPage.ourMission.paragraphs.four'
          t={t}
          components={[
            <LinkInParagraph href='https://www.zooniverse.org/talk' /> // hardcoded while /talk exists in a separate app
          ]}
        />
      </Paragraph>
    </>
  )
}
