import RootStore from './RootStore'

let model
const client = { foo: 'bar' }
const apiHost = 'https://endpoint.com/api'

describe('Model > RootStore', function () {
  before(function () {
    model = RootStore.create({}, {
      apiHost,
      client
    })
  })

  it('should exist', function () {
    expect(RootStore).to.exist
  })

  const stores = [
    'classifications',
    'drawing',
    'projects',
    'subjects',
    'subjectViewer',
    'tutorials',
    'workflows',
    'workflowSteps'
  ]

  stores.forEach(function (store) {
    it(`should have a \`${store}\` property`, function () {
      expect(model[store]).to.exist
    })
  })

  it('should expose the client when passed in', function () {
    expect(model.client).to.equal(client)
  })

  it('should expose the endpoint', function () {
    expect(model.apiHost).to.equal(apiHost)
  })
})
