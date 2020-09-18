import { WorkflowFactory } from '@test/factories'
import Workflow from './Workflow'

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
      expect(workflow.grouped).to.be.false()
    })

    it('should not use transcription task', function () {
      expect(workflow.usesTranscriptionTask).to.be.false()
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
      expect(workflow.usesTranscriptionTask).to.be.true()
    })
  })

  describe('Actions > selectSubjectSet', function () {
    let workflow

    beforeEach(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    describe('with a valid subject set', function () {

      it('should set the active subject set', async function () {
        const defaultID = workflow.links.subject_sets[0]
        expect(workflow.subjectSetId).to.equal(defaultID)
        const subjectSetID = workflow.links.subject_sets[1]
        const subjectSet = await workflow.selectSubjectSet(subjectSetID)
        expect(subjectSet.id).to.equal(subjectSetID)
        expect(subjectSet).to.deep.equal(workflow.subjectSets.active)
      })
    })

    describe('with an invalid subject set', function () {

      it('should return undefined', async function () {
        const defaultID = workflow.links.subject_sets[0]
        expect(workflow.subjectSetId).to.equal(defaultID)
        const subjectSet = await workflow.selectSubjectSet('abcdefg')
        expect(subjectSet).to.be.undefined()
      })
    })
  })

  describe('Views > subjectSetId', function () {
    let workflow

    beforeEach(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    describe('with a valid subject set', function () {

      it('should return the active subject set', async function () {
        const defaultID = workflow.links.subject_sets[0]
        expect(workflow.subjectSetId).to.equal(defaultID)
        const subjectSetID = workflow.links.subject_sets[1]
        await workflow.selectSubjectSet(subjectSetID)
        expect(workflow.subjectSetId).to.equal(subjectSetID)
      })
    })

    describe('with an invalid subject set', function () {

      it('should return the default subject set', async function () {
        const defaultID = workflow.links.subject_sets[0]
        expect(workflow.subjectSetId).to.equal(defaultID)
        await workflow.selectSubjectSet('abcdefg')
        expect(workflow.subjectSetId).to.equal(defaultID)
      })
    })
  })
})
