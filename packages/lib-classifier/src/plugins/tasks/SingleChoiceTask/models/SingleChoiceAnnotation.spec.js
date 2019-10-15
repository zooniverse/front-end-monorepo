import SingleChoiceAnnotation from './SingleChoiceAnnotation'

const singleChoiceAnnotation = {
  task: 'T0',
  value: 0
}

describe('Model > SingleChoiceAnnotation', function () {
  it('should exist', function () {
    const singleChoiceAnnotationInstance = SingleChoiceAnnotation.create(singleChoiceAnnotation)
    expect(singleChoiceAnnotationInstance).to.be.ok()
    expect(singleChoiceAnnotationInstance).to.be.an('object')
  })
})
