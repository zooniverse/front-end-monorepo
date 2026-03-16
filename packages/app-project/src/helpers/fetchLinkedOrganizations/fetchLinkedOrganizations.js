import { panoptes } from '@zooniverse/panoptes-js'

import fetchTranslations from '@helpers/fetchTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'

async function fetchOrganizationData(organizationIDs, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      id: organizationIDs,
      listed: true
    }
    const response = await panoptes.get('/organizations', query, { ...headers }, host)
    return response.body.organizations
  } catch (error) {
    logToSentry(error)
    console.log('Error loading organizations:', error)
    return []
  }
}

async function fetchLinkedOrganizations (project, locale, env) {

  const organizationIDs = Array.isArray(project?.links?.organizations)
    ? project.links.organizations.join(',')
    : project.links.organization

  if (!organizationIDs) return []

  let organizations = await fetchOrganizationData(organizationIDs, env)

  const translationsFetches = organizations.map(org => {
    return fetchTranslations({
      translated_id: org.id,
      translated_type: 'organization',
      fallback: org?.primary_language,
      language: locale,
      env
    })
  })
  const translations = await Promise.allSettled(translationsFetches)

  organizations = organizations.map((org, index) => {
    return {
      ...org,
      strings: translations?.[index]?.value?.strings || {}
    }
  })

  console.log('+++ translations', translations)
  console.log('+++ organizations: ', organizations)
  return organizations;
}

export default fetchLinkedOrganizations
