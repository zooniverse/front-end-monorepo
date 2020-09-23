import SubjectSet from './SubjectSet'

describe('Model > SubjectSet', function () {
  let model

  before(function () {
    model = SubjectSet.create({
      id: '1234',
      display_name: 'Hello there!',
      set_member_subjects_count: 19
    })
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have a display name', function () {
    expect(model.display_name).to.equal('Hello there!')
  })

  it('should have a subject count', function () {
    expect(model.set_member_subjects_count).to.equal(19)
  })
})
