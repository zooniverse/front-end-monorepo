import TextPreviousAnnotationValues from './TextPreviousAnnotationValues'

describe('Model > TextPreviousAnnotationValues', function () {
  const textPreviousAnnotationValues = {
    taskKey: 'T0.0.0',
    taskType: 'text',
    values: [
      "Behold the disappointing",
      "Behold the disappointing",
      "Beholde the disappointing"
    ]
  }

  it('should exist', function () {
    const model = TextPreviousAnnotationValues.create(textPreviousAnnotationValues)
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should error for invalid snapshots', function () {
    let errorThrown = false
    try {
      TextPreviousAnnotationValues.create({
        taskKey: 'T0.1.0',
        taskType: 'single',
        values: [
          0,
          0,
          1
        ]
      })
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })
})