import getProjectInitialState from '@helpers/getProjectInitialState'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

const host = HOSTS[environment] || 'https://localhost:3000'

export default async function getProjectCollectPageProps({ locale, params }) {
  const initialStateResult = await getProjectInitialState(locale, params, params.panoptesEnv)
  if (initialStateResult.notFound) return initialStateResult
  const { initialState } = initialStateResult
  const { strings } = initialState.project
  const loginParam = params?.login ?? null
  const collectionNameParam = params?.collectionName ?? null

  return {
    notFound: false,
    props: {
      host,
      initialState,
      projectDisplayName: strings.display_name,
      loginParam,
      collectionNameParam
    }
  }
}
