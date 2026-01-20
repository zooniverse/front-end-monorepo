import GeoMapViewer from './GeoMapViewer'

import GeoDrawingTask from '@plugins/tasks/experimental/geoDrawing/models/GeoDrawingTask'

export default {
  title: 'Subject Viewers / GeoMapViewer',
  component: GeoMapViewer,
}

export const Default = {
  args: {},
}

export const EiffelTower = {
  args: {
    geoDrawingTask: GeoDrawingTask.create({
      taskKey: 'T0',
      tools: [
        {
          type: 'geoPoint',
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
          properties: {
            toolIndex: 0,
          },
        },
      ],
    },
  },
}