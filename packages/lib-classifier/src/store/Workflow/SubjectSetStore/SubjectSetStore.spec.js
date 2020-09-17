import { SubjectSetFactory } from '@test/factories'
import SubjectSetStore from './SubjectSetStore'

describe('Model > SubjectSetStore', function () {
  let model
  const subjectSet = SubjectSetFactory.build({
    id: '1234',
    display_name: 'Hello there!',
    set_member_subjects_count: 73,
    links: {
      projects: ['12345'],
      workflows: ['12345']
    }
  })

  before(function () {
    model = SubjectSetStore.create({})
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should store subject sets', function () {
    model.setResources([subjectSet])
    model.setActive('1234')
    expect(model.active).to.deep.equal(subjectSet)
  })
})
