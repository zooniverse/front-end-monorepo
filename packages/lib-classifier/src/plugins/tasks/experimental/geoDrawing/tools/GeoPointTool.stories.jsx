import GeoMapViewer from '@viewers/components/GeoMapViewer/GeoMapViewer'
import GeoDrawingTask from '../models/GeoDrawingTask'

export default {
  title: 'GeoDrawing tools / GeoPoint',
  component: GeoMapViewer,
}

export const Default = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      required: false,
      taskKey: 'T0',
      tools: [
        {
          type: 'geoPoint',
          color: '#ff0000',
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
          type: 'geoPoint',
          color: '#28a745',
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
            uncertainty_radius: 610
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
          type: 'geoPoint',
          color: '#6f42c1',
          label: 'Volcanoes in the Pacific Ring of Fire',
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
            coordinates: [-155.292, 19.421]
          },
          properties: {
            name: 'Mauna Loa'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [138.7274, 35.3606]
          },
          properties: {
            name: 'Mount Fuji'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [121.5169, 24.1139]
          },
          properties: {
            name: 'Mount Pinatubo'
          }
        }
      ]
    }
  }
}

export const MultiplePointsUncertaintyCircle = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'geoPoint',
          color: '#007bff',
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
