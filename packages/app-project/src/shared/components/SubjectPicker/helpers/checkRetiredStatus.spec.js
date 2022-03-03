import nock from 'nock'
import checkRetiredStatus from './checkRetiredStatus'

describe('Components > Subject Picker > helpers > checkRetiredStatus', function () {
  let retirementStatuses

  before(async function () {
    const subject_ids = ['1', '2', '3']
    const t = (key) => key
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
    retirementStatuses = await checkRetiredStatus(subject_ids, t, workflow)
  })

  it('should set the status of unclassified subjects', function () {
    expect(retirementStatuses['1']).to.equal('SubjectPicker.unclassified')
  })

  it('should set the status of seen subjects', function () {
    expect(retirementStatuses['2']).to.equal('SubjectPicker.alreadySeen')
  })

  it('should set the status of retired subjects', function () {
    expect(retirementStatuses['3']).to.equal('SubjectPicker.retired')
  })
})