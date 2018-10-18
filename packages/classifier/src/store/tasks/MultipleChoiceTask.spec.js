import MultipleChoiceTask from './MultipleChoiceTask'

const multipleChoiceTask = {
  answers: [
    { label: 'leaves', _key: Math.random() },
    { label: 'flowers', _key: Math.random() }
  ],
  question: 'What do you see?',
  required: false,
  taskKey: 'T2',
  type: 'multiple'
}

describe('Model > MultipleChoiceTask', function () {
  it('should exist', function () {
    const multipleChoiceTaskInstance = MultipleChoiceTask.create(multipleChoiceTask)
    expect(multipleChoiceTaskInstance).to.exist
    expect(multipleChoiceTaskInstance).to.be.an('object')
  })
})
