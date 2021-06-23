import notFoundError from '@helpers/notFoundError'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import initStore from '@stores'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'

export default async function getStaticPageProps({ params, query }) {
  const isServer = true
  // create a temporary store.
  // we'll take a snapshot of this later, to pass as a page prop.
  const store = initStore(isServer)
  const { env } = query

  /*
    Fetch the project
  */
  if (params.owner && params.project) {
    const projectSlug = `${params.owner}/${params.project}`
    const project = await fetchProjectData(projectSlug, { env })
    applySnapshot(store.project, project)
    if (!store.project.id) {
      return notFoundError(`Project ${params.owner}/${params.project} was not found`)
    }
  }

  // snapshots don't include computed values, so cache the default workflow ID.
  const workflowID = store.project.defaultWorkflow
  const { project } = getSnapshot(store)
  const language = project.primary_language
  const { active_workflows, default_workflow } = project.links
  const workflowOrder = project.configuration.workflow_order || []
  /*
    Validate any workflow URLs
  */
  const workflowExists = active_workflows.includes(params.workflowID)
  if (params.workflowID && !workflowExists) {
    return notFoundError(`Workflow ${params.workflowID} was not found`)
  }

  /*
    Fetch the active project workflows
  */
  const workflows = await fetchWorkflowsHelper(language, active_workflows, default_workflow, workflowOrder, env)
  const props = {
    project,
    workflows
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  return { props }
}
