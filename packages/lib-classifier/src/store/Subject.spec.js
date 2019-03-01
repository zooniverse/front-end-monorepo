import Subject from './Subject'
import { SubjectFactory } from '../../test/factories'

const stub = SubjectFactory.build()

describe('Model > Subject', function () {
  let subject

  before(function () {
    subject = Subject.create(stub)
  })

  it('should exist', function () {
    expect(Subject).to.exist
    expect(Subject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(stub.locations)
  })

  describe('toggleFavorite', function () {
    before(function () {
      subject.toggleFavorite()
    })

    it('should toggle subject.favorite', function () {
      expect(subject.favorite).to.be.true
    })
  })
})
