import TextAnnotation from './TextAnnotation'

describe('Model > TextAnnotation', function () {
  it('should exist', function () {
    const annotation = TextAnnotation.create({ task: 'T4' })
    expect(annotation).to.be.ok()
    expect(annotation).to.be.an('object')
  })

  it('should have a default value', function () {
    const annotation = TextAnnotation.create({ task: 'T4' })
    expect(annotation.value).to.equal('')
  })

  it('should error for invalid annotations', function () {
    let errorThrown = false
    try {
      const annotation = TextAnnotation.create({ task: 'T4', value: 5 })
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })
})
