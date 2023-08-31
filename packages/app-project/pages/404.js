import { ThemeContext } from 'grommet'
import { ZooHeaderWrapper } from '@components'
import { ZooFooter } from '@zooniverse/react-components'
import { Box, Image, Heading, Text, Paragraph, Anchor } from 'grommet'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import theme404 from './../src/helpers/404theme.js'
import styled from 'styled-components'


const ContainerBox = styled(Box)`
  position: relative;
  color: white;
  background-color: #000;
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
  line-height: 2em;
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
    <ThemeContext.Extend value={theme404}>
      <ZooHeaderWrapper locale={locale} />
      <ContainerBox
        width="100%"
        height="80vh"
        alignContent="center"
        justify="center"
      >
        <Overlay
          background={`url("${backgroundURL}")`}
          width="100%"
          height="80vh"
          justify="center"
        />
        <PageContent
          alignContent="center"
          justify="center"
          textAlign="center"
        >
          <Paragraph textAlign="center" style={{ margin: 0 }}>
            <Image
              id="404-logo"
              fit="contain"
              height="44"
              width="132"
              alt="404"
              src={`/projects/assets/logoWhite404.png`}
            />
          </Paragraph>
          <Heading
            level="1"
            textAlign="center"
            margin={{ top: '20px', bottom: '20px' }}
            style={{ maxWidth: '100%' }}
          >{t('404.heading')}</Heading>
          <Paragraph textAlign="center">
            <Text style={{ fontStyle: 'italic', display: 'block', marginBottom: '30px' }}>{t('404.message')}</Text>
            <Text style={{ display: 'block', marginTop: '30px', marginBottom: '15px' }}>• <Anchor
                id="404-to-project-home"
                color="white"
                weight="bold"
                href={`/`}
                label={t('404.returnHome')}
                style={{ textDecoration: 'underline' }}
              />
            </Text>
            <Text style={{ display: 'block', marginTop: '15px' }}>•&nbsp;
              <Anchor
                id="404-to-project-home"
                color="white"
                weight="bold"
                href={`/projects`}
                label={t('404.findNewProject')}
                style={{ textDecoration: 'underline' }}
              />
            </Text>
          </Paragraph>
        </PageContent>
      </ContainerBox>
      <ZooFooter locale={locale} />
    </ThemeContext.Extend>
  )
}
