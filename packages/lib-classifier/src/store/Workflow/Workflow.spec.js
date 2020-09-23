import { WorkflowFactory } from '@test/factories'
import { Factory } from 'rosie'
import sinon from 'sinon'
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
      const subjectSets = Factory.buildList('subject_set', 5)
      const subjectSetMap = {}
      subjectSets.forEach(subjectSet => {
        subjectSetMap[subjectSet.id] = subjectSet
      })
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        links: {
          subject_sets: Object.keys(subjectSetMap)
        },
        subjectSets: {
          resources: subjectSetMap
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    describe('with a valid subject set', function () {

      it('should set the active subject set', async function () {
        expect(workflow.subjectSetId).to.be.undefined()
        const subjectSetID = workflow.links.subject_sets[1]
        const subjectSet = await workflow.selectSubjectSet(subjectSetID)
        expect(subjectSet.id).to.equal(subjectSetID)
        expect(subjectSet).to.deep.equal(workflow.subjectSets.active)
      })
    })

    describe('with an invalid subject set', function () {

      it('should throw an error', async function () {
        let errorThrown = false
        sinon.stub(workflow.subjectSets, 'fetchResource').callsFake(async () => undefined)
        expect(workflow.subjectSetId).to.be.undefined()
        try {
          const subjectSet = await workflow.selectSubjectSet('abcdefg')
        } catch (e) {
          errorThrown= true
          expect(e.message).to.equal('No subject set abcdefg for workflow workflow1')
        }
        expect(errorThrown).to.be.true()
        workflow.subjectSets.fetchResource.restore()
      })
    })
  })

  describe('Views > subjectSetId', function () {
    let workflow

    beforeEach(function () {
      const subjectSets = Factory.buildList('subject_set', 5)
      const subjectSetMap = {}
      subjectSets.forEach(subjectSet => {
        subjectSetMap[subjectSet.id] = subjectSet
      })
      const workflowSnapshot = WorkflowFactory.build({
        id: 'workflow1',
        display_name: 'A test workflow',
        links: {
          subject_sets: Object.keys(subjectSetMap)
        },
        subjectSets: {
          resources: subjectSetMap
        },
        version: '0.0'
      })
      workflow = Workflow.create(workflowSnapshot)
    })

    describe('with no selected subject set', function () {

      it('should be undefined', async function () {
        expect(workflow.subjectSetId).to.be.undefined()
      })
    })

    describe('with a selected subject set', function () {

      it('should return the active subject set', async function () {
        expect(workflow.subjectSetId).to.be.undefined()
        const subjectSetID = workflow.links.subject_sets[1]
        await workflow.selectSubjectSet(subjectSetID)
        expect(workflow.subjectSetId).to.equal(subjectSetID)
      })
    })

    describe('with an invalid subject set', function () {

      it('should error', async function () {
        let errorThrown = false
        sinon.stub(workflow.subjectSets, 'fetchResource').callsFake(async () => undefined)
        expect(workflow.subjectSetId).to.be.undefined()
        try {
          await workflow.selectSubjectSet('abcdefg')
        } catch (e) {
          errorThrown = true
          expect(e.message).to.equal('No subject set abcdefg for workflow workflow1')
        }
        expect(errorThrown).to.be.true()
        workflow.subjectSets.fetchResource.restore()
      })
    })
  })
})
