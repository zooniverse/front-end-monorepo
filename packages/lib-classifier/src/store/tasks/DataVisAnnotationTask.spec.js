import DataVisAnnotationTask from './DataVisAnnotationTask'

const graph2dRangeTool = {
  help: '',
  label: 'Transit?',
  max: 20,
  type: 'graph2dRangeX'
}

const dataVisAnnotationTask = {
  instruction: "Do you spot a transit? If so, please mark the lightcurve.",
  taskKey: 'T3',
  tools: [graph2dRangeTool],
  type: 'dataVisAnnotation'
}

describe('Model > DataVisAnnotationTask', function () {
  it('should exist', function () {
    const dataVisAnnotationTaskInstance = DataVisAnnotationTask.create(dataVisAnnotationTask)
    expect(dataVisAnnotationTaskInstance).to.exist
    expect(dataVisAnnotationTaskInstance).to.be.an('object')
  })
})
