import { Factory } from 'rosie'
import sinon from 'sinon'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import RootStore from './RootStore'

describe('Model > RootStore', function () {
  let model
  const client = { foo: 'bar' }

  before(function () {
    model = RootStore.create({}, { client })
  })

  it('should exist', function () {
    expect(RootStore).to.be.ok()
  })

  const stores = [
    'classifications',
    'feedback',
    'fieldGuide',
    'projects',
    'subjects',
    'subjectViewer',
    'tutorials',
    'workflows',
    'workflowSteps',
    'userProjectPreferences'
  ]

  stores.forEach(function (store) {
    it(`should have a \`${store}\` property`, function () {
      expect(model[store]).to.be.ok()
    })
  })

  it('should expose the client when passed in', function () {
    expect(model.client).to.equal(client)
  })

  it('should have an onToggleFavourite callback', function () {
    const onToggleFavourite = sinon.stub()
    model.setOnToggleFavourite(onToggleFavourite)
    expect(model.onToggleFavourite).to.equal(onToggleFavourite)
  })

  it('should have an onAddToCollection callback', function () {
    const addToCollection = sinon.stub()
    model.setOnAddToCollection(addToCollection)
    expect(model.onAddToCollection).to.equal(addToCollection)
  })
  
  describe('when a subject loads', function () {
    let model
    let subjectSnapshot

    before(function () {
      const projectSnapshot = ProjectFactory.build({
        id: 'testProject',
        display_name: 'A test project',
        links: {
          default_workflow: 'testWorkflow' 
        }
      })
      subjectSnapshot = SubjectFactory.build()
      const workflowSnapshot = WorkflowFactory.build({
        id: 'testWorkflow',
        display_name: 'A test workflow',
        tasks: {
          T0: {
            type: 'single',
            question: 'Yes or no?',
            answers: [ 'yes', 'no' ]
          },
          T1: {
            type: 'multiple',
            question: 'Pick some fruit',
            answers: [ 'apples', 'oranges', 'pears' ]
          }
        }
      })
      const client = stubPanoptesJs({
        subjects: Factory.buildList('subject', 10),
        workflows: [workflowSnapshot]
      })
      client.tutorials = {
        get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
      }
      model = RootStore.create({
        projects: {
          active: 'testProject',
          resources: {
            testProject: projectSnapshot
          }
        },
        subjects: {
          active: subjectSnapshot.id,
          resources: {
            [subjectSnapshot.id]: subjectSnapshot
          }
        },
        workflows: {
          active: 'testWorkflow',
          resources: {
            testWorkflow: workflowSnapshot
          }
        }
      }, {
        client,
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
      })
      model.workflows.setResource(workflowSnapshot)
      model.workflows.setActive(workflowSnapshot.id)
      model.subjects.setResource(subjectSnapshot)
      model.subjects.setActive(subjectSnapshot.id)
      model.workflowSteps.selectStep('S2')
      model.feedback.showFeedback()
      model.subjectViewer.onSubjectReady({})
    })
    

    it('should reset workflow steps', function () {
      const activeStep = model.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S1')
    })

    it('should create a new classification', function () {
      expect(model.classifications.active.links).to.deep.equal({
        project: 'testProject',
        subjects: [ subjectSnapshot.id ],
        workflow: 'testWorkflow'
      })
    })

    it('should reset subject feedback', function () {
      expect(model.feedback.rules).to.be.empty()
      expect(model.feedback.showModal).to.be.false()
    })
  })
})
