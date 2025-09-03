import { panoptes } from '@zooniverse/panoptes-js'

import fetchTranslations from '@helpers/fetchTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'

async function fetchOrganizationData(organizationID, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      id: organizationID,
      listed: true
    }
    const response = await panoptes.get('/organizations', query, { ...headers }, host)
    const [ organization ] = response.body.organizations
    return organization
  } catch (error) {
    logToSentry(error)
    console.log('Error loading organization:', error)
    return null
  }
}

async function fetchOrganization(organizationID, locale, env) {
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
}

export default fetchOrganization
