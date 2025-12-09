import ProjectsPageContainer from '@/components/ProjectsPageContainer'

const PROD_PANOPTES_HOST = 'https://www.zooniverse.org/api/projects'
const STAGING_PANOPTES_HOST = 'https://panoptes-staging.zooniverse.org/api/projects'

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

// Not using @zooniverse/panoptes-js here in favor of plain `fetch` in combo with Next.js SSR.
async function fetchActiveProjects(searchParams) {
  let panoptesUrl
  if (process.env.NODE_ENV === 'production' || searchParams?.env === 'production') {
    panoptesUrl = new URL(PROD_PANOPTES_HOST)
  } else {
    panoptesUrl = new URL(STAGING_PANOPTES_HOST)
  }

  const params = {
    ...defaultSearchParams,
    ...searchParams
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
      }
    })

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

export default async function ProjectsPage(props) {
  const searchParams = await props.searchParams
  const activeProjects = await fetchActiveProjects(searchParams)

  return <ProjectsPageContainer activeProjects={activeProjects}/>
}
