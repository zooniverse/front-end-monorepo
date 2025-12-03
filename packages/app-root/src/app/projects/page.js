import ProjectsPageContainer from '@/components/ProjectsPageContainer'

const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org/api/projects'
    : 'https://panoptes-staging.zooniverse.org/api/projects'

const params = {
  cards: true,
  include: 'avatar',
  launch_approved: true,
  page: 1,
  page_size: 20,
  sort: '-launch_date',
  state: 'live'
}

// Get the first page of active projects. This is the default state of the filters on page load.
// Not using @zooniverse/panoptes-js here in favor of plain `fetch` in combo with Next.js SSR.
async function fetchActiveProjects() {
  const panoptesUrl = new URL(PANOPTES_HOST)

  Object.keys(params).forEach(key => {
    panoptesUrl.searchParams.append(key, params[key])
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

export default async function ProjectsPage() {
  const activeProjects = await fetchActiveProjects()

  return <ProjectsPageContainer activeProjects={activeProjects}/>
}
