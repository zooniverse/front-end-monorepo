import { reducedSubjectMocks, multiIndexMock, minimalKeysMocks } from './reducedSubjectMocks'
import MachineLearntReductions from './MachineLearntReductions'

let reductionsTaskStub = {
  stepKey: 'S0',
  task: {
    taskKey: 'T0',
    type: 'drawing',
    tools: [
      {
        type: 'STUB'
      }
    ]
  },
  frame: 0,
}

const workflowS0 = { steps: [['S0', {}]] }
const workflowP0 = { steps: [['P0', {}]] }

describe('Models > MachineLearntReductions', () => {
  reducedSubjectMocks.forEach(reducedSubject => {
    describe(`ToolType: ${reducedSubject.toolType}`, () => {
      let reductionsModel

      before(() => {
        // make sure we update the tooltype to match our tests
        reductionsTaskStub.task.tools[0].type = reducedSubject.toolType

        reductionsModel = MachineLearntReductions.create({
          reducer: 'machineLearnt',
          subjectId: '174701',
          workflowId: '3691',
          reductions: [{ data: { data: [ reducedSubject ] } }]
        })
      })

      it('should exist', () => {
        expect(reductionsModel).to.exist
      })

      it('should find a current mark', () => {
        reductionsModel.reductions.forEach(reduction => {
          expect(reduction.data.data[0].markId).to.equal(reducedSubject.markId)
        })
        expect(Object.keys(reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })[0]).length).to.be.above(0)
      })

      it('should have array of x and y values', () => {
        let caesarMarks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })
        expect(caesarMarks[0]).to.deep.include(reducedSubject)
      })
    })
  })

  describe('multi-index marks', () => {
    let reductionsModel

    before(() => {
      reductionsModel = MachineLearntReductions.create({
        reducer: 'machineLearnt',
        subjectId: '174701',
        workflowId: '3691',
        reductions: [{ data: { data: [multiIndexMock] } }]
      })
    })

    it('should return marks for the matching stepKey', () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S1', workflow: workflowS0 })
      expect(marks).to.have.lengthOf(1)
      expect(marks[0].markId).to.equal('multiIdx1')
      expect(marks[0].taskIndex).to.equal(1)
      expect(marks[0].toolIndex).to.equal(2)
    })

    it('should not return marks for a non-matching stepKey', () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })
      expect(marks).to.have.lengthOf(0)
    })
  })

  describe('default values for missing keys', () => {
    let reductionsModel

    before(() => {
      reductionsModel = MachineLearntReductions.create({
        reducer: 'machineLearnt',
        subjectId: '174701',
        workflowId: '3691',
        reductions: [{ data: { data: minimalKeysMocks } }]
      })
    })

    it("should default stepKey to the workflow's first step when absent", () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })
      expect(marks).to.have.lengthOf(2)
    })

    it('should default taskIndex to 0 when absent', () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })
      marks.forEach(mark => {
        expect(mark.taskIndex).to.equal(0)
      })
    })

    it('should default toolIndex to 0 when absent', () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowS0 })
      marks.forEach(mark => {
        expect(mark.toolIndex).to.equal(0)
      })
    })

    it('should not return minimal marks for a non-default stepKey', () => {
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S1', workflow: workflowS0 })
      expect(marks).to.have.lengthOf(0)
    })

    it("should resolve the default stepKey from the workflow, not hardcoded 'S0'", () => {
      // Pages Editor workflows use 'P0'. The stepless mark (minimal1) should default to 'P0' and match.
      // minimal2 has an explicit 'S0' and shouldn't match.
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'P0', workflow: workflowP0 })
      expect(marks).to.have.lengthOf(1)
      expect(marks[0].markId).to.equal('minimal1')
      expect(marks[0].stepKey).to.equal('P0')
    })

    it("should not leak stepless marks to a step that is not the workflow's first", () => {
      // Workflow's first step is 'P0'. Asking for marks on 'S0':
      // - minimal1 (no stepKey) defaulted to 'P0' → doesn't match.
      // - minimal2 (explicit 'S0') matches.
      const marks = reductionsModel.findCurrentTaskMarks({ stepKey: 'S0', workflow: workflowP0 })
      expect(marks).to.have.lengthOf(1)
      expect(marks[0].markId).to.equal('minimal2')
    })
  })
})
