import DrawingTask from './DrawingTask'

const drawingTask = {
  instruction: "Mark each cat's face and tail. Draw an ellipse around each cat's face (not including the ears), and mark the tail tip with a point.",
  taskKey: 'T3',
  tools: [{}],
  type: 'drawing'
}

describe('Model > DrawingTask', function () {
  it('should exist', function () {
    const drawingTaskInstance = DrawingTask.create(drawingTask)
    expect(drawingTaskInstance).to.exist
    expect(drawingTaskInstance).to.be.an('object')
  })
})
