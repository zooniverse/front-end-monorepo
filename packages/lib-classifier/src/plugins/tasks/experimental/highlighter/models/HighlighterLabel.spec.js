import HighlighterLabel from './HighlighterLabel'

describe('Model > HighlighterLabel', function () {
  it('should exist', function () {
    const label = HighlighterLabel.create({ color: '#00979d	', label: 'test' })
    expect(label).to.exist
    expect(label).to.be.an('object')
  })

  it('should error for invalid label', function () {
    let errorThrown = false
    try {
      HighlighterLabel.create({ color: undefined, label: undefined })
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })
})
