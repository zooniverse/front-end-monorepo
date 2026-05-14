import GeoMapViewer from './GeoMapViewer'

import GeoDrawingTask from '@plugins/tasks/experimental/geoDrawing/task/models/GeoDrawingTask'

export default {
  title: 'Subject Viewers / GeoMapViewer',
  component: GeoMapViewer,
}

export const Default = {
  args: {},
}

export const WithGeoDrawingTask = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'Point',
          label: 'Eiffel Tower Point',
          color: '#ff0000',
        },
      ],
      type: 'geoDrawing',
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
        },
      ],
    },
  },
}

export const WithGeoDrawingLineStringTask = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      activeToolIndex: 0,
      tools: [
        {
          type: 'LineString',
          label: 'Dam crest',
          color: '#00aa55',
        },
      ],
      type: 'geoDrawing',
    }),
    geoJSON: {
      type: 'FeatureCollection',
      bbox: [-91.05, 47.96, -90.97, 48.01],
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-91.0125, 47.9847]
          },
          properties: {
            name: 'Knife Lake center pin (test seed)'
          }
        }
      ]
    },
    onFeaturesChange: (featureCollection) => {
      if (typeof window !== 'undefined') {
        window.__geoFeatureCount = featureCollection?.features?.length ?? 0
      }
    }
  },
}

export const WithoutGeoDrawingTask = {
  args: {
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
