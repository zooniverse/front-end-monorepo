import nock from 'nock'
import { fetchStatuses } from './'

describe('Components > Subject Picker > helpers > fetchStatuses', function () {
  let subjects
  const expectedData = [
    { subject_id: 1, page: '43', date: '23 January 1916', status: 'SubjectPicker.unclassified' },
    { subject_id: 2, page: '44', date: '24 January 1916', status: 'SubjectPicker.alreadySeen' },
    { subject_id: 3, page: '45', date: '25 January 1916', status: 'SubjectPicker.retired' },
  ]

  before(async function () {
    const workflow = {
      id: '1'
    }
    const panoptes = nock('https://panoptes-staging.zooniverse.org/api')
    .get('/subjects/selection')
    .query(true)
    .reply(200, {
      subjects: [
        { id: 1, already_seen: false, retired: false },
        { id: 2, already_seen: true, retired: false },
        { id: 3, already_seen: true, retired: true }
      ]
    })
    const panoptesSubjects = [
      {
        subject_id: 1,
        page: '43',
        date: '23 January 1916',
        status: 'loading'
      },
      {
        subject_id: 2,
        page: '44',
        date: '24 January 1916',
        status: 'loading'
      },
      {
        subject_id: 3,
        page: '45',
        date: '25 January 1916',
        status: 'loading'
      }
    ]
    
    subjects = await fetchStatuses(panoptesSubjects, workflow)
  })

  it('should generate subject data table rows with classification statuses', function () {
    expect(subjects).to.deep.equal(expectedData)
  })
})