import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectHomePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, req, res })

  return ({ 
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...props
    }
  })
}
