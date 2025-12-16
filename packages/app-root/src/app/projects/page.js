/* Not using @zooniverse/panoptes-js here in favor of plain `fetch` in combo with Next.js SSR. */

import ProjectsContainer from './ProjectsContainer'

const PROD_PANOPTES_HOST = 'https://www.zooniverse.org/api'
const STAGING_PANOPTES_HOST = 'https://panoptes-staging.zooniverse.org/api'

export const metadata = {
  title: 'Projects',
  description: 'Zooniverse Projects',
  alternates: {
    canonical: '/projects' // tell SEO to index this page without any query params
  }
}

// Get the first page of active projects. This is the default state of the filters on page load.
const defaultSearchParams = {
  cards: true,
  launch_approved: true,
  page: 1,
  page_size: 20,
  sort: '-launch_date',
  state: 'live'
}

async function fetchActiveProjects(searchParams) {
  let host

  if (searchParams?.env) {
    host =
      searchParams.env === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  } else {
    host =
      process.env.NODE_ENV === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  }
  const panoptesUrl = new URL(`${host}/projects`)

  // if someone has entered search params in the url, honor those over the defaults
  const params = {
    ...defaultSearchParams,
    ...searchParams
  }

  /*
    Some modifications needed to certain keys due to UI defaults:
    There are legacy links with searchParams ?discipline, but panoptes expects `tags` as the param.
    The default `state` is `live`, but if searchParams.state === 'all', then panoptes query should be `state: undefined`.
    Querying with `languages: en` will not return all projects from panoptes, but we do want all projects results so the `languages` param is set to `undefined`.
  */
  Object.keys(params).forEach(key => {
    if (key === 'state' && params[key] === 'all') {
      params.state = undefined
    } else if (key === 'languages' && params[key] === 'en') {
      params.languages = undefined
    }
  })

  Object.keys(params).forEach(key => {
    if (key === 'discipline') {
      if (params[key] === 'space') {
        panoptesUrl.searchParams.append('tags', 'astronomy')
      } else {
        panoptesUrl.searchParams.append('tags', params[key])
      }
    } else if (key !== 'env' && params[key]) {
      panoptesUrl.searchParams.append(key, params[key])
    }
  })

  const response = await fetch(`${panoptesUrl}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.api+json; version=1'
    }
    // next: { revalidate: 60 } // fetch responses are not cached by default in Next 15. We can adjust this config if it makes a difference to our devOps services
  })

  if (response.ok) {
    const json = await response.json()
    const numProjects = json.meta.projects.count
    return { projects: json.projects, numProjects }
  }

  return []
}

async function fetchFeaturedProjects(searchParams) {
  let host

  if (searchParams?.env) {
    host =
      searchParams.env === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  } else {
    host =
      process.env.NODE_ENV === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  }
  const panoptesUrl = new URL(`${host}/projects`)

  const response = await fetch(
    `${panoptesUrl}?featured=true&launch_approved=true&cards=true`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json; version=1'
      },
      next: { revalidate: 60 } // revalidate at most every 1min
    }
  )

  if (response.ok) {
    const json = await response.json()
    return json.projects
  }

  return []
}

async function fetchOrganizations(searchParams) {
  let host

  if (searchParams?.env) {
    host =
      searchParams.env === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  } else {
    host =
      process.env.NODE_ENV === 'production'
        ? PROD_PANOPTES_HOST
        : STAGING_PANOPTES_HOST
  }
  const panoptesUrl = new URL(`${host}/organizations`)

  const response = await fetch(
    `${panoptesUrl}?listed=true&include=avatar&page_size=100`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json; version=1'
      },
      next: { revalidate: 60 } // revalidate at most every 1min
    }
  )

  if (response.ok) {
    const json = await response.json()
    // Manual attaching of avatars can be replaced if panoptes if updated with a ?card=true query params for the /organizations endpoint
    const avatars = json?.linked?.avatars
    if (json.organizations.length > 0) {
      json.organizations.forEach(org => {
        const avatar = avatars.find(
          item => item.href === `/organizations/${org.id}/avatar`
        )
        org.avatar_src = avatar?.src
      })
    }
    return json.organizations
  }

  return []
}

export default async function ProjectsPage(props) {
  const searchParams = await props.searchParams
  const { projects, numProjects } = await fetchActiveProjects(searchParams)
  const featuredProjects = await fetchFeaturedProjects(searchParams)
  const organizations = await fetchOrganizations(searchParams)

  return (
    <ProjectsContainer
      featuredProjects={featuredProjects}
      numProjects={numProjects}
      projects={projects}
      organizations={organizations}
    />
  )
}
