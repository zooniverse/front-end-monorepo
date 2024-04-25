import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export { default } from '../src/screens/FAQ/FAQ.js'

export async function getStaticProps({ locale }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['components']))
      }
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
