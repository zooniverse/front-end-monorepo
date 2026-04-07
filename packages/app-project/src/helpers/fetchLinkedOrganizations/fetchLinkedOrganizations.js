import { panoptes } from '@zooniverse/panoptes-js'

import fetchTranslations from '@helpers/fetchTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'

// Fetches Organization Resources (along with their linked avatar data) from
// Panoptes. Called by fetchLinkedOrganizations.
//
// Inputs:
// - organizationIDs: string of organization IDs, e.g. "123" or "123,456,789"
// - env: app environment string, e.g. "production"
//
// Output:
// - Object containing...
// - .organizations: array of Organization objects.
// - .linked: array of linked resources. (Mainly "avatar" data.)
//
// Notes:
// - ⚠️ WARNING: if a Project belongs to large number of Organizations, this
//   function will MISS fetching some of them, due to Panoptes paging limits.
async function fetchOrganizationsData(organizationIDs, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      id: organizationIDs,
      listed: true,
      include: 'avatar'
    }
    const response = await panoptes.get('/organizations', query, { ...headers }, host)
    return {
      organizations: response.body.organizations,
      linked: response.body.linked
    }
  } catch (error) {
    logToSentry(error)
    console.log('Error loading organizations:', error)
    return []
  }
}

// Fetches all Organizations data (plus their avatar data, plus their
// translations) belonging to a Project.
//
// Input:
// - project: project resource.
// - locale: locale string, e.g. "en" or "jp"
// - env: app environment string, e.g. "production"
//
// Output:
// - Array of Organization objects, e.g.:
//   [{
//     id: '17',
//     display_name: 'Galaxy Zoo',
//     description: 'beep boop',
//     slug: 'zookeeper/galaxy-zoo',
//     ...
//     avatar: {
//       src: 'example.jpg'
//       ...
//     },
//     strings: {
//       display_name: 'Galaxy Zoo',
//       description: 'beep boop',
//       ...
//     }
//   }]
// - If Project doesn't belong to any Organizations, returns an empty array,
//   i.e. [].
//
// Notes:
// - If the translations for an Organization isn't available, that
//   Organization's data object will have organization.strings = {}
// - ⚠️ WARNING: if a Project belongs to large number of Organizations, this
//   function will MISS fetching some of them, due to Panoptes paging limits.
async function fetchLinkedOrganizations (project, locale, env) {

  // Fetch Organizations data from Panoptes
  const organizationIDs = Array.isArray(project?.links?.organizations)
    ? project.links.organizations.join(',')
    : project.links.organization
  if (!organizationIDs) return []
  let { organizations, linked } = await fetchOrganizationsData(organizationIDs, env)
  if (!organizations) organizations = []

  // Fetch translations for each organization.
  const translationsFetches = organizations.map(org => {
    return fetchTranslations({
      translated_id: org.id,
      translated_type: 'organization',
      fallback: org?.primary_language,
      language: locale,
      env
    })
  })
  const translations = await Promise.allSettled(translationsFetches)  // Use Promise.allSettled so missing translations don't crash the other valid ones.

  // Add all those avatars and translation data to their Organizations.  
  organizations = organizations.map((org, index) => {
    return {
      ...org,
      avatar: linked?.avatars?.[index] || {},
      strings: translations?.[index]?.value?.strings || {}
    }
  })
  return organizations;
}

export default fetchLinkedOrganizations
