import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import notFoundError from '@helpers/notFoundError'
import fetchLinkedOrganizations from '@helpers/fetchLinkedOrganizations'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchTranslations from '@helpers/fetchTranslations'
import fetchWorkflowStatsHelper from './fetchWorkflowStatsHelper'
import initStore from '@stores'

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
  /*
    Create a temporary store. We'll take a snapshot of this later, to pass as a page prop.
  */
  const isServer = true
  const store = initStore(isServer)
  const env = params.panoptesEnv

  /*
    Fetch the project and apply a snapshot to the store.
    ProjectHeader looks for a defaultWorkflow so we must hydrate the store
    with a
  */
  if (params.owner && params.project) {
    const projectSlug = `${params.owner}/${params.project}`
    const project = await fetchProjectData(projectSlug, { env })

    // If no project id matched, return "props" from notFoundError() which triggers a 404.
    if (!project.id) {
      const { props } = notFoundError(
        `Project ${params.owner}/${params.project} was not found`
      )
      return props
    }

    applySnapshot(store.project, project)
  }

  /*
    Get translation strings for the project title and workflow display names.
    The strings are accessed from the Project store in the UI components.
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

  const projectData = {
    project: {
      ...project,
      strings
    }
  }

  /*
    Fetch the active project workflows and their basic stats.
  */
  const workflows = await fetchWorkflowStatsHelper(
    language,
    project.links.active_workflows,
    env
  )

  /*
    Fetch the organizations linked to the project
    and apply a snapshot to the store (this is displayed in ProjectHeader)
  */
  const linkedOrganizations = await fetchLinkedOrganizations(
    project,
    language,
    env
  )
  applySnapshot(store.organizations, linkedOrganizations)

  /*
    Snapshot for store hydration in the browser via _app.jsx
  */
  const initialState = {
    ...projectData,
    organizations: linkedOrganizations
  }

  /* pageProps */
  const props = {
    host,
    initialState,
    workflows
  }

  return { notFound: false, props }
}
