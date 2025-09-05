import { WorkflowFactory } from '@test/factories'
import { Factory } from 'rosie'
import sinon from 'sinon'
import RootStore from '@store/RootStore'
import Workflow from './Workflow'

import { MultipleChoiceTaskFactory, SubjectSetFactory } from '@test/factories'
import mockStore from '@test/mockStore'

describe('Model > Workflow', function () {
  it('should exist', function () {
    expect(Workflow).to.be.an('object')
  })

  describe('default settings', function () {
    let workflow

    before(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    it('should not be grouped', function () {
      expect(workflow.grouped).to.equal(false)
    })

    it('should not be prioritised', function () {
      expect(workflow.prioritized).to.equal(false)
    })

    it('should not use transcription task', function () {
      expect(workflow.usesTranscriptionTask).to.equal(false)
    })

    it('should not use indexed subject selection', function () {
      expect(workflow.hasIndexedSubjects).to.equal(false)
    })

    it('should have default configuration settings', function () {
      expect(workflow.configuration.invert_subject).to.equal(false)
      expect(workflow.configuration.playIterations).to.equal(3)
      expect(workflow.configuration.hide_classification_summaries).to.equal(undefined)
    })

    it('should have flipbook_autoplay default to false', function () {
      expect(workflow.configuration.flipbook_autoplay).to.equal(false)
    })

    it('should have limit_subject_height default to false', function () {
      expect(workflow.configuration.limit_subject_height).to.equal(false)
    })
  })

  describe('with custom configuration', function () {
    it('should convert playIterations to a number', function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        configuration: {
          playIterations: '5'
        },
        display_name: 'A test workflow with five play iterations',
        version: '0.0'
      })
      const workflow = Workflow.create(workflowSnapshot)
      expect(workflow.configuration.playIterations).to.equal(5)
    })

    it('should convert empty string playIterations to Infinity', function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        configuration: {
          playIterations: ''
        },
        display_name: 'A test workflow with infinite play iterations',
        version: '0.0'
      })
      const workflow = Workflow.create(workflowSnapshot)
      expect(workflow.configuration.playIterations).to.equal(Infinity)
    })
  })

  describe('workflow steps', function () {
    let step
    const task = MultipleChoiceTaskFactory.build({ taskKey: 'T1' })

    before(function () {
      step = {
        stepKey: 'S1',
        taskKeys: ['T1'],
        tasks: [task]
      }
    })

    it('should be of the form [stepKey, step]', function (){
      const { stepKey } = step
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        steps: [
          [ stepKey, step ]
        ],
        tasks: {
          T1: task
        },
        version: '0.0'
      })
      const workflow = Workflow.create(workflowSnapshot)
      expect(workflow.steps[0]).to.deep.equal([ stepKey, step ])
    })

    it('should not be of the form [step, stepKey]', function (){
      function createWorkflow() {
        const { stepKey } = step
        const workflowSnapshot = WorkflowFactory.build({
          id: 'workflow1',
          display_name: 'A test workflow',
          steps: [
            [ step, stepKey ]
          ],
          tasks: {
            T1: task
          },
          version: '0.0'
        })
        const workflow = Workflow.create(workflowSnapshot)
      }
      expect(createWorkflow).to.throw()
    })
  })

  describe('with transcription task', function () {
    let workflow

    before(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        tasks: {
          T0: {
            type: 'transcription',
            tools: [
              { type: 'transcriptionLine' }
            ]
          },
          T1: {
            answers: [{ label: "Enter an answer" }, { label: "Enter an answer" }],
            type: 'single',
            question: 'is it done?'
          }
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    it('should use transcription task', function () {
      expect(workflow.usesTranscriptionTask).to.equal(true)
    })
  })

  describe('with survey task', function () {
    let workflow

    before(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        tasks: {
          T0: {
            type: 'survey',
            choices: {
              C0: { label: 'Choice 0' },
              C1: { label: 'Choice 1' }
            },
            questions: {
              Q0: {
                label: 'What is your name?',
                required: true
              },
              Q1: {
                label: 'What is your quest?',
                required: true
              }
            },
            questionsMap: {
              C0: ['Q0', 'Q1'],
              C1: ['Q1']
            },
          },
          T1: {
            answers: [{ label: "Enter an answer" }, { label: "Enter an answer" }],
            type: 'single',
            question: 'is it done?'
          }
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    it('should use survey task', function () {
      expect(workflow.hasSurveyTask).to.equal(true)
    })
  })

  describe('Actions > selectSubjectSet', function () {
    let rootStore
    let workflow

    beforeEach(function () {
      const subjectSets = Factory.buildList('subject_set', 5)
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        links: {
          subject_sets: subjectSets.map(subjectSet => subjectSet.id)
        },
        version: '0.0'
      })
      rootStore = mockStore({ workflow: workflowSnapshot });
      rootStore.subjectSets.setResources(subjectSets)
      workflow = rootStore.workflows.resources.get('workflow1')
    })

    describe('with a valid subject set', function () {

      it('should select the subject set', async function () {
        expect(workflow.subjectSetId).to.equal(undefined)
        const subjectSetID = workflow.links.subject_sets[1]
        const subjectSet = await workflow.selectSubjectSet(subjectSetID)
        expect(subjectSet.id).to.equal(subjectSetID)
      })
    })

    describe('with an invalid subject set', function () {

      it('should throw an error', async function () {
        let errorThrown = false
        sinon.stub(rootStore.client.panoptes, 'get').callsFake(async () => { body: {}})
        expect(workflow.subjectSetId).to.equal(undefined)
        try {
          const subjectSet = await workflow.selectSubjectSet('abcdefg')
        } catch (e) {
          errorThrown= true
          expect(e.message).to.equal('No subject set abcdefg for workflow workflow1')
        }
        expect(errorThrown).to.equal(true)
        rootStore.client.panoptes.get.restore()
      })
    })
  })

  describe('Views > hasIndexedSubjects', function () {
    let indexedSet
    let workflow

    beforeEach(function () {
      const rootStore = RootStore.create();
      const subjectSets = Factory.buildList('subject_set', 5)
      indexedSet = SubjectSetFactory.build({
        metadata: {
          indexFields: 'Date,Creator'
        }
      })
      subjectSets.push(indexedSet)
      rootStore.subjectSets.setResources(subjectSets)
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        grouped: true,
        prioritized: true,
        links: {
          subject_sets: subjectSets.map(subjectSet => subjectSet.id)
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
      rootStore.workflows.setResources([workflow])
    })

    describe('with no selected subject set', function () {

      it('should be false', async function () {
        expect(workflow.hasIndexedSubjects).to.equal(false)
      })
    })

    describe('with a selected subject set', function () {

      describe('without indexed subjects', function () {
        it('should be false', async function () {
          expect(workflow.subjectSetId).to.equal(undefined)
          const subjectSetID = workflow.links.subject_sets[1]
          await workflow.selectSubjectSet(subjectSetID)
          expect(workflow.hasIndexedSubjects).to.equal(false)
        })
      })

      describe('with indexed subjects', function () {
        it('should be true', async function () {
          expect(workflow.subjectSetId).to.equal(undefined)
          await workflow.selectSubjectSet(indexedSet.id)
          expect(workflow.hasIndexedSubjects).to.equal(true)
        })
      })
    })
  })

  describe('Views > subjectSetId', function () {
    let rootStore
    let workflow

    beforeEach(function () {
      const subjectSets = Factory.buildList('subject_set', 5)
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        links: {
          subject_sets: subjectSets.map(subjectSet => subjectSet.id)
        },
        version: '0.0'
      })
      rootStore = mockStore({ workflow: workflowSnapshot });
      rootStore.subjectSets.setResources(subjectSets)
      workflow = rootStore.workflows.resources.get('workflow1')
    })

    describe('with no selected subject set', function () {

      it('should be undefined', async function () {
        expect(workflow.subjectSetId).to.equal(undefined)
      })
    })

    describe('with a selected subject set', function () {

      it('should return the selected subject set ID', async function () {
        expect(workflow.subjectSetId).to.equal(undefined)
        const subjectSetID = workflow.links.subject_sets[1]
        await workflow.selectSubjectSet(subjectSetID)
        expect(workflow.subjectSetId).to.equal(subjectSetID)
      })
    })

    describe('with an invalid subject set', function () {

      it('should error', async function () {
        let errorThrown = false
        sinon.stub(rootStore.client.panoptes, 'get').callsFake(async () => { body: {}})
        expect(workflow.subjectSetId).to.equal(undefined)
        try {
          await workflow.selectSubjectSet('abcdefg')
        } catch (e) {
          errorThrown = true
          expect(e.message).to.equal('No subject set abcdefg for workflow workflow1')
        }
        expect(errorThrown).to.equal(true)
        rootStore.client.panoptes.get.restore()
      })
    })
  })
})
