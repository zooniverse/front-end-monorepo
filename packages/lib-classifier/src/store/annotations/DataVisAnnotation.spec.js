import DataVisAnnotation from './DataVisAnnotation'

const dataVisAnnotation = {
  task: 'T0',
  value: []
}

describe('Model > DataVisAnnotation', function () {
  it('should exist', function () {
    const dataVisAnnotationInstance = DataVisAnnotation.create(dataVisAnnotation)
    expect(dataVisAnnotationInstance).to.exist
    expect(dataVisAnnotationInstance).to.be.an('object')
  })
})
