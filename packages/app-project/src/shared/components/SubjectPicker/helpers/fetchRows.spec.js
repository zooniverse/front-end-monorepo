import nock from 'nock'
import sinon from 'sinon'
import { fetchRows, fetchSubjects } from './'

describe('Components > Subject Picker > helpers > fetchRows', function () {
  let subjects
  const expectedData = [
    { subject_id: 1, Page: '43', Date: '23 January 1916', status: 'Available' },
    { subject_id: 2, Page: '44', Date: '24 January 1916', status: 'Already seen' },
    { subject_id: 3, Page: '45', Date: '25 January 1916', status: 'Retired' },
  ]

  before(async function () {
    const columns = [
      'subject_id',
      'Page',
      'Date'
    ]
    const rows = [
      [1, '43', '23 January 1916'],
      [2, '44', '24 January 1916'],
      [3, '45', '25 January 1916']
    ]
    const workflow = {
      id: '1'
    }
    const subjectsAPI = nock('https://subject-set-search-api.zooniverse.org/subjects')
    .get('/1.json')
    .query(true)
    .reply(200, { columns, rows })
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
    subjects = await fetchSubjects('1')
    const callback = sinon.stub().callsFake(newData => {
      if (typeof newData === 'function') {
        subjects = newData(subjects)
        return subjects
      }
      subjects = newData
      return subjects
    })
    await fetchRows(subjects, workflow, 10, callback)
  })

  it('should generate subject data table rows with classification statuses', function () {
    expect(subjects).to.deep.equal(expectedData)
  })
})