import { ModelViewer } from './../models/ModelViewer'
import subjectData from './../data/4x4x4.json'

describe('Component > VolumetricViewer > ModelViewer', () => {
  const model = ModelViewer()
  const numDimensions = 3
  const numPoints = Math.pow(4, numDimensions) // subjectData is 4^3
  const base64Data = Buffer.from(subjectData, 'base64')

  it('should have initial state', () => {
    expect(model).to.exist
    expect(model.base).to.equal(0)
    expect(model.baseFrames).deep.to.equal([[], [], []])
    expect(model.baseFrameMod).deep.to.equal([0, 0, 0])
    expect(model.data).deep.to.equal([])
    expect(model.dimensions).deep.to.equal(['x', 'y', 'z'])
    expect(model.planesAbsoluteSets).deep.to.equal([[], [], []])
    expect(model.planeFrameActive).deep.to.equal([0, 0, 0])
    expect(model.points).deep.to.equal([])
    expect(model.threshold).deep.to.equal({ min: 5, max: 255 })
    expect(model._listeners.length).to.equal(0)
  })

  it('should initialize()', () => {
    model.initialize({ data: base64Data })

    expect(model.base).to.equal(4)

    // should have 3 dimensions
    expect(model.baseFrames.length).to.equal(numDimensions)

    // each dimension has 4 frames
    expect(model.baseFrames[0].length).to.equal(model.base)
    expect(model.baseFrames[1].length).to.equal(model.base)
    expect(model.baseFrames[2].length).to.equal(model.base)

    // test that all the values are structured as expected
    for (let i = 0; i < numDimensions; i++) {
      expect(model.baseFrames[i].length).to.equal(model.base)
      expect(model.planesAbsoluteSets[i].length).to.equal(model.base)

      for (let ii = 0; ii < model.base; ii++) {
        expect(model.baseFrames[i][ii].length).to.equal(model.base)
        expect(model.planesAbsoluteSets[i][ii].data.length).to.equal(model.base * model.base)

        for (let iii = 0; iii < model.base; iii++) {
          expect(model.baseFrames[i][ii][iii]).to.be.a('number')
        }
      }
    }

    expect(model.baseFrameMod).deep.to.equal([16, 4, 1])
    expect(model.data.length).to.be.above(0)
    expect(model.dimensions).deep.to.equal(['x', 'y', 'z'])
    expect(model.planeFrameActive).deep.to.equal([3, 3, 3])
    expect(model.points.length).to.equal(numPoints)

    // check that all points are structured properly
    for (let i = 0; i < numPoints; i++) {
      const p = model.points[i]
      const [value, x, y, z, isPointInThreshold, pointAnnotationIndex] = p

      expect(p.length).to.equal(6)
      expect(value >= 0 && value <= 255).to.equal(true)
      expect(x >= 0 && x <= (model.base - 1)).to.equal(true)
      expect(y >= 0 && y <= (model.base - 1)).to.equal(true)
      expect(z >= 0 && z <= (model.base - 1)).to.equal(true)
      expect(isPointInThreshold).to.equal(true)
      expect(pointAnnotationIndex).to.equal(-1)
    }

    expect(model.threshold).deep.to.equal({ min: 5, max: 255 })
    expect(model._listeners.length).to.equal(0)
  })

  it('should get & set the point annotation index', () => {
    const annotationIndex = 2

    // ensure initial state
    expect(model.getPointAnnotationIndex({ point: 5 })).to.equal(-1)
    expect(model.getPointAnnotationIndex({ point: 6 })).to.equal(-1)

    // update the index
    model.setPointsAnnotationIndex({ points: [5, 6], index: annotationIndex })
    expect(model.getPointAnnotationIndex({ point: 5 })).to.equal(annotationIndex)
    expect(model.getPointAnnotationIndex({ point: 6 })).to.equal(annotationIndex)

    // reset first point
    model.setPointsAnnotationIndex({ points: [5], index: -1 })
    expect(model.getPointAnnotationIndex({ point: 5 })).to.equal(-1)
    expect(model.getPointAnnotationIndex({ point: 6 })).to.equal(annotationIndex)

    // reset second point
    model.setPointsAnnotationIndex({ points: [6], index: -1 })
    expect(model.getPointAnnotationIndex({ point: 6 })).to.equal(-1)
  })

  it('should get a point\'s coordinates', () => {
    expect(model.getPointCoordinates({ point: 0 })).deep.to.equal([0, 0, 0])
    expect(model.getPointCoordinates({ point: 5 })).deep.to.equal([0, 1, 1])
    expect(model.getPointCoordinates({ point: 63 })).deep.to.equal([3, 3, 3])
  })

  it('should get a point\'s absolute value from its structured value', () => {
    expect(model.getPointFromStructured({ point: [0, 0, 0] })).deep.to.equal(0)
    expect(model.getPointFromStructured({ point: [0, 1, 1] })).deep.to.equal(5)
    expect(model.getPointFromStructured({ point: [3, 3, 3] })).deep.to.equal(63)
  })

  it('should see if a point is in threshold', () => {
    const minValue = 25
    const maxValue = 225

    model.setThreshold({ min: minValue, max: maxValue })

    for (let i = 0; i < numPoints; i++) {
      const value = model.getPointValue({ point: i })
      const isInThreshold = model.isPointInThreshold({ point: i })
      expect(isInThreshold).to.equal(value >= minValue && value <= maxValue)
    }

    // reset
    model.setThreshold({ min: 0, max: 255 })
  })

  it('should get and set an accurate plane frame', () => {
    const planeFrameActive = [0, 3, 3]
    const planeFrame = [
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15]
    ]

    // make sure the cb's are called
    let cbs = 2
    const onComplete = () => {
      if (--cbs === 0) {
        expect(model._listeners.length).to.equal(0)
      }
    }

    const changeDimensionXFrameListener = ({ frame }) => {
      model.off('change:dimension-0:frame', changeDimensionXFrameListener)

      expect(frame).to.equal(planeFrameActive[0])
      onComplete()
    }

    const changeDimensionFrameListener = ({ dimension, frame }) => {
      model.off('change:dimension:frame', changeDimensionFrameListener)
      expect(dimension).to.equal(0)
      expect(frame).to.equal(planeFrameActive[0])
      onComplete()
    }

    model.on('change:dimension-0:frame', changeDimensionXFrameListener)
    model.on('change:dimension:frame', changeDimensionFrameListener)
    expect(model._listeners.length).to.equal(2)

    // this is all the points that should be in x plane at frame 0
    expect(model.planeFrameActive).not.deep.to.equal(planeFrameActive)
    expect(model.getPlaneFrame({ dimension: 0 })).not.deep.to.equal(planeFrame)
    expect(model.getPlaneFrame({ dimension: 0, frame: 0 })).deep.to.equal(planeFrame)

    model.setPlaneFrameActive({ dimension: 0, frame: 0 })

    expect(model.planeFrameActive).deep.to.equal(planeFrameActive)
    expect(model.getPlaneFrame({ dimension: 0 })).deep.to.equal(planeFrame)
    expect(model.getPlaneFrame({ dimension: 0, frame: 0 })).deep.to.equal(planeFrame)
  })

  it('should get an accurate plane set', () => {
    // this is all the points that should be in x plane at frame 0
    // because its a set all the points should be in increasing values
    expect(model.getPlaneSet({ dimension: 0, frame: 0 }).data).deep.to.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  })
})
