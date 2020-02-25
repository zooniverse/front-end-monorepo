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

    it('should not use transcription lines', function () {
      expect(workflow.usesTranscriptionLines).to.be.false()
    })
  })
  describe('with transcription tools', function () {
    let workflow

    before(function () {
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        tasks: {
          T0: {
            type: 'drawing',
            tools: [
              { type: 'transcriptionLine' }
            ]
          }
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    it('should use transcription lines', function () {
      expect(workflow.usesTranscriptionLines).to.be.true()
    })
  })
})
