import { reducedSubjectMocks } from './reducedSubjectMocks'
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
        expect(reductionsModel).to.be.ok()
      })

      it('should find a current mark', () => {
        reductionsModel.reductions.forEach(reduction => {
          expect(reduction.data.data[0].markId).to.equal(reducedSubject.markId)
        })
        expect(reductionsModel.findCurrentTaskMarks(reductionsTaskStub)).not.to.be.empty()
      })

      it('should have array of x and y values', () => {
        let caesarMarks = reductionsModel.findCurrentTaskMarks(reductionsTaskStub)
        expect(caesarMarks[0]).to.deep.equal(reducedSubject)
      })
    })
  })
})
