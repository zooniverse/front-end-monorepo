import { ZooFooter } from '@zooniverse/react-components'
import { Box, Image } from 'grommet'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styled from 'styled-components'

import { ZooHeaderWrapper } from '@components'

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
  return {
    props: {
      locale,
      ...translations
    }
  }
}

export default function Error404({ locale = 'en', project404Fragment = '', staticAssetsPrefix = '' }) {
  const randomImage = Math.round(Math.random() * 8) + 1 // 1-9
  const backgroundURL = `${staticAssetsPrefix}/projects/assets/background${randomImage}.png`
  
  return (
    <>
      <ZooHeaderWrapper locale={locale} />
      <ContainerBox
        width="100%"
        height="50vh"
        alignContent="center"
        background="#1e1e1e"
        justify="center"
      >
        <Overlay
          background={`url("${backgroundURL}")`}
          width="100%"
          height="50vh"
          justify="center"
        />
        <PageContent
          height="44px"
          alignContent="center"
          justify="center"
        >
          <Image
            id="404-logo"
            fit="contain"
            height="44px"
            alt="404"
            src={`${staticAssetsPrefix}/projects/assets/logoWhite404.png`}
          />
        </PageContent>
        {project404Fragment}
      </ContainerBox>
      <ZooFooter locale={locale} />
    </>
  )
}
