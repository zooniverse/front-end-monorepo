import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getDefaultTalkBoard (project) {
  if (!project) return undefined

  const query = {
    section: `project-${project.id}`,
    subject_default: true
  }

  return talkAPI.get('/boards', query)
    .then(response => response?.body?.boards?.[0])
}
