import nock from 'nock'
import checkRetiredStatus from './checkRetiredStatus'

describe('Components > Subject Picker > helpers > checkRetiredStatus', function () {
  let retirementStatuses

  before(async function () {
    const subject_ids = ['1', '2', '3']
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
    retirementStatuses = await checkRetiredStatus(subject_ids, workflow)
  })

  it('should set the status of unclassified subjects', function () {
    expect(retirementStatuses['1']).to.equal('Unclassified')
  })

  it('should set the status of classified subjects', function () {
    expect(retirementStatuses['2']).to.equal('In progress')
  })

  it('should set the status of retired subjects', function () {
    expect(retirementStatuses['3']).to.equal('Retired')
  })
})