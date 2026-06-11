import LayerControl from './LayerControl'

export default {
  title: 'Subject Viewers / GeoMapViewer / LayerControl',
  component: LayerControl,
}

export const TwoLayers = {
  args: {
    layers: [
      { type: 'osm', label: 'OpenStreetMap' },
      { type: 'wms', label: '2023 imagery' }
    ],
    activeIndex: 0,
    onChange: (idx) => console.log('onChange', idx)
  }
}

export const FiveLayers = {
  args: {
    layers: [
      { type: 'osm', label: 'OpenStreetMap' },
      { type: 'wms', label: '2023' },
      { type: 'wms', label: '2021' },
      { type: 'wms', label: '2019' },
      { type: 'wms', label: 'Hillshade' }
    ],
    activeIndex: 2,
    onChange: (idx) => console.log('onChange', idx)
  }
}

export const SingleLayer = {
  args: {
    layers: [{ type: 'osm', label: 'OpenStreetMap' }],
    activeIndex: 0,
    onChange: (idx) => console.log('onChange', idx)
  }
}

export const NoLayers = {
  args: {
    layers: [],
    activeIndex: 0,
    onChange: (idx) => console.log('onChange', idx)
  }
}
