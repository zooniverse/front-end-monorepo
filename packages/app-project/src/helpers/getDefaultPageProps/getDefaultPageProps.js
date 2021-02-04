import getCookie from '@helpers/getCookie'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import initStore from '@stores'
import { getSnapshot } from 'mobx-state-tree'

export default async function getDefaultPageProps({ params, query, req, res }) {

  // cookie is in the next.js context req object
  const mode = getCookie(req, 'mode') || null
  const dismissedAnnouncementBanner = getCookie(req, 'dismissedAnnouncementBanner') || null
  const snapshot = {
    ui: {
      dismissedAnnouncementBanner,
      mode
    }
  }
  const isServer = true
  const store = initStore(isServer, snapshot)
  const { env, language } = query

  if (params.owner && params.project) {
    const { owner, project } = params
    const projectSlug = `${owner}/${project}`
    await store.project.fetch(projectSlug, { env, language })
  }

  const { project, ui } = getSnapshot(store)
  const { headers, connection } = req
  const { active_workflows, default_workflow } = project.links
  const { primary_language } = project
  const workflowLanguage = language ?? primary_language
  const workflows = await fetchWorkflowsHelper(workflowLanguage, active_workflows, default_workflow, env)
  const props = {
    host: generateHostUrl(headers, connection),
    initialState: {
      project,
      ui
    },
    isServer: true,
    query,
    workflows
  }

  const workflowID = store.project.defaultWorkflow
  if (workflowID) {
    props.workflowID = workflowID
  }

  return { props }
}

function generateHostUrl(headers, connection) {
  const protocol = connection.encrypted ? 'https' : 'http'
  return `${protocol}://${headers.host}`
}
