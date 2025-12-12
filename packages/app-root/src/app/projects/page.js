/* Not using @zooniverse/panoptes-js here in favor of plain `fetch` in combo with Next.js SSR. */

import { Projects } from '@zooniverse/content'

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
  include: 'avatar',
  launch_approved: true,
  page: 1,
  page_size: 20,
  sort: '-launch_date',
  state: 'live'
}

async function fetchActiveProjects(searchParams) {
  let panoptesUrl
  if (
    process.env.NODE_ENV === 'production' ||
    searchParams?.env === 'production'
  ) {
    panoptesUrl = new URL(`${PROD_PANOPTES_HOST}/projects`)
  } else {
    panoptesUrl = new URL(`${STAGING_PANOPTES_HOST}/projects`)
  }

  const params = {
    ...defaultSearchParams,
    ...searchParams // if someone has entered search params in the url, honor those over the defaults
  }

  Object.keys(params).forEach(key => {
    if (key !== 'env') {
      panoptesUrl.searchParams.append(key, params[key])
    }
  })

  try {
    const response = await fetch(`${panoptesUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json; version=1'
      },
      next: { revalidate: 60 } // revalidate at most every 1min
    })

    if (response.ok) {
      const json = await response.json()
      const numProjects = json.meta.projects.count
      return { projects: json.projects, numProjects }
    }

    return []
  } catch (error) {
    console.error(error)
    return error.message
    // Should probably pass an error state to ProjectsPage
  }
}

async function fetchFeaturedProjects(searchParams) {
  let panoptesUrl
  if (
    process.env.NODE_ENV === 'production' ||
    searchParams?.env === 'production'
  ) {
    panoptesUrl = new URL(`${PROD_PANOPTES_HOST}/projects`)
  } else {
    panoptesUrl = new URL(`${STAGING_PANOPTES_HOST}/projects`)
  }

  try {
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
  } catch (error) {
    console.error(error)
    return error.message
    // Should probably pass an error state to ProjectsPage
  }
}

async function fetchOrganizations(searchParams) {
  let panoptesUrl
  if (
    process.env.NODE_ENV === 'production' ||
    searchParams?.env === 'production'
  ) {
    panoptesUrl = new URL(`${PROD_PANOPTES_HOST}/organizations`)
  } else {
    panoptesUrl = new URL(`${STAGING_PANOPTES_HOST}/organizations`)
  }

  try {
    const response = await fetch(
      `${panoptesUrl}?listed=true&include=avatar`,
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
          const avatar = avatars.find(item => item.href === `/organizations/${org.id}/avatar`)
          org.avatar_src = avatar?.src
        })
      }
      return json.organizations
    }

    return []
  } catch (error) {
    console.error(error)
    return error.message
    // Should probably pass an error state to ProjectsPage
  }
}

export default async function ProjectsPage(props) {
  const searchParams = await props.searchParams
  const { projects, numProjects } = await fetchActiveProjects(searchParams)
  const featuredProjects = await fetchFeaturedProjects(searchParams)
  const organizations = await fetchOrganizations(searchParams)

  return (
    <Projects
      featuredProjects={featuredProjects}
      numProjects={numProjects}
      projects={projects}
      organizations={organizations}
    />
  )
}
