import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectSubjectPage'

export async function getStaticProps({ locale, params }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ locale, params })

  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...defaultProps,
      subjectID: params.subjectID,
    },
    revalidate: 60
  })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
