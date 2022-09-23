import { Factory } from 'rosie'
import SubjectGroup from './SubjectGroup'

describe('Model > SubjectGroup', function () {
  let subjectGroup

  before(function () {
    subjectGroup = SubjectGroup.create({
      id: 'testGroup',
      locations: [
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
      ],
      metadata: {
        '#group_subject_ids': '1111-1112-1113-1114',
        '#subject_group_id': 101,
      }
    })
  })

  it('should exist', function () {
    expect(subjectGroup).to.be.ok()
  })

  it('should contain locations', function () {
    expect(subjectGroup.locations).to.have.lengthOf(4)
  })
  
  it('should contain subjects IDs', function () {
    expect(subjectGroup.subjectIds).to.have.lengthOf(4)
  })
})
