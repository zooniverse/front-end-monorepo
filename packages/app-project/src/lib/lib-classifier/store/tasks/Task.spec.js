import Task from './Task'

describe('Model > Task', function () {
  it('should exist', function () {
    const taskInstance = Task.create({ taskKey: 'T3' })
    expect(taskInstance).to.exist
    expect(taskInstance).to.be.an('object')
  })
})
