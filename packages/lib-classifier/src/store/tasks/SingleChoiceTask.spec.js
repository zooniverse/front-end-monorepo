import SingleChoiceTask from './SingleChoiceTask'

const singleChoiceTask = {
  answers: [
    { label: 'yes', next: 'S2'},
    { label: 'no', next: 'S3' }
  ],
  question: 'Do you exist?',
  required: false,
  taskKey: 'T1',
  type: 'single'
}

describe('Model > SingleChoiceTask', function () {
  it('should exist', function () {
    const singleChoiceTaskInstance = SingleChoiceTask.create(singleChoiceTask)
    expect(singleChoiceTaskInstance).to.exist
    expect(singleChoiceTaskInstance).to.be.an('object')
  })
})