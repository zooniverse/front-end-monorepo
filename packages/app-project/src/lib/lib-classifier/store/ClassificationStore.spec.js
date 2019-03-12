import sinon from 'sinon'
import ClassificationStore from './ClassificationStore'
import Subject from './Subject'

import { getEnv, types } from 'mobx-state-tree'

let rootStore

const RootStub = types
  .model('RootStore', {
    classifications: ClassificationStore,
    projects: types.frozen(),
    subjects: types.frozen(),
    workflows: types.frozen()
  })
  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

const subjectStub = {
  already_seen: true,
  favorite: true,
  finished_workflow: true,
  id: '3333',
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/44a48dd2-23b3-4bb5-9aa4-0e803ac4fe6d.jpeg' }
  ],
  metadata: {},
  retired: true,
  selection_state: 'normal',
  user_has_finished_workflow: true
}

const projectStub = {
  id: '1111'
}

const workflowStub = {
  id: '2222',
  version: 'v0.2'
}

describe('Model > ClassificationStore', function () {
  let subject
  before(function () {
    subject = Subject.create(subjectStub)

    rootStore = RootStub.create({
      classifications: ClassificationStore.create({
        active: undefined,
        resources: {},
        type: 'classifications'
      }),
      projects: { active: projectStub },
      subjects: { active: undefined },
      workflows: { active: workflowStub }
    })
  })

  it('should exist', function () {
    expect(ClassificationStore).to.exist
    expect(ClassificationStore).to.be.an('object')
  })

  it('should create an empty Classification with links to the Project, Workflow, and Subject', function () {
    rootStore.classifications.createClassification(subject)

    const classification = Array.from(rootStore.classifications.resources.values())[0]

    expect(classification).to.exist
    expect(classification.links.project).to.equal(projectStub.id)
    expect(classification.links.workflow).to.equal(workflowStub.id)
    expect(classification.links.subjects[0]).to.equal(subjectStub.id)
  })

  it('should create an empty Classification with the correct Subject Selection metadata', function () {
    rootStore.classifications.createClassification(subject)

    const classification = Array.from(rootStore.classifications.resources.values())[0]

    expect(classification.metadata.subjectSelectionState).to.exist
    expect(classification.metadata.subjectSelectionState.already_seen).to.equal(subjectStub.already_seen)
    expect(classification.metadata.subjectSelectionState.finished_workflow).to.equal(subjectStub.finished_workflow)
    expect(classification.metadata.subjectSelectionState.retired).to.equal(subjectStub.retired)
    expect(classification.metadata.subjectSelectionState.selection_state).to.equal(subjectStub.selection_state)
    expect(classification.metadata.subjectSelectionState.user_has_finished_workflow).to.equal(subjectStub.user_has_finished_workflow)
  })

  describe('on complete classification', function () {
    let event
    let onComplete

    before(function () {
      subject = Subject.create(subjectStub)
    
      const clientStub = {
        panoptes: {
          post: sinon.stub().callsFake(() => Promise.resolve({ 
            ok: true,
            body: {
              classifications: []
            }
          }))
        }
      }
      rootStore = RootStub.create(
        {
          classifications: ClassificationStore.create({
            active: undefined,
            resources: {},
            type: 'classifications'
          }),
          projects: { active: projectStub },
          subjects: { active: subject },
          workflows: { active: workflowStub }
        },
        {
          client: clientStub
        }
      )
      event = {
        preventDefault: sinon.stub()
      }
      onComplete = sinon.stub()
      rootStore.classifications.setOnComplete(onComplete)
      rootStore.classifications.completeClassification(event)
    })

    it('should call the onComplete callback with the classification and subject', function () {
      const classification = rootStore.classifications.active
      expect(onComplete).to.have.been.calledOnceWith(classification.toJSON(), subject.toJSON())
    })
  })
})
