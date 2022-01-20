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

  it('should have a default locale set as en', function () {
    expect(model.locale).to.equal('en')
  })

  it('calling setLocale() with a new locale should update model locale', function () {
    const newLocale = 'fr'
    model.setLocale(newLocale)
    expect(model.locale).to.equal(newLocale)
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
  
  describe('when a subject advances', function () {
    let model
    let subjects

    beforeEach(function () {
      const projectSnapshot = ProjectFactory.build({
        id: 'testProject',
        display_name: 'A test project',
        links: {
          default_workflow: 'testWorkflow' 
        }
      })
      subjects = Factory.buildList('subject', 10)
      const subjectSnapshot = subjects[0]
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
        subjects,
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
        }
      }, {
        client,
        authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
      })
      model.workflows.setResources([workflowSnapshot])
      model.workflows.setActive(workflowSnapshot.id)
      model.subjects.setResources(subjects)
      model.subjects.advance()
      model.workflowSteps.selectStep('S2')
      model.feedback.showFeedback()
    })
    

    it('should reset workflow steps', function () {
      let activeStep = model.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S2')
      model.subjects.advance()
      activeStep = model.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S1')
    })

    it('should create a new classification', function () {
      const firstSubjectInQueue = subjects[0]
      const secondSubjectInQueue = subjects[1]
      expect(model.classifications.active.links).to.deep.equal({
        project: 'testProject',
        subjects: [ firstSubjectInQueue.id ],
        workflow: 'testWorkflow'
      })
      expect(model.subjects.active.id).to.equal(firstSubjectInQueue.id)
      expect(model.classifications.active.links.subjects[0]).to.equal(model.subjects.active.id)
      const firstClassificationId = model.classifications.active.id
      model.subjects.advance()
      expect(model.classifications.active.id).to.not.equal(firstClassificationId)
      expect(model.classifications.active.links).to.deep.equal({
        project: 'testProject',
        subjects: [ secondSubjectInQueue.id ],
        workflow: 'testWorkflow'
      })
      expect(model.subjects.active.id).to.equal(secondSubjectInQueue.id)
      expect(model.classifications.active.links.subjects[0]).to.equal(model.subjects.active.id)
    })

    it('should reset subject feedback', function () {
      expect(model.feedback.showModal).to.be.true()
      model.subjects.advance()
      expect(model.feedback.showModal).to.be.false()
    })
  })
})
