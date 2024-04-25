import { expect } from 'chai'
import { reducedSubject } from './mocks'
import FreehandLineReductions from './FreehandLineReductions'

let reductionsTaskStub = {
  stepKey: 'S0',
  task: {
    taskKey: 'T0',
    type: 'drawing',
    tools: [
      {
        type: 'freehandLine'
      }
    ]
  },
  frame: 0,
}

describe('Models > FreehandLineReductions', () => {
  let reductionsModel

  before(() => {
    reductionsModel = FreehandLineReductions.create({
      reducer: 'machineLearnt',
      subjectId: '174701',
      workflowId: '3691',
      reductions: [{ data: reducedSubject }]
    })
  })

  it('should exist', () => {
    expect(reductionsModel).to.be.ok()
  })

  it('should find a current mark', () => {
    reductionsModel.reductions.forEach(reduction => {
      expect(reduction.data.data[0].markId).to.equal('clhhuqm9')
    })
    expect(reductionsModel.findCurrentTaskMarks(reductionsTaskStub)).not.to.be.empty()
  })

  it('should have array of x and y values', () => {
    let caesarMarks = reductionsModel.findCurrentTaskMarks(reductionsTaskStub)
    expect(caesarMarks).to.be.a('array')
    expect(caesarMarks[0].pathX).to.be.a('array')
    expect(caesarMarks[0].pathY).to.be.a('array')
    expect(caesarMarks[0].pathX).not.to.be.empty()
    expect(caesarMarks[0].pathY).not.to.be.empty()
  })
})
