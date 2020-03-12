import { Factory } from 'rosie'
import SubjectGroup from './SubjectGroup'

describe('Model > SubjectGroup', function () {
  const subjects = Factory.buildList('subject', 25, { locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
  let subjectGroup

  before(function () {
    subjectGroup = SubjectGroup.create({
      id: 'testGroup',
      subjects
    })
  })

  it('should exist', function () {
    expect(subjectGroup).to.be.ok()
  })

  it('should contain subjects', function () {
    expect(subjectGroup.subjects).to.have.lengthOf(25)
  })

  it('should have subject locations', function () {
    subjectGroup.locations.forEach(location => {
      expect(location).to.deep.equal({ 'image/png': 'https://foo.bar/example.png' })
    })
  })
})
