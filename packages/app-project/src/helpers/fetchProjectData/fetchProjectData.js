import { get } from 'lodash'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'

export default async function fetchProjectData(slug, params, host) {
  const projectData = {
    loadingState: asyncStates.loading
  }
  try {
    const query = { ...params, slug }
    const response = await projects.getWithLinkedResources({ query }, host)
    const project = response.body.projects[0]
    if (!project) throw new Error(`${slug} could not be found`)

    const linked = response.body.linked

    projectData.avatar = get(linked, 'avatars[0]', {})
    projectData.background = get(linked, 'backgrounds[0]', {})
    projectData.owners = get(linked, 'owners', [])
    const about_pages = get(linked, 'project_pages', [])

    projectData.strings = {
      description: project.description,
      display_name: project.display_name,
      introduction: project.introduction,
      researcher_quote: project.researcher_quote,
      title: project.title,
      workflow_description: project.workflow_description
    }

    /* Only the page titles and URL keys are needed
    to build the navigation menu */
    projectData.about_pages = about_pages.map(page =>{
      if (page.content?.length) {
        return ({
          id: page.id,
          title: page.title,
          url_key: page.url_key
        })
      }
    }).filter(Boolean)

    const properties = [
      'beta_approved',
      'beta_requested',
      'classifications_count',
      'classifiers_count',
      'completeness',
      'configuration',
      'experimental_tools',
      'id',
      'launch_approved',
      'links',
      'live',
      'primary_language',
      'retired_subjects_count',
      'slug',
      'subjects_count',
      'urls'
    ]
    properties.forEach(property => {
      try {
        projectData[property] = project[property] ?? undefined
      } catch (error) {
        console.error(`project.${property} is invalid`, error)
      }
    })

    projectData.loadingState = asyncStates.success
  } catch (error) {
    console.error('Error loading project:', error)
    projectData.error = error
    projectData.loadingState = asyncStates.error
  }
  return projectData
}