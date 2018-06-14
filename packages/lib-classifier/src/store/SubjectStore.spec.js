import SubjectStore from './SubjectStore'

let model

describe('Model > SubjectStore', function () {
  it('should exist', function () {
    expect(SubjectStore).to.not.be.undefined
  })

  describe('properties', function () {
    before(function () {
      model = SubjectStore.create({ type: 'subjects' })
    })

    after(function () {
      model = null
    })

    it('should have a `resources` property', function () {
      expect(model.resources).to.not.be.undefined
    })

    it('should have a `active` property', function () {
      expect(model.active).to.not.be.undefined
    })

    it('should have a `queue` property', function () {
      expect(model.queue).to.not.be.undefined
    })
  })
})
