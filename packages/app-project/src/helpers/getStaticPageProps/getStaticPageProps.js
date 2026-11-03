import notFoundError from '@helpers/notFoundError'
import fetchSubject from '@helpers/fetchSubject'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import getProjectInitialState from '@helpers/getProjectInitialState'

export default async function getStaticPageProps({ locale = 'en', params = {} }) {
  const env = params.panoptesEnv // API environment (NOT deployment environment.)
  const initialStateResult = await getProjectInitialState(locale, params, env)
  if (initialStateResult.notFound) return initialStateResult

  const { initialState, store } = initialStateResult
  const project = initialState.project
  const language = locale || project.primary_language
  const defaultWorkflow = store.project.defaultWorkflow
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

  const workflowID = params.workflowID || defaultWorkflow
  /*
     snapshots don't include computed values, like defaultWorkflow,
     which is why when determining workflowID, defaultWorkflow is not determined from the project snapshot.
  */

  const workflowOrder = project.configuration?.workflow_order || []
  /*
    Validate any workflow URLs against a project's linked workflows.
  */
  const workflowExists = project.links.workflows.includes(workflowID)
  if (workflowID && !workflowExists) {
    const response = notFoundError(`Workflow ${workflowID} was not found`)
    const { props } = response
    props.project = project
    props.workflows = []
    return response
  }

  /*
    Fetch the active project workflows.
  */
  const workflows = await fetchWorkflowsHelper(language, project.links.active_workflows, workflowID, workflowOrder, env)

  const props = {
    initialState,
    workflows
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  /*
    Fetch the subject.
  */
  if (!params.workflowID && params.subjectID) {
    const subject = await fetchSubject(params.subjectID, env)
    if (!subject) {
      return notFoundError(`Subject ${params.subjectID} was not found`)
    }
    props.subject = subject
  }

  return { props }
}
