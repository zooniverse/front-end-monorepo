import OverlayLayerControl from './OverlayLayerControl'

export default {
  title: 'Subject Viewers / GeoMapViewer / OverlayLayerControl',
  component: OverlayLayerControl
}

export const TwoOverlays = {
  args: {
    overlays: [
      { type: 'geojson', label: 'NHD Hydrography' },
      { type: 'wfs', label: 'County boundaries' }
    ],
    visibility: [true, true],
    onToggle: (idx, visible) => console.log('onToggle', idx, visible)
  }
}

export const PartiallyHidden = {
  args: {
    overlays: [
      { type: 'geojson', label: 'NHD Hydrography' },
      { type: 'wfs', label: 'County boundaries' },
      { type: 'wfs', label: 'Watersheds (HUC8)' }
    ],
    visibility: [true, false, true],
    onToggle: (idx, visible) => console.log('onToggle', idx, visible)
  }
}

export const SingleOverlay = {
  args: {
    overlays: [{ type: 'geojson', label: 'NHD Hydrography' }],
    visibility: [true],
    onToggle: (idx, visible) => console.log('onToggle', idx, visible)
  }
}

export const NoOverlays = {
  args: {
    overlays: [],
    visibility: [],
    onToggle: (idx, visible) => console.log('onToggle', idx, visible)
  }
}
