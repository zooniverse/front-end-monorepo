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

  if (params.owner && params.project) {
    const { owner, project } = params
    const projectSlug = `${owner}/${project}`
    const { env } = query
    await store.project.fetch(projectSlug, { env })
    if (!store.project.id) {
      res.statusCode = 404
      return {
        props: {
          statusCode: 404,
          title: `Project ${owner}/${project} was not found.`
        }
      }
    }
  }

  const { project, ui } = getSnapshot(store)
  const { headers, connection } = req
  const { env } = query
  const language = project.primary_language
  const { active_workflows, default_workflow } = project.links
  const workflows = await fetchWorkflowsHelper(language, active_workflows, default_workflow, env)
  const props = {
    host: generateHostUrl(headers, connection),
    initialState: {
      project,
      ui
    },
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
