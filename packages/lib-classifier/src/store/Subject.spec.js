import Subject from './Subject'

let model

const stub = {
  id: '1',
  locations: [
    {
      'image/jpg': 'http://foobar.com/image.jpg'
    }
  ]
}

describe('Model > Subject', function () {
  it('should exist', function () {
    expect(Subject).to.not.be.undefined
  })

  describe('properties', function () {
    before(function () {
      model = Subject.create(stub)
    })

    after(function () {
      model = null
    })

    it('should have a `locations` property', function () {
      expect(model.locations).to.deep.equal(stub.locations)
    })
  })
})
