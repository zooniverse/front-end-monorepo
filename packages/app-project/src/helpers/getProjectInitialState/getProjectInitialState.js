import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import notFoundError from '@helpers/notFoundError'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import fetchLinkedOrganizations from '@helpers/fetchLinkedOrganizations'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchTranslations from '@helpers/fetchTranslations'
import initStore from '@stores'

export default async function getProjectInitialState(locale, params = {}, env = 'production') {
  const store = initStore(true)

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
  const linkedOrganizations = await fetchLinkedOrganizations(project, language, env)
  store.setOrganizations(linkedOrganizations)

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
