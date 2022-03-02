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

  /*
    workflowID is defined:
      1. per URL param, or if no URL param...
      2. as a project's single active workflow,
        or if multiple active workflows,
        or if no active workflows...
      3. as undefined
  */
  const workflowID = params?.workflowID || store?.project?.defaultWorkflow
  /*
     snapshots don't include computed values, like defaultWorkflow,
     which is why when determining workflowID, defaultWorkflow is not determined from the following project snapshot
  */
  const { project } = getSnapshot(store)
  const language = project.primary_language
  const { active_workflows } = project.links

  const workflowOrder = project.configuration?.workflow_order || []
  /*
    Validate any workflow URLs
  */
  const workflowExists = active_workflows.includes(workflowID)
  if (workflowID && !workflowExists) {
    const { props } = notFoundError(`Workflow ${workflowID} was not found`)
    props.project = project
    props.workflows = []
    return { props }
  }

  /*
    Fetch the active project workflows
  */
  const workflows = await fetchWorkflowsHelper(language, active_workflows, workflowID, workflowOrder, env)
  const props = {
    project,
    workflows
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  return { props }
}
