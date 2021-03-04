import { get } from 'lodash'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'

export default async function fetchProjectData(slug, params) {
  const projectData = {
    loadingState: asyncStates.loading
  }
  try {
    const query = { ...params, slug }
    const response = await projects.getWithLinkedResources({ query })
    const project = response.body.projects[0]
    if (!project) throw new Error(`${slug} could not be found`)

    const linked = response.body.linked

    projectData.avatar = get(linked, 'avatars[0]', {})
    projectData.background = get(linked, 'backgrounds[0]', {})
    projectData.owners = get(linked, 'owners', [])

    const properties = [
      'beta_approved',
      'beta_requested',
      'classifications_count',
      'classifiers_count',
      'completeness',
      'configuration',
      'description',
      'display_name',
      'experimental_tools',
      'id',
      'introduction',
      'launch_approved',
      'links',
      'live',
      'researcher_quote',
      'retired_subjects_count',
      'slug',
      'subjects_count',
      'urls',
      'workflow_description'
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