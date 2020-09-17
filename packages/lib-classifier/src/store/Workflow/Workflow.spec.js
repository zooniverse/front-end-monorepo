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

    before(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    it('should set the active subject set', function () {
      const defaultID = workflow.links.subject_sets[0]
      expect(workflow.subjectSetId).to.equal(defaultID)
      const subjectSetID = workflow.links.subject_sets[1]
      workflow.selectSubjectSet(subjectSetID)
      expect(workflow.subjectSetId).to.equal(subjectSetID)
    })
  })
})
