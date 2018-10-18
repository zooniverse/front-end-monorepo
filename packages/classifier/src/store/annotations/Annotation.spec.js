import Annotation from './Annotation'

describe('Model > Annotation', function () {
  it('should exist', function () {
    const annotationInstance = Annotation.create({ task: 'T4' })
    expect(annotationInstance).to.exist
    expect(annotationInstance).to.be.an('object')
  })
})
