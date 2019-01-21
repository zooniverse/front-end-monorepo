import Graph2dRangeXTask from './Graph2dRangeXTask'

const graphTask = {
  instruction: 'Mark an area of the graph that is interesting.',
  taskKey: 'T101',
  type: 'graph2dRangeX'
}

describe('Model > Graph2dRangeXTask', function () {
  it('should exist', function () {
    const graphTaskInstance = Graph2dRangeXTask.create(graphTask)
    expect(graphTaskInstance).to.exist
    expect(graphTaskInstance).to.be.an('object')
  })
})
