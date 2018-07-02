import Project from './Project'

let model

const stub = {
  id: '1',
  configuration: {
    foo: 'bar'
  },
  'display_name': 'Foobar',
  links: {
    arrayLink: [
      'foobar'
    ]
  }
}

describe('Model > Project', function () {
  before(function () {
    model = Project.create(stub)
  })

  it('should exist', function () {
    expect(Project).to.not.equal(undefined)
  })

  it('should have a `configuration` property', function () {
    expect(model.configuration).to.deep.equal(stub.configuration)
  })

  it('should have a `display_name` property', function () {
    expect(model.display_name).to.equal(stub.display_name)
  })

  it('should have a `links` property', function () {
    expect(model.links).to.deep.equal(stub.links)
  })
})
