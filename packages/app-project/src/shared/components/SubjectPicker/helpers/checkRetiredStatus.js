import { env, panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import { logToSentry } from '@helpers/logger'

export default async function checkRetiredStatus(ids, workflow) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  const workflow_id = workflow.id
  const retirementStatuses = {}
  try {
    const response = await panoptes
      .get('/subjects/selection', {
        env,
        ids,
        workflow_id
      },
    { authorization })
    const { subjects } = response.body
    subjects.forEach(subject => {
      const alreadySeen = subject.already_seen ? 'SubjectPicker.alreadySeen' : 'SubjectPicker.unclassified'
      retirementStatuses[subject.id] = subject.retired ? 'SubjectPicker.retired' : alreadySeen
    })
  } catch (error) {
    console.error(error)
    logToSentry(error)
  }
  return retirementStatuses
}
