import getDrawModeCursor from './getDrawModeCursor'

describe('helpers > getDrawModeCursor', function () {
  it('returns grabbing while a vertex modify is in progress (highest precedence)', function () {
    expect(getDrawModeCursor({ isModifying: true })).to.equal('grabbing')
    expect(getDrawModeCursor({ isModifying: true, isOnSelectedVertex: true, isOnAnotherFeature: true })).to.equal('grabbing')
  })

  it('returns crosshair while mid-sketch and dragging-aware', function () {
    expect(getDrawModeCursor({ isSketching: true })).to.equal('crosshair')
    expect(getDrawModeCursor({ isSketching: true, isDragging: true })).to.equal('')
    expect(getDrawModeCursor({ isSketching: true, isOnSelectedVertex: true })).to.equal('crosshair')
    expect(getDrawModeCursor({ isSketching: true, isOnAnotherFeature: true })).to.equal('crosshair')
  })

  it('returns grab over the selected line\'s vertex, grabbing while dragging on it', function () {
    expect(getDrawModeCursor({ isOnSelectedVertex: true })).to.equal('grab')
    expect(getDrawModeCursor({ isOnSelectedVertex: true, isDragging: true })).to.equal('grabbing')
  })

  it('returns pointer over an unselected feature', function () {
    expect(getDrawModeCursor({ isOnAnotherFeature: true })).to.equal('pointer')
  })

  it('returns not-allowed when the line-count cap is reached on empty map space', function () {
    expect(getDrawModeCursor({ isAtMaxLines: true })).to.equal('not-allowed')
    expect(getDrawModeCursor({ isAtMaxLines: true, isDragging: true })).to.equal('')
  })

  it('keeps grab/pointer/grabbing precedence ahead of isAtMaxLines so existing lines stay editable', function () {
    expect(getDrawModeCursor({ isAtMaxLines: true, isOnSelectedVertex: true })).to.equal('grab')
    expect(getDrawModeCursor({ isAtMaxLines: true, isOnSelectedVertex: true, isDragging: true })).to.equal('grabbing')
    expect(getDrawModeCursor({ isAtMaxLines: true, isOnAnotherFeature: true })).to.equal('pointer')
    expect(getDrawModeCursor({ isAtMaxLines: true, isModifying: true })).to.equal('grabbing')
  })

  it('defaults to crosshair on empty map, empty when DragPan-style dragging', function () {
    expect(getDrawModeCursor()).to.equal('crosshair')
    expect(getDrawModeCursor({ isDragging: true })).to.equal('')
  })
})
