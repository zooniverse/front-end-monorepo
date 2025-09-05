import Project from './Project'

describe('Model > Project', function () {
  let model

  const stub = {
    id: '1',
    configuration: {
      foo: 'bar'
    },
    links: {
      arrayLink: [
        'foobar'
      ]
    },
    strings: {
      display_name: 'Foobar'
    },
    slug: 'zooniverse/foobar'
  }

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
    expect(model.display_name).to.equal(stub.strings.display_name)
  })

  it('should have a `links` property', function () {
    expect(model.links).to.deep.equal(stub.links)
  })

  it('should have a `slug` property', function () {
    expect(model.slug).to.deep.equal(stub.slug)
  })

  describe('default workflow', function () {
    describe('with a single active workflow', function () {
      let project

      before(function () {
        project = Project.create({
          ...stub,
          links: {
            active_workflows: [ '1234' ]
          }
        })
      })

      it('should be the active workflow', function () {
        const [ singleActiveWorkflow ] = project.links.active_workflows
        expect(project.defaultWorkflow).to.equal(singleActiveWorkflow)
      })
    })

    describe('with multiple active workflows', function () {
      let project

      before(function () {
        project = Project.create({
          ...stub,
          configuration: {
            default_workflow: '5678'
          },
          links: {
            active_workflows: [ '1234', '5678' ]
          }
        })
      })

      it('should be undefined', function () {
        expect(project.defaultWorkflow).to.equal(undefined)
      })
    })

    describe('with neither', function () {
      let project

      before(function () {
        project = Project.create({
          ...stub,
          configuration: {},
          links: {
            active_workflows: [ '1234', '5678' ]
          }
        })
      })

      it('should be undefined', function () {
        expect(project.defaultWorkflow).to.equal(undefined)
      })
    })
  })
})
