import getCursorFromState from './getCursorFromState'

function fakeSelect(selectedFeature = null) {
  return { getFeatures: () => ({ item: () => selectedFeature }) }
}

describe('helpers > getCursorFromState > point creation mode', function () {
  const creatableTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 3, canCreate: true } }
  const moveOnlyTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 0, canCreate: false } }

  function cursorFor({ geoDrawingTask, pointDraw, cachedFeatureHit = false, dragging = false }) {
    return getCursorFromState({
      map: {},
      layer: {},
      select: fakeSelect(),
      draw: null,
      modify: null,
      pointDraw,
      geoDrawingTask,
      activeToolType: 'Point',
      isMeasureModeActive: false,
      isDraggingPoint: false,
      pixel: [0, 0],
      dragging,
      cachedFeatureHit
    })
  }

  it('returns crosshair over empty map when point draw is below cap', function () {
    const cursor = cursorFor({ geoDrawingTask: creatableTask, pointDraw: { isCapped: () => false } })
    expect(cursor).to.equal('crosshair')
  })

  it('returns pointer over an existing feature even when below cap', function () {
    const cursor = cursorFor({ geoDrawingTask: creatableTask, pointDraw: { isCapped: () => false }, cachedFeatureHit: true })
    expect(cursor).to.equal('pointer')
  })

  it('returns default when the point tool is at its cap', function () {
    const cursor = cursorFor({ geoDrawingTask: creatableTask, pointDraw: { isCapped: () => true } })
    expect(cursor).to.equal('default')
  })

  it('returns default when creation is disabled (move-only)', function () {
    const cursor = cursorFor({ geoDrawingTask: moveOnlyTask, pointDraw: null })
    expect(cursor).to.equal('default')
  })

  it('suppresses the crosshair while the map is being dragged', function () {
    const cursor = cursorFor({ geoDrawingTask: creatableTask, pointDraw: { isCapped: () => false }, dragging: true })
    expect(cursor).to.equal('')
  })

  describe('with a subject extent', function () {
    function extentMap(coordinate) {
      return {
        get: (key) => (key === 'subjectExtent' ? [0, 0, 100, 100] : undefined),
        getCoordinateFromPixel: () => coordinate
      }
    }

    function cursorAt(coordinate) {
      return getCursorFromState({
        map: extentMap(coordinate),
        layer: {},
        select: fakeSelect(),
        draw: null,
        modify: null,
        pointDraw: { isCapped: () => false },
        geoDrawingTask: creatableTask,
        activeToolType: 'Point',
        isMeasureModeActive: false,
        isDraggingPoint: false,
        pixel: [0, 0],
        dragging: false,
        cachedFeatureHit: false
      })
    }

    it('returns crosshair when the pointer is inside the subject extent', function () {
      expect(cursorAt([50, 50])).to.equal('crosshair')
    })

    it('returns default when the pointer is outside the subject extent', function () {
      expect(cursorAt([150, 50])).to.equal('default')
    })
  })
})
