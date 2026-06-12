import { useEffect, useState } from 'react'
import { fromLonLat } from 'ol/proj'

import GeoMapViewer from './GeoMapViewer'

import GeoDrawingTask from '@plugins/tasks/experimental/geoDrawing/task/models/GeoDrawingTask'

export default {
  title: 'Subject Viewers / GeoMapViewer',
  component: GeoMapViewer,
}

export const Default = {
  args: {},
}

const MULTI_LAYERS = [
  { type: 'osm', label: 'OpenStreetMap' },
  {
    type: 'xyz',
    label: 'OpenTopoMap',
    url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
    attributions: '© OpenTopoMap (CC-BY-SA)'
  },
  {
    type: 'wms',
    label: 'MnGeo 2023 imagery',
    url: 'https://imageserver.gisdata.mn.gov/cgi-bin/wms?',
    params: { LAYERS: 'fsa2023' },
    format: 'image/jpeg',
    attributions: 'MnGeo'
  },
  {
    type: 'cog',
    label: 'NAIP 2023 (COG)',
    url: 'https://naipeuwest.blob.core.windows.net/naip/v002/mn/2023/mn_030cm_2023/48091/m_4809149_se_15_030_20230830_20240228.tif',
    attributions: 'USDA NAIP'
  }
]

const COG_CENTER = [-91.906, 48.156]

function MultiLayerStory(props) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (!map) return
    map.getView().setCenter(fromLonLat(COG_CENTER))
    map.getView().setZoom(14)
  }, [map])

  return <GeoMapViewer {...props} onMapReady={setMap} tileLayers={MULTI_LAYERS} />
}

export const WithMultipleLayers = {
  render: () => <MultiLayerStory />,
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
      type: 'SegmentedLine',
      label: 'Segmented Line',
      color: '#E65252'
    }
    if (min_vertices !== undefined && min_vertices !== '') redTool.min_vertices = min_vertices
    if (max_vertices !== undefined && max_vertices !== '') redTool.max_vertices = max_vertices
    if (min !== undefined && min !== '') redTool.min = min
    if (max !== undefined && max !== '') redTool.max = max

    const orangeTool = {
      type: 'SegmentedLine',
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
