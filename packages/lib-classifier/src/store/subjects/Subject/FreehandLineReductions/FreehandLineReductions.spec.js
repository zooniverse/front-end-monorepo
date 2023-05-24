import { expect } from 'chai'
import { reducedSubject } from './mocks'
import FreehandLineReductions from './FreehandLineReductions'

let reductionsTaskStub = {
  stepKey: 'S0',
  tasks: [
    {
      taskKey: 'T0',
      type: 'drawing',
      tools: [
        {
          type: 'freehandLine'
        }
      ]
    }
  ],
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
    reductionsModel.reductions.forEach(reduction => expect(reduction.data.markId).to.equal('clhhuqm9'))
    expect(reductionsModel.findCurrentTaskMark(reductionsTaskStub)).not.to.be.empty()
  })

  it('should have array of x and y values', () => {
    let caesarMark = reductionsModel.findCurrentTaskMark(reductionsTaskStub)
    expect(caesarMark.pathX).to.be.a('array')
    expect(caesarMark.pathY).to.be.a('array')
    expect(caesarMark.pathX).not.to.be.empty()
    expect(caesarMark.pathY).not.to.be.empty()
  })
})
