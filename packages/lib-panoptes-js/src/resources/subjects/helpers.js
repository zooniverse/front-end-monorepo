const endpoint = '/subjects'
const queuedEndpoint = '/subjects/queued'

function getRandomID (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
}

function buildQueuedSubjectResource () {
  const randomId = getRandomID(1, 100)

  return {
    already_seen: false,
    created_at: '2018-01-23T15:22:55.810Z',
    favorite: false,
    finished_workflow: false,
    href: `/subjects/${randomId}`,
    id: `${randomId}`,
    locations: [{
      'image/jpeg': 'https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
    }],
    metadata: {},
    retired: false,
    selection_state: 'normal',
    updated_at: '2018-01-23T15:22:55.810Z',
    user_has_finished_workflow: false,
    zooniverse_id: null
  }
}

function buildSubjectQueue () {
  const times = 10
  const subjectQueue = []
  for (var i = 0; i < times; i++) {
    const subject = buildQueuedSubjectResource()
    subjectQueue.push(subject)
  }

  return subjectQueue
}

module.exports = {
  buildQueuedSubjectResource,
  buildSubjectQueue,
  endpoint,
  queuedEndpoint
}
