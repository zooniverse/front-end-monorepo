import TextAnnotation from './TextAnnotation'

describe('Model > TextAnnotation', function () {
  it('should exist', function () {
    const annotation = TextAnnotation.create({ task: 'T4', taskType: 'text' })
    expect(annotation).to.be.ok()
    expect(annotation).to.be.an('object')
  })

  it('should have a default value', function () {
    const annotation = TextAnnotation.create({ task: 'T4', taskType: 'text' })
    expect(annotation.value).to.equal('')
  })

  it('should error for invalid annotations', function () {
    let errorThrown = false
    try {
      TextAnnotation.create({ task: 'T4', taskType: 'text', value: 5 })
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })
})
