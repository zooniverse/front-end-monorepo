import notFoundError from '@helpers/notFoundError'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import initStore from '@stores'
import { getSnapshot } from 'mobx-state-tree'

export default async function getStaticPageProps({ params, query }) {
  const isServer = true
  const store = initStore(isServer)
  const { env } = query

  /*
    Fetch the project
  */
  if (params.owner && params.project) {
    const { owner, project } = params
    const projectSlug = `${owner}/${project}`
    await store.project.fetch(projectSlug, { env })
    if (!store.project.id) {
      return notFoundError(`Project ${owner}/${project} was not found`)
    }
  }

  /*
    Validate any workflow URLs
  */
  const { project } = getSnapshot(store)
  const language = project.primary_language
  const { active_workflows, default_workflow } = project.links
  const workflowExists = active_workflows.includes(params.workflowID)
  if (params.workflowID && !workflowExists) {
    return notFoundError(`Workflow ${params.workflowID} was not found`)
  }

  /*
    Fetch the active project workflows
  */
  const workflows = await fetchWorkflowsHelper(language, active_workflows, default_workflow, env)
  const props = {
    project,
    isServer,
    workflows
  }

  const workflowID = store.project.defaultWorkflow
  if (workflowID) {
    props.workflowID = workflowID
  }

  return { props }
}
