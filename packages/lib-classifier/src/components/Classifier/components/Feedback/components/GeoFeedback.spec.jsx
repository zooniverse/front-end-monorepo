import { render, screen } from '@testing-library/react'
import { Provider } from 'mobx-react'

import createTileLayer from '../../SubjectViewer/components/GeoMapViewer/helpers/createTileLayer'
import constrainMapToExtent from '../../SubjectViewer/components/GeoMapViewer/helpers/extentConstraint'
import { fitViewToExtent } from '../../SubjectViewer/components/GeoMapViewer/helpers/mapSelection'
import GeoFeedback from './GeoFeedback'

vi.mock('../../SubjectViewer/components/GeoMapViewer/helpers/createTileLayer', async (importOriginal) => {
  const actual = await importOriginal()
  return { default: vi.fn(actual.default) }
})

vi.mock('../../SubjectViewer/components/GeoMapViewer/helpers/mapSelection', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, fitViewToExtent: vi.fn(actual.fitViewToExtent) }
})

vi.mock('../../SubjectViewer/components/GeoMapViewer/helpers/extentConstraint', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, default: vi.fn(actual.default) }
})

const SUBJECT_EXTENT = [-10131000, 6100000, -10120000, 6110000]

const YEARS = [
  { type: 'wms', label: '2023', url: 'https://example.org/wms', params: { LAYERS: 'fsa2023' }, default: true },
  { type: 'wms', label: '2021', url: 'https://example.org/wms', params: { LAYERS: 'fsa2021' } },
  { type: 'wms', label: '1992', url: 'https://example.org/wms', params: { LAYERS: 'doq' } }
]

describe('Component > GeoFeedback', function () {
  function buildClassifierStore ({ tileLayers = [{ type: 'osm' }], activeLayerIndex, subjectExtent } = {}) {
    return {
      classifications: {
        currentAnnotations: [{
          taskType: 'geoDrawing',
          value: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [-91.001, 48.001] },
              properties: {}
            }]
          }
        }]
      },
      feedback: {
        applicableRules: [{
          id: 'dam-radial',
          strategy: 'geoRadial',
          success: true,
          successfulClassifications: [{ coordinates: [-91.001, 48.001], type: 'Point' }],
          tolerance: '2000',
          x: '-91.0',
          y: '48.0'
        }]
      },
      workflows: {
        active: {
          configuration: {
            subject_viewer_config: {
              tile_layers: tileLayers
            }
          }
        }
      },
      workflowSteps: {
        activeStepTasks: [{ type: 'geoDrawing', mapContext: { activeLayerIndex, subjectExtent } }]
      }
    }
  }

  function renderFeedback (store) {
    return render(
      <Provider classifierStore={store}>
        <GeoFeedback />
      </Provider>
    )
  }

  beforeEach(function () {
    createTileLayer.mockClear()
    fitViewToExtent.mockClear()
    constrainMapToExtent.mockClear()
  })

  it('should render the feedback map container', function () {
    renderFeedback(buildClassifierStore())
    expect(screen.getByTestId('geo-feedback-map')).to.exist
  })

  it('should attach an OpenLayers viewport to the container', function () {
    renderFeedback(buildClassifierStore())
    const container = screen.getByTestId('geo-feedback-map')
    expect(container.querySelector('.ol-viewport')).to.exist
  })

  it('should always show the workflow default layer, even after the volunteer switched layers', function () {
    renderFeedback(buildClassifierStore({ tileLayers: YEARS, activeLayerIndex: 1 }))
    expect(createTileLayer.mock.calls.map(([descriptor]) => descriptor.label)).to.deep.equal(['2023'])
  })

  it('should show the first layer when none is marked default', function () {
    const noDefault = YEARS.map(({ default: _, ...descriptor }) => descriptor)
    renderFeedback(buildClassifierStore({ tileLayers: noDefault, activeLayerIndex: 2 }))
    expect(createTileLayer.mock.calls.map(([descriptor]) => descriptor.label)).to.deep.equal(['2023'])
  })

  it('should open framed the way the subject first loaded: constrained to the subject box, then fitted', function () {
    renderFeedback(buildClassifierStore({ subjectExtent: SUBJECT_EXTENT }))
    expect(constrainMapToExtent.mock.calls).to.have.lengthOf(1)
    expect(constrainMapToExtent.mock.calls[0][1]).to.deep.equal(SUBJECT_EXTENT)
    expect(fitViewToExtent.mock.calls).to.have.lengthOf(1)
    expect(fitViewToExtent.mock.calls[0][1]).to.deep.equal(SUBJECT_EXTENT)
  })

  it('should fit to the feedback features when the subject has no box', function () {
    renderFeedback(buildClassifierStore())
    expect(constrainMapToExtent.mock.calls).to.have.lengthOf(0)
    expect(fitViewToExtent.mock.calls).to.have.lengthOf(1)
  })

  it('should offer zoom buttons on the feedback map', function () {
    renderFeedback(buildClassifierStore())
    const container = screen.getByTestId('geo-feedback-map')
    expect(container.querySelector('.ol-zoom-in')).to.exist
    expect(container.querySelector('.ol-zoom-out')).to.exist
  })
})
