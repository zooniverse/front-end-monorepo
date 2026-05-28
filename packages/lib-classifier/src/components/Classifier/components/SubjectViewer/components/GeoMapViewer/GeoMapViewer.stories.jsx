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
  argTypes: {
    min_vertices: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Tool 0 (red): minimum vertices required before the line can be finished. Leave blank for OL\'s default (2).'
    },
    max_vertices: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Tool 0 (red): maximum vertices allowed. Once reached, the line auto-finishes. Leave blank for no limit.'
    },
    min: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Tool 0 (red): minimum number of lines a volunteer must draw with this tool for the task to report complete. Leave blank for 0 (no minimum).'
    },
    max: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Tool 0 (red): maximum number of lines a volunteer can draw with this tool. Once reached, Draw deactivates. Leave blank for no limit.'
    }
  },
  args: {
    min_vertices: undefined,
    max_vertices: undefined,
    min: undefined,
    max: undefined,
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
  render: ({ min_vertices, max_vertices, min, max, ...rest }) => {
    const redTool = {
      type: 'LineString',
      label: 'Segmented Line',
      color: '#E65252'
    }
    if (min_vertices !== undefined && min_vertices !== '') redTool.min_vertices = min_vertices
    if (max_vertices !== undefined && max_vertices !== '') redTool.max_vertices = max_vertices
    if (min !== undefined && min !== '') redTool.min = min
    if (max !== undefined && max !== '') redTool.max = max

    const orangeTool = {
      type: 'LineString',
      label: 'Segmented Line 2',
      color: '#F1AE45'
    }

    const geoDrawingTask = GeoDrawingTask.create({
      taskKey: 'T0',
      activeToolIndex: 0,
      tools: [redTool, orangeTool],
      type: 'geoDrawing'
    })
    return <GeoMapViewer {...rest} geoDrawingTask={geoDrawingTask} />
  }
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
