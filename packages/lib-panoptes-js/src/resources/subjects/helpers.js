const endpoint = '/subjects'
const queuedEndpoint = '/subjects/queued'

function getRandomID (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
}

function buildQueuedSubjectResource () {
  const randomId = getRandomID(0, 100)

  return {
    already_seen: false,
    created_at: '2018-01-23T15:22:55.810Z',
    favorite: false,
    finished_workflow: false,
    href: `/subjects/${randomId}`,
    id:  `${randomId}`,
    locations: [{
      'image/jpeg': 'https://placekitten.com/408/287'
    }],
    metadata: {},
    retired: false,
    selection_state: 'normal',
    updated_at: '2018-01-23T15:22:55.810Z',
    user_has_finished_workflow: false,
    zooniverse_id: null
  }
}

function buildSubjectsQueue () {
  const times = 10
  const subjectsQueue = []
  for (var i = 0; i < times; i++) {
    const subject = buildQueuedSubjectResource()
    subjectsQueue.push(subject)
  }

  return subjectsQueue
}

module.exports = { buildQueuedSubjectResource, buildSubjectsQueue, endpoint, queuedEndpoint }