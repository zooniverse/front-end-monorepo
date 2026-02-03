import GeoMapViewer from '@viewers/components/GeoMapViewer/GeoMapViewer'
import GeoDrawingTask from '../../../task/models/GeoDrawingTask'

export default {
  title: 'GeoDrawing tools / Point',
  component: GeoMapViewer,
}

export const Default = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      required: false,
      taskKey: 'T0',
      tools: [
        {
          type: 'Point',
          color: '#0000ff',
          label: 'A point at the Eiffel Tower',
          uncertainty_circle: false
        }
      ],
      type: 'geoDrawing'
    }),
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [2.2944810, 48.8583701]
          },
          properties: {
            name: 'Eiffel Tower'
          }
        }
      ]
    }
  }
}

export const UncertaintyCircle = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'Point',
          color: '#ff0000',
          label: 'A point at the Four Corners Monument',
          uncertainty_circle: true
        }
      ],
      type: 'geoDrawing'
    }),
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-109.0451723, 36.9989766]

          },
          properties: {
            name: 'Four Corners Monument',
            uncertainty_radius: 1610
          }
        }
      ]
    }
  }
}

export const MultiplePoints = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'Point',
          color: '#007f4d',
          label: 'Sydney Beaches',
          uncertainty_circle: false
        }
      ],
      type: 'geoDrawing'
    }),
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [151.2768, -33.89155]
          },
          properties: {
            name: 'Bondi Beach'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [151.25808, -33.92041]
          },
          properties: {
            name: 'Coogee Beach'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [151.257, -33.94881]
          },
          properties: {
            name: 'Maroubra Beach'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [151.28849, -33.79645]
          },
          properties: {
            name: 'Manly Beach'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [151.27059, -33.90038]
          },
          properties: {
            name: 'Tamarama Beach'
          }
        }
      ]
    }
  }
}

export const MultiplePointsUncertaintyCircles = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'Point',
          color: '#ff0000',
          label: 'Egyptian Pyramids of Giza',
          uncertainty_circle: true
        }
      ],
      type: 'geoDrawing'
    }),
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [31.13418, 29.97920]
          },
          properties: {
            name: 'Great Pyramid (Khufu)',
            uncertainty_radius: 500
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [31.13066, 29.97598]
          },
          properties: {
            name: 'Pyramid of Khafre',
            uncertainty_radius: 300
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [31.128248, 29.972520]
          },
          properties: {
            name: 'Pyramid of Menkaure',
            uncertainty_radius: 200
          }
        }
      ]
    }
  }
}
