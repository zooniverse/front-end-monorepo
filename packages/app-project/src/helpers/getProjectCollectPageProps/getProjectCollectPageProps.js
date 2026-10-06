import { applySnapshot, getSnapshot } from 'mobx-state-tree'

import fetchLinkedOrganizations from '@helpers/fetchLinkedOrganizations'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import fetchTranslations from '@helpers/fetchTranslations'
import initStore from '@stores'
import {
  COLLECTIONS_PAGE_SIZE,
  normalizeCollectionMinSubjects,
  normalizeCollectionSort
} from '@helpers/collectionQueryParams'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

const host = HOSTS[environment] || 'https://localhost:3000'
export default async function getProjectCollectPageProps({
  locale,
  params,
  activeTab,
  searchParams = {}
}) {
  const parsedPage = Number(searchParams.page)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const minSubjects = normalizeCollectionMinSubjects(searchParams.min_subjects)
  const sort = normalizeCollectionSort(searchParams.sort)
  const isServer = true
  const store = initStore(isServer)
  const env = params.panoptesEnv
  const { owner, project } = params

  if (owner && project) {
    const projectData = await fetchProjectData(`${owner}/${project}`, { env })

    if (!projectData.id) {
      return {
        notFound: true,
        props: {}
      }
    }

    projectData.about_pages = await fetchProjectPageTitles(projectData, env)
    applySnapshot(store.project, projectData)
  }

  const { project: projectData } = getSnapshot(store)
  const projectSlug = projectData.slug
  const language = locale || projectData.primary_language
  const translations = await fetchTranslations({
    translated_id: projectData.id,
    translated_type: 'project',
    language,
    fallback: projectData.primary_language,
    env
  })
  const strings = translations?.strings ?? projectData.strings
  const linkedOrganizations = await fetchLinkedOrganizations(projectData, language, env)
  applySnapshot(store.organizations, linkedOrganizations)

  const initialState = {
    project: {
      ...projectData,
      strings
    },
    organizations: linkedOrganizations
  }

  const loginParam = params?.login ?? null

  return {
    notFound: false,
    props: {
      host,
      initialState,
      activeTab,
      projectDisplayName: strings.display_name,
      projectSlug,
      loginParam,
      initialPage: page,
      initialMinSubjects: minSubjects,
      initialSort: sort
    }
  }
}
