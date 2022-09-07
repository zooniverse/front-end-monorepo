import { panoptes } from '@zooniverse/panoptes-js'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import notFoundError from '@helpers/notFoundError'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchTranslations from '@helpers/fetchTranslations'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import initStore from '@stores'

export default async function getStaticPageProps({ locale, params }) {
  const isServer = true
  // create a temporary store.
  // we'll take a snapshot of this later, to pass as a page prop.
  const store = initStore(isServer)
  const env = params.panoptesEnv

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

  /*
    project?.defaultWorkflow = project's single active workflow, if applicable,
      NOT a project's default workflow as defined by project.configuration.default_workflow
  */

  const workflowID = params?.workflowID || store?.project?.defaultWorkflow
  /*
     snapshots don't include computed values, like defaultWorkflow,
     which is why when determining workflowID, defaultWorkflow is not determined from the following project snapshot
  */
  const { project } = getSnapshot(store)
  const language = locale || project.primary_language
  const translations = await fetchTranslations({
    translated_id: project.id,
    translated_type: 'project',
    language,
    fallback: project.primary_language,
    env
  })
  const strings = translations?.strings ?? project.strings

  const workflowOrder = project.configuration?.workflow_order || []
  /*
    Validate any workflow URLs against a project's linked workflows
  */
  const workflowExists = project.links.workflows.includes(workflowID)
  if (workflowID && !workflowExists) {
    const { props } = notFoundError(`Workflow ${workflowID} was not found`)
    props.project = project
    props.workflows = []
    return { props }
  }

  /*
    Fetch the active project workflows
  */
  const workflows = await fetchWorkflowsHelper(language, project.links.active_workflows, workflowID, workflowOrder, env)
  const props = {
    project: {
      ...project,
      strings
    },
    workflows
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  return { props }
}
