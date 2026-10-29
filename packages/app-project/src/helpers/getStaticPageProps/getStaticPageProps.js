import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import notFoundError from '@helpers/notFoundError'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import fetchLinkedOrganizations from '@helpers/fetchLinkedOrganizations'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchSubject from '@helpers/fetchSubject'
import fetchTranslations from '@helpers/fetchTranslations'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import initStore from '@stores'

async function getInitialState(locale = 'en', params = {}, env = 'production') {
   const isServer = true
   // create a temporary store.
   // we'll take a snapshot of this later, to pass as a page prop (initialState).
   const store = initStore(isServer)
 
   /*
     Fetch the project
   */
   if (params.owner && params.project) {
     const projectSlug = `${params.owner}/${params.project}`
     const project = await fetchProjectData(projectSlug, { env })
     if (!project.id) {
       return notFoundError(`Project ${params.owner}/${params.project} was not found`)
     }
     project.about_pages = await fetchProjectPageTitles(project, params.panoptesEnv)
 
     applySnapshot(store.project, project)
   }
 
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
 
   /*
     Fetch the organizations linked to the project
   */
   const linkedOrganizations = await fetchLinkedOrganizations(project, locale, env)
   store.setOrganizations(linkedOrganizations)
 
   /*
     snapshot for store hydration in the browser
   */
   const initialState = {
     project: {
       ...project,
       strings
     },
     organizations: getSnapshot(store.organizations)
   }

   return {
      // State snapshot of fetched project and organisations.
      initialState,
      // Live MST store instance, with computed views, actions etc.
      store
   }
 }

export default async function getStaticPageProps({ locale = 'en', params = {} }) {
  const env = params.panoptesEnv // API environment (NOT deployment environment.)
  const initialStateResult = await getInitialState(locale, params, env)
  if (initialStateResult.props?.notFound) return initialStateResult

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
    const { props } = notFoundError(`Workflow ${workflowID} was not found`)
    props.project = project
    props.workflows = []
    return { props }
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
