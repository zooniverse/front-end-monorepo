import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import { panoptes } from '@zooniverse/panoptes-js'

import fetchLinkedOrganizations from '@helpers/fetchLinkedOrganizations'
import fetchProjectData from '@helpers/fetchProjectData'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import fetchTranslations from '@helpers/fetchTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import initStore from '@stores'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

const host = HOSTS[environment] || 'https://localhost:3000'

export default async function getProjectCollectPageProps({ locale, params, activeTab }) {
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

  /*
    If params.login is defined, then we're viewing a user's
    My Favorites or My Collections, which will require user authentication, 
    so return and let the client request collections data
  */
  const loginParam = params.login
  if (loginParam) {
    return {
      notFound: false,
      props: {
        host,
        initialState,
        activeTab,
        projectDisplayName: strings.display_name,
        projectSlug,
        loginParam
      }
    }
  }

  /*
    If params.login is not defined, then we're viewing the
    general Favorites or Collections page, so we can fetch
    collections data server-side.
  */
  const query = {
    env,
    favorite: activeTab === 'favorites',
    min_subjects: 2,
    page_size: 20,
    project_ids: [projectData.id],
    sort: 'display_name'
  }
  const { headers, host: apiHost } = getServerSideAPIHost(env)
  const response = await panoptes.get('/collections', query, headers, apiHost)

  return {
    notFound: false,
    props: {
      host,
      initialState,
      activeTab,
      projectDisplayName: strings.display_name,
      projectSlug,
      collections: response?.body?.collections ?? []
    }
  }
}
