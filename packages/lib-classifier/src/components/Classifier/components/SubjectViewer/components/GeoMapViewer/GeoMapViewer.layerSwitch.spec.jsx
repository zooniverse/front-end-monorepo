import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { Collection } from 'ol'
import { Translate } from 'ol/interaction'
import VectorLayer from 'ol/layer/Vector'

import GeoDrawingTaskModel from '@plugins/tasks/experimental/geoDrawing/task/models/GeoDrawingTask'
import GeoMapViewer from './GeoMapViewer'

const TILE_LAYERS = [
  { type: 'osm', label: 'Base', default: true },
  { type: 'xyz', label: 'Satellite', url: 'https://example.com/{z}/{x}/{y}.png' }
]

const SUBJECT_POINT = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [2.2944810, 48.8583701] },
      properties: { name: 'Eiffel Tower' }
    }
  ]
}

describe('Component > GeoMapViewer — layer switch clears selection', function () {
  let task

  beforeEach(function () {
    task = GeoDrawingTaskModel.create({
      activeToolIndex: 0,
      taskKey: 'T0',
      tools: [{ color: '#E65252', label: 'Point', type: 'Point' }],
      type: 'geoDrawing'
    })
  })

  function renderViewer() {
    return render(
      <Grommet theme={zooTheme}>
        <GeoMapViewer geoDrawingTask={task} geoJSON={SUBJECT_POINT} tileLayers={TILE_LAYERS} />
      </Grommet>
    )
  }

  it('auto-selects the subject feature on mount (move-only workflow)', async function () {
    renderViewer()
    await waitFor(() => {
      expect(task.activeFeature).to.exist
    })
  })

  it('clears the selected feature and the task active feature on layer switch', async function () {
    const user = userEvent.setup()
    renderViewer()
    await waitFor(() => {
      expect(task.activeFeature).to.exist
    })

    const tabs = screen.getAllByRole('tab')
    expect(tabs).to.have.length(2)
    await user.click(tabs[1])

    await waitFor(() => {
      expect(tabs[1].getAttribute('aria-selected')).to.equal('true')
    })
    await waitFor(() => {
      expect(task.activeFeature).to.equal(null)
    })
  })

  it('does not clear the selection when re-clicking the already-active layer', async function () {
    const user = userEvent.setup()
    renderViewer()
    await waitFor(() => {
      expect(task.activeFeature).to.exist
    })

    await user.click(screen.getAllByRole('tab')[0])

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(task.activeFeature).to.exist
  })

  it('reports the active layer index to the task mapContext', async function () {
    const user = userEvent.setup()
    renderViewer()
    await waitFor(() => {
      expect(task.mapContext.activeLayerIndex).to.equal(0)
    })

    await user.click(screen.getAllByRole('tab')[1])

    await waitFor(() => {
      expect(task.mapContext.activeLayerIndex).to.equal(1)
    })
  })

  describe('feature visibility across layers', function () {
    const LAYERED_GEOJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [2.29, 48.85] },
          properties: { name: 'on-layer-0', layer: 0 }
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [2.30, 48.86] },
          properties: { name: 'on-layer-1', layer: 1 }
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [2.31, 48.87] },
          properties: { name: 'unlayered' }
        }
      ]
    }

    function editableLayerFrom(olMap) {
      return olMap.getLayers().getArray().find((mapLayer) => (
        mapLayer instanceof VectorLayer && !mapLayer.get('extentMask')
      ))
    }

    function featureByName(editableLayer, name) {
      return editableLayer.getSource().getFeatures()
        .find((f) => f.get('name') === name)
    }

    function styleFor(editableLayer, name) {
      return editableLayer.getStyle()(featureByName(editableLayer, name))
    }

    async function renderLayeredViewer() {
      let olMap
      render(
        <Grommet theme={zooTheme}>
          <GeoMapViewer
            geoDrawingTask={task}
            geoJSON={LAYERED_GEOJSON}
            tileLayers={TILE_LAYERS}
            onMapReady={(readyMap) => { olMap = readyMap }}
          />
        </Grommet>
      )
      await waitFor(() => {
        expect(olMap).to.exist
        expect(editableLayerFrom(olMap)?.getSource().getFeatures()).to.have.length(3)
      })
      return { olMap, editableLayer: editableLayerFrom(olMap) }
    }

    it('renders every feature on every layer', async function () {
      const user = userEvent.setup()
      const { editableLayer } = await renderLayeredViewer()

      expect(styleFor(editableLayer, 'on-layer-0')).to.exist
      expect(styleFor(editableLayer, 'on-layer-1')).to.exist
      expect(styleFor(editableLayer, 'unlayered')).to.exist

      await user.click(screen.getAllByRole('tab')[1])

      await waitFor(() => {
        expect(task.mapContext.activeLayerIndex).to.equal(1)
      })
      expect(styleFor(editableLayer, 'on-layer-0')).to.exist
      expect(styleFor(editableLayer, 'on-layer-1')).to.exist
      expect(styleFor(editableLayer, 'unlayered')).to.exist
    })

    it('keeps the layer stamp when a feature is moved while another layer is active', async function () {
      const user = userEvent.setup()
      const { olMap, editableLayer } = await renderLayeredViewer()

      await user.click(screen.getAllByRole('tab')[1])
      await waitFor(() => {
        expect(task.mapContext.activeLayerIndex).to.equal(1)
      })

      const feature = featureByName(editableLayer, 'on-layer-0')
      const geometry = feature.getGeometry()
      const [x, y] = geometry.getCoordinates()
      geometry.setCoordinates([x + 1000, y + 1000])

      const translate = olMap.getInteractions().getArray()
        .find((interaction) => interaction instanceof Translate)
      translate.dispatchEvent({ type: 'translateend', features: new Collection([feature]) })

      expect(feature.get('layer')).to.equal(0)
    })
  })
})
