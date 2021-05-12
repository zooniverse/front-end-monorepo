import nock from 'nock'
import fetchRows from './fetchRows'

describe('Components > Subject Picker > helpers > fetchRows', function () {
  let data
  const expectedData = [
    { subject_id: '1', Page: '43', Date: '23 January 1916', status: 'Unclassified' },
    { subject_id: '2', Page: '44', Date: '24 January 1916', status: 'In progress' },
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
    .get('/subject_workflow_statuses')
    .query(true)
    .reply(200, {
      subject_workflow_statuses: [
        { classifications_count: 0, retired_at: null, links: { subject: '1' }},
        { classifications_count: 3, retired_at: null, links: { subject: '2' }},
        { classifications_count: 5, retired_at: "2018-01-30T21:09:49.396Z", links: { subject: '3' }}
      ]
    })
    data = await fetchRows({ columns, rows }, workflow)
  })

  it('should generate subject data table rows with classification statuses', function () {
    expect(data).to.deep.equal(expectedData)
  })
})