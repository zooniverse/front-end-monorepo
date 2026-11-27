import getProjectInitialState from '@helpers/getProjectInitialState'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

/*
  Needed for <HeadContainer />
*/
const host = HOSTS[environment] || 'https://localhost:3000'

export default async function getProjectRecentsPageProps({ locale, params }) {
  const initialStateResult = await getProjectInitialState(locale, params, params.panoptesEnv)
  if (initialStateResult.notFound) return initialStateResult

  const { initialState } = initialStateResult

  /* pageProps */
  const props = {
    host,
    initialState
  }

  return { notFound: false, props }
}
