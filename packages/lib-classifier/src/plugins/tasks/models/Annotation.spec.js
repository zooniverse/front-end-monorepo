import Annotation from './Annotation'

describe('Model > Annotation', function () {
  it('should exist', function () {
    const annotationInstance = Annotation.create({ id: 'default1', task: 'T4', taskType: 'default' })
    expect(annotationInstance).to.be.ok()
    expect(annotationInstance).to.be.an('object')
  })
})
