import DataVisAnnotationTask from './DataVisAnnotationTask'

const transitTool = {
  help: '',
  label: 'Transit?',
  max: 20,
  type: 'graph2dRangeX'
}

const anomalyTool = {
  help: '',
  label: 'Anomaly?',
  max: 20,
  type: 'graph2dRangeX'
}

const dataVisAnnotationTaskSnapshot = {
  instruction: 'Do you spot a transit? If so, please mark the lightcurve.',
  taskKey: 'T3',
  tools: [transitTool, anomalyTool],
  type: 'dataVisAnnotation'
}

describe('Model > DataVisAnnotationTask', function () {
  let model
  it('should exist', function () {
    model = DataVisAnnotationTask.create(dataVisAnnotationTaskSnapshot)
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = DataVisAnnotationTask.create(dataVisAnnotationTaskSnapshot)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T3')
      expect(annotation.taskType).to.equal('dataVisAnnotation')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('the active tool', function () {
    it('should default to the first tool', function () {
      expect(model.activeTool).to.equal(model.tools[0])
    })

    it('can be selected', function () {
      expect(model.activeTool).to.equal(model.tools[0])
      model.setActiveTool(1)
      expect(model.activeTool).to.equal(model.tools[1])
    })

    it('is reset when the task resets', function () {
      expect(model.activeTool).to.equal(model.tools[1])
      model.reset()
      expect(model.activeTool).to.equal(model.tools[0])
    })
  })
})
