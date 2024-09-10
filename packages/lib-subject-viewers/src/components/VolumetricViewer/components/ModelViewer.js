import { SortedSet, SortedSetUnion } from "./SortedSet.js";

export const ModelViewer = () => {
  // Assumes 3D right now

  const pointModel = {
    // data
    base: 0,
    baseFrames: [[], [], []],
    baseFrameMod: [0, 0, 0],
    data: [],
    dimensions: ["x", "y", "z"],
    planesAbsoluteSets: [[], [], []],
    planeFrameActive: [0, 0, 0],
    points: [],
    threshold: { min: 0, max: 255 },
    // methods
    initialize: ({ annotations, data, tool }) => {
      pointModel.data = data;
      pointModel.base = Math.cbrt(data.length);
      pointModel.baseFrameMod = [
        Math.pow(pointModel.base, 2),
        pointModel.base,
        1,
      ];
      pointModel.planeFrameActive = [
        pointModel.base - 1,
        pointModel.base - 1,
        pointModel.base - 1,
      ];

      let i = 0;
      for (let x = 0; x < pointModel.base; x++) {
        for (let y = 0; y < pointModel.base; y++) {
          for (let z = 0; z < pointModel.base; z++) {
            pointModel.points[i] = [
              pointModel.data[i], // getPointValue
              x,
              y,
              z,
              true, // isPointInThreshold
              -1, // getPointAnnotationIndex()
            ];

            // x = zy plane
            if (x === 0) {
              if (!pointModel.baseFrames[0][z])
                pointModel.baseFrames[0][z] = [];
              pointModel.baseFrames[0][z][y] = i;
            }

            // y = xz plane
            if (y === 0) {
              const yz = pointModel.base - 1 - z;
              const yx = pointModel.base - 1 - x;
              if (!pointModel.baseFrames[1][yx])
                pointModel.baseFrames[1][yx] = [];
              pointModel.baseFrames[1][yx][yz] = i;
            }

            // z = xy plane
            if (z === 0) {
              const zx = pointModel.base - 1 - x;
              if (!pointModel.baseFrames[2][zx])
                pointModel.baseFrames[2][zx] = [];
              pointModel.baseFrames[2][zx][y] = i;
            }

            // planesAbsoluteSets
            if (!pointModel.planesAbsoluteSets[0][x])
              pointModel.planesAbsoluteSets[0][x] = SortedSet({ data: [] });
            if (!pointModel.planesAbsoluteSets[1][y])
              pointModel.planesAbsoluteSets[1][y] = SortedSet({ data: [] });
            if (!pointModel.planesAbsoluteSets[2][z])
              pointModel.planesAbsoluteSets[2][z] = SortedSet({ data: [] });

            pointModel.planesAbsoluteSets[0][x].add({ value: i });
            pointModel.planesAbsoluteSets[1][y].add({ value: i });
            pointModel.planesAbsoluteSets[2][z].add({ value: i });
            i++;
          }
        }
      }
    },
    // Methods
    getPointAnnotationIndex: ({ point }) => {
      return pointModel.points[point][5];
    },
    setPointsAnnotationIndex: ({ points, index }) => {
      // should be an array, even if its one point
      points.forEach((point) => {
        pointModel.points[point][5] = index;
      });
    },
    getPointCoordinates: ({ point }) => {
      return pointModel.points[point].slice(1, 4);
    },
    getPointFromStructured: ({ point }) => {
      if (point.indexOf(-1) > -1) return undefined;
      if (point.indexOf(pointModel.base) > -1) return undefined;

      return point
        .map((factor, dim) => pointModel.baseFrameMod[dim] * factor)
        .reduce((acc, val) => acc + val, 0);
    },
    isPointInThreshold: ({ point }) => {
      return pointModel.points[point][4];
    },
    getPointValue: ({ point }) => {
      return pointModel.points[point][0];
    },
    // Threshold / Brightness Range
    setThreshold: ({ min, max }) => {
      pointModel.threshold.min = min;
      pointModel.threshold.max = max;
      pointModel.points.forEach((point, i) => {
        point[4] = min <= point[0] && max >= point[0];
      });
      pointModel.publish(`change:threshold`, { min, max });
    },
    // Planes
    getPlaneFrame: ({ dimension = 0, frame }) => {
      frame = frame ?? pointModel.planeFrameActive[dimension];
      // get the base frame, then mod each point to get the absolute plane view
      const baseFrame = pointModel.baseFrames[dimension];
      if (frame === 0) return baseFrame;

      const offset = pointModel.baseFrameMod[dimension] * frame;
      return baseFrame.map((r) => r.map((p) => p + offset));
    },
    getPlaneSet: ({ dimension = 0, frame = 0 }) => {
      return pointModel.planesAbsoluteSets[dimension][frame];
    },
    setPlaneActive: ({ point }) => {
      pointModel.planeFrameActive = pointModel.getPointCoordinates({ point });
      pointModel.planeFrameActive.forEach((frame, dimension) => {
        pointModel.publish(`change:dimension-${dimension}:frame`, { frame });
      });
    },
    getPlaneFrameActive: ({ dimension = 0 }) => {
      return pointModel.planeFrameActive[dimension];
    },
    setPlaneFrameActive: ({ dimension, frame }) => {
      pointModel.planeFrameActive[dimension] = frame;
      pointModel.publish(`change:dimension-${dimension}:frame`, { frame });
      pointModel.publish(`change:dimension:frame`, { dimension, frame });
    },
    // Screenshot specific
    saveScreenshot: () => {
      pointModel.publish(`save:screenshot`);
    },
    // Listeners
    _listeners: [],
    publish: (eventName, data) => {
      pointModel._listeners.forEach((listener) => {
        if (listener.eventName === eventName) listener.cb(data);
      });
    },
    on: (eventName, cb) => {
      pointModel._listeners.push({ eventName, cb });
    },
    off: (eventName, cb) => {
      const index = pointModel._listeners.findIndex(
        (listener) => listener.eventName === eventName && listener.cb === cb,
      );
      if (index > -1) pointModel._listeners.splice(index, 1);
    },
  };

  return pointModel;
};
