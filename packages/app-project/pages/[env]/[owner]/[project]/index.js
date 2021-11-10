import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectHomePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })

  return ({ 
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...props
    }
  })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
