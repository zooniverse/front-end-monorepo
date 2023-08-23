import { ZooHeaderWrapper } from '@components'
import { ZooFooter } from '@zooniverse/react-components'
import { Box, Image, Heading, Text, Paragraph, Anchor } from 'grommet'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'


const ContainerBox = styled(Box)`
  position: relative;
  color: white;
  z-index: 1;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  z-index: 2;
`

const PageContent = styled(Box)`
  z-index: 3;
`

export async function getStaticProps({ locale }) {
  const translations = await serverSideTranslations(locale, ['components', 'screens'])
  const randomImage = Math.round(Math.random() * 8) + 1 // 1-9
  return {
    props: {
      locale,
      randomImage,
      ...translations
    },
    revalidate: 5
  }
}

export default function Error404({
  locale = 'en',
  randomImage = 1
}) {
  const backgroundURL = `/projects/assets/background${randomImage}.jpg`
  const { t } = useTranslation('components')

  return (
    <>
      <ZooHeaderWrapper locale={locale} />
      <ContainerBox
        width="100%"
        height="50vh"
        alignContent="center"
        background="#1e1e1e"
        justify="center"
        style={{ backgroundColor: '#000' }}
      >
        <Overlay
          background={`url("${backgroundURL}")`}
          width="100%"
          height="50vh"
          justify="center"
          style={{ opacity: '50%' }}
        />

        <PageContent
          height="44px"
          alignContent="center"
          justify="center"
          textAlign="center"
        >
          <Paragraph textAlign="center" style={{ lineHeight: '2em' }}>
            <Image
              id="404-logo"
              fit="contain"
              height="44px"
              alt="404"
              src={`/projects/assets/logoWhite404.png`}
            />
            <Heading level="2" textAlign="center" style={{ maxWidth: '100%' }}>{t('404.heading')}</Heading>
            {t('404.message')}
            <br />
            <Anchor
              id="404-to-project-home"
              color="white"
              weight="bold"
              href={`/`}
              label={t('404.returnHome')}
            />
            <br />
            {t('404.or')}
            <br />
            <Anchor
              id="404-to-project-home"
              color="white"
              weight="bold"
              href={`/projects`}
              label={t('404.findNewProject')}
            />
          </Paragraph>
        </PageContent>
      </ContainerBox>
      <ZooFooter locale={locale} />
    </>
  )
}
