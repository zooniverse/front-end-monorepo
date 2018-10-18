import Subject from './Subject'

let subject

const stub = {
  id: '1',
  locations: [
    { 'image/jpg': 'http://foobar.com/image.jpg' }
  ]
}

describe('Model > Subject', function () {
  before(function () {
    subject = Subject.create(stub)
  })

  it('should exist', function () {
    expect(Subject).to.not.equal(undefined)
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(stub.locations)
  })
})
