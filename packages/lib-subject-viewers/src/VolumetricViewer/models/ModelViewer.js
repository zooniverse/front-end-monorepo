import { Buffer } from 'buffer'
import { SortedSet } from './../helpers/SortedSet.js'

export const ModelViewer = () => {
  // Assumes 3D right now

  const pointModel = {
    // data
    base: 0,
    baseFrames: [[], [], []],
    baseFrameMod: [0, 0, 0],
    data: [],
    dimensions: ['x', 'y', 'z'],
    planesAbsoluteSets: [[], [], []],
    planeFrameActive: [0, 0, 0],
    points: [],
    threshold: { min: 5, max: 255 },  // min of 5 cuts out missing data noise
    // initialize
    initialize: ({ data }) => {
      pointModel.data = Buffer.from(data, 'base64')
      pointModel.base = Math.cbrt(pointModel.data.length)
      pointModel.baseFrameMod = [
        Math.pow(pointModel.base, 2),
        pointModel.base,
        1
      ]
      pointModel.planeFrameActive = [
        pointModel.base - 1,
        pointModel.base - 1,
        pointModel.base - 1
      ]

      let i = 0
      for (let x = 0; x < pointModel.base; x++) {
        for (let y = 0; y < pointModel.base; y++) {
          for (let z = 0; z < pointModel.base; z++) {
            pointModel.points[i] = [
              pointModel.data[i], // getPointValue
              x,
              y,
              z,
              true, // isPointInThreshold
              -1 // getPointAnnotationIndex()
            ]

            // x = zy plane
            if (x === 0) {
              if (!pointModel.baseFrames[0][z]) { pointModel.baseFrames[0][z] = [] }
              pointModel.baseFrames[0][z][y] = i
            }

            // y = xz plane
            if (y === 0) {
              const yz = pointModel.base - 1 - z
              const yx = pointModel.base - 1 - x
              if (!pointModel.baseFrames[1][yx]) { pointModel.baseFrames[1][yx] = [] }
              pointModel.baseFrames[1][yx][yz] = i
            }

            // z = xy plane
            if (z === 0) {
              const zx = pointModel.base - 1 - x
              if (!pointModel.baseFrames[2][zx]) { pointModel.baseFrames[2][zx] = [] }
              pointModel.baseFrames[2][zx][y] = i
            }

            // planesAbsoluteSets
            if (!pointModel.planesAbsoluteSets[0][x]) { pointModel.planesAbsoluteSets[0][x] = SortedSet({ data: [] }) }
            if (!pointModel.planesAbsoluteSets[1][y]) { pointModel.planesAbsoluteSets[1][y] = SortedSet({ data: [] }) }
            if (!pointModel.planesAbsoluteSets[2][z]) { pointModel.planesAbsoluteSets[2][z] = SortedSet({ data: [] }) }

            pointModel.planesAbsoluteSets[0][x].add({ value: i })
            pointModel.planesAbsoluteSets[1][y].add({ value: i })
            pointModel.planesAbsoluteSets[2][z].add({ value: i })
            i++
          }
        }
      }

      return pointModel
    },
    // getters & setters
    getDimensionLabel: ({ dimension = 0 }) => {
      return pointModel.dimensions[dimension]
    },
    getPlaneFrame: ({ dimension = 0, frame }) => {
      frame = frame ?? pointModel.planeFrameActive[dimension]
      // get the base frame, then mod each point to get the absolute plane view
      const baseFrame = pointModel.baseFrames[dimension]
      if (frame === 0) return baseFrame

      const offset = pointModel.baseFrameMod[dimension] * frame
      return baseFrame.map((r) => r.map((p) => p + offset))
    },
    getPlaneFrameIndex: ({ dimension = 0 }) => {
      return pointModel.planeFrameActive[dimension]
    },
    getPlaneSet: ({ dimension = 0, frame = 0 }) => {
      // Return empty SortedSet if dimension or frame is out of bounds
      const dimensionSets = pointModel.planesAbsoluteSets[dimension]
      if (!dimensionSets || frame < 0 || frame >= dimensionSets.length) {
        return SortedSet({ data: [] })
      }
      return dimensionSets[frame] ?? SortedSet({ data: [] })
    },
    getPointAnnotationIndex: ({ point }) => {
      if (point === undefined || point === null || !pointModel.points[point]) {
        return -1
      }
      return pointModel.points[point][5]
    },
    getPointCoordinates: ({ point }) => {
      if (point === undefined || point === null || !pointModel.points[point]) {
        return [0, 0, 0]
      }
      return pointModel.points[point].slice(1, 4)
    },
    getPointFromStructured: ({ point }) => {
      if (point.indexOf(-1) > -1) return undefined
      if (point.indexOf(pointModel.base) > -1) return undefined

      return point
        .map((factor, dim) => pointModel.baseFrameMod[dim] * factor)
        .reduce((acc, val) => acc + val, 0)
    },
    getPointValue: ({ point }) => {
      if (point === undefined || point === null || !pointModel.points[point]) {
        return 0
      }
      return pointModel.points[point][0]
    },
    isPointInThreshold: ({ point }) => {
      if (point === undefined || point === null || !pointModel.points[point]) {
        return false
      }
      return pointModel.points[point][4]
    },
    saveScreenshot: () => {
      pointModel.publish('save:screenshot')
    },
    setPlaneFrameActive: ({ dimension, frame }) => {
      pointModel.planeFrameActive[dimension] = frame
      pointModel.publish(`change:dimension-${dimension}:frame`, { frame })
      pointModel.publish('change:dimension:frame', { dimension, frame })
    },
    setPointsAnnotationIndex: ({ points, index }) => {
      // should be an array, even if its one point
      points.forEach((point) => {
        pointModel.points[point][5] = index
      })
    },
    setThreshold: ({ min, max }) => {
      pointModel.threshold.min = min
      pointModel.threshold.max = max
      pointModel.points.forEach((point, i) => {
        point[4] = min <= point[0] && max >= point[0]
      })
      pointModel.publish('change:threshold', { min, max })
    },

    // Cleanup
    dispose: () => {
      // Clear all data arrays to allow garbage collection
      pointModel.data = []
      pointModel.points = []
      pointModel.baseFrames = [[], [], []]
      pointModel.planesAbsoluteSets = [[], [], []]
      pointModel._listeners = []
    },

    // Listeners
    _listeners: [],
    publish: (eventName, data) => {
      pointModel._listeners.forEach((listener) => {
        if (listener.eventName === eventName) listener.cb(data)
      })
    },
    on: (eventName, cb) => {
      pointModel._listeners.push({ eventName, cb })
    },
    off: (eventName, cb) => {
      const index = pointModel._listeners.findIndex(
        (listener) => listener.eventName === eventName && listener.cb === cb
      )
      if (index > -1) pointModel._listeners.splice(index, 1)
    }
  }

  return pointModel
}
