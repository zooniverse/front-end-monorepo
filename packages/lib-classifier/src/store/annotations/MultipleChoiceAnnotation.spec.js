import MultipleChoiceAnnotation from './MultipleChoiceAnnotation'

const multipleChoiceAnnotation = {
  task: 'T0',
  value: [0, 3]
}

describe('Model > MutipleChoiceAnnotation', function () {
  it('should exist', function () {
    const multipleChoiceAnnotationInstance = MultipleChoiceAnnotation.create(multipleChoiceAnnotation)
    expect(multipleChoiceAnnotationInstance).to.be.ok()
    expect(multipleChoiceAnnotationInstance).to.be.an('object')
  })
})
