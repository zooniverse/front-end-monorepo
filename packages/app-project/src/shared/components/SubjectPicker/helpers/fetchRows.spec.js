import nock from 'nock'
import fetchRows from './fetchRows'

describe('Components > Subject Picker > helpers > fetchRows', function () {
  let data
  const expectedData = [
    { subject_id: '1', Page: '43', Date: '23 January 1916', status: 'Available' },
    { subject_id: '2', Page: '44', Date: '24 January 1916', status: 'Already seen' },
    { subject_id: '3', Page: '45', Date: '25 January 1916', status: 'Retired' },
  ]

  before(async function () {
    const columns = [
      'subject_id',
      'Page',
      'Date'
    ]
    const rows = [
      ['1', '43', '23 January 1916'],
      ['2', '44', '24 January 1916'],
      ['3', '45', '25 January 1916']
    ]
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
    data = await fetchRows({ columns, rows }, workflow)
  })

  it('should generate subject data table rows with classification statuses', function () {
    expect(data).to.deep.equal(expectedData)
  })
})