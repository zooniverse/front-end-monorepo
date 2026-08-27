import GeoDrawingTaskModel from './GeoDrawingTask'

describe('Model > GeoDrawingTask > activeFeature clearing', function () {
  function buildTask(tool) {
    return GeoDrawingTaskModel.create({
      activeToolIndex: 0,
      taskKey: 'T0',
      tools: [tool],
      type: 'geoDrawing'
    })
  }

  it('clears a Point activeFeature to null', function () {
    const task = buildTask({ color: '#E65252', label: 'Point', type: 'Point' })
    task.setActiveFeature({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [1, 2] },
      properties: {}
    })
    expect(task.activeFeature).to.exist
    task.clearActiveFeature()
    expect(task.activeFeature).to.equal(null)
  })

  it('clears a SegmentedLine activeFeature to null', function () {
    const task = buildTask({ color: '#E65252', label: 'Line', type: 'SegmentedLine' })
    task.setActiveFeature({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [[0, 0], [1, 1]] },
      properties: {}
    })
    expect(task.activeFeature).to.exist
    task.clearActiveFeature()
    expect(task.activeFeature).to.equal(null)
  })

  it('setActiveFeature(null) also yields null, not a ghost feature', function () {
    const task = buildTask({ color: '#E65252', label: 'Point', type: 'Point' })
    task.setActiveFeature(null)
    expect(task.activeFeature).to.equal(null)
  })
})

describe('Model > GeoDrawingTask > mapContext', function () {
  function buildTask() {
    return GeoDrawingTaskModel.create({
      activeToolIndex: 0,
      taskKey: 'T0',
      tools: [{ color: '#E65252', label: 'Point', type: 'Point' }],
      type: 'geoDrawing'
    })
  }

  it('defaults to layer 0 with no viewport bbox', function () {
    const task = buildTask()
    expect(task.mapContext.activeLayerIndex).to.equal(0)
    expect(task.mapContext.viewportBbox).to.equal(null)
  })

  it('merges partial updates', function () {
    const task = buildTask()
    task.updateMapContext({ activeLayerIndex: 1 })
    task.updateMapContext({ viewportBbox: [2.1, 48.7, 2.5, 49.0] })
    expect(task.mapContext.activeLayerIndex).to.equal(1)
    expect(task.mapContext.viewportBbox).to.deep.equal([2.1, 48.7, 2.5, 49.0])
  })

  it('resets with the task', function () {
    const task = buildTask()
    task.updateMapContext({ activeLayerIndex: 2, viewportBbox: [0, 0, 1, 1] })
    task.reset()
    expect(task.mapContext.activeLayerIndex).to.equal(0)
    expect(task.mapContext.viewportBbox).to.equal(null)
  })
})
