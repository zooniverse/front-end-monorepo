import DrawingTask from './DrawingTask'

const pointTool = {
  help: '',
  label: 'Point please.',
  type: 'point'
}

const drawingTask = {
  instruction: "Mark each cat's face and tail. Draw an ellipse around each cat's face (not including the ears), and mark the tail tip with a point.",
  taskKey: 'T3',
  tools: [pointTool],
  type: 'drawing'
}

describe('Model > DrawingTask', function () {
  it('should exist', function () {
    const drawingTaskInstance = DrawingTask.create(drawingTask)
    expect(drawingTaskInstance).to.be.ok()
    expect(drawingTaskInstance).to.be.an('object')
  })

  it('should have a property `type` of `drawing`', function () {
    const drawingTaskInstance = DrawingTask.create(drawingTask)
    expect(drawingTaskInstance).to.include({ type: 'drawing' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => DrawingTask.create({ type: 'orange' })).to.throw()
  })
})
