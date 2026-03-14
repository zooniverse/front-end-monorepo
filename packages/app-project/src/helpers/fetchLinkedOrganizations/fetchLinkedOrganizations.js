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

  console.log('+++ organizationIDs: ', organizationIDs)

  if (!organizationIDs) return []

  const organizations = fetchOrganizationData(organizationIDs, env)

  // TODO: add translation strings

  return organizations;

  /*
  const organization = await fetchOrganizationData(organizationID, env)
  if (!organization) return null

  const translation = await fetchTranslations({
    translated_id: organizationID,
    translated_type: 'organization',
    fallback: organization?.primary_language,
    language: locale,
    env
  })

  return {
    ...organization,
    strings: translation?.strings || null
  }
  */
}

export default fetchLinkedOrganizations
