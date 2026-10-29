import getProjectInitialState from '@helpers/getProjectInitialState'
import fetchWorkflowStatsHelper from './fetchWorkflowStatsHelper'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

/*
  Needed for <HeadContainer />
*/
const host = HOSTS[environment] || 'https://localhost:3000'

export default async function getProjectStatsPageProps({ locale, params }) {
  const env = params.panoptesEnv
  const initialStateResult = await getProjectInitialState(locale, params, env)
  if (initialStateResult.props?.notFound) return initialStateResult.props

  const { initialState } = initialStateResult
  const project = initialState.project
  const language = locale || project.primary_language

  /*
    Fetch the active project workflows and their basic stats.
  */

  const workflowOrder = project.configuration?.workflow_order || []
  const workflows = await fetchWorkflowStatsHelper(
    language,
    project.links.active_workflows,
    env,
    workflowOrder
  )

  /* pageProps */
  const props = {
    host,
    initialState,
    workflows
  }

  return { notFound: false, props }
}
