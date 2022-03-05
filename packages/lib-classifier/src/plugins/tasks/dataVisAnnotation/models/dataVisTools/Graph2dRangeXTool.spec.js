import Graph2dRangeXTool from './Graph2dRangeXTool'

const graph2dRangeTool = {
  help: '',
  label: 'Transit?',
  max: 20,
  type: 'graph2dRangeX'
}

describe('Model > Graph2dRangeXTool', function () {
  it('should exist', function () {
    const graph2dRangeToolInstance = Graph2dRangeXTool.create(graph2dRangeTool)
    expect(graph2dRangeToolInstance).to.be.ok()
    expect(graph2dRangeToolInstance).to.be.an('object')
  })
})
