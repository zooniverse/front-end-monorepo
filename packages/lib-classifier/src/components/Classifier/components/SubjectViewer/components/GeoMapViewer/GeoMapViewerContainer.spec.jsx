import { storeMapper } from './GeoMapViewerContainer'

function buildStore (overrides = {}) {
  return {
    subjects: { active: { id: 'subject-1', stepHistory: { latest: null } } },
    subjectViewer: { loadingState: 'success' },
    workflowSteps: { activeStepTasks: [] },
    workflows: {
      active: {
        configuration: {
          subject_viewer: 'geoMap',
          subject_viewer_config: {}
        }
      }
    },
    ...overrides
  }
}

describe('Component > GeoMapViewerContainer > storeMapper', function () {
  it('forwards tile_layers from subject_viewer_config as the tileLayers prop', function () {
    const tileLayers = [
      { type: 'osm', label: 'OpenStreetMap' },
      {
        type: 'wms',
        label: '2023 imagery',
        url: 'https://imageserver.gisdata.mn.gov/cgi-bin/wms',
        params: { LAYERS: 'fsa2023' }
      }
    ]
    const store = buildStore({
      workflows: {
        active: {
          configuration: {
            subject_viewer: 'geoMap',
            subject_viewer_config: { tile_layers: tileLayers }
          }
        }
      }
    })
    const result = storeMapper(store)
    expect(result.tileLayers).to.deep.equal(tileLayers)
  })

  it('returns an empty tileLayers array when subject_viewer_config has no tile_layers', function () {
    const result = storeMapper(buildStore())
    expect(result.tileLayers).to.deep.equal([])
  })

  it('returns an empty tileLayers array when subject_viewer_config is missing', function () {
    const result = storeMapper(buildStore({
      workflows: {
        active: {
          configuration: { subject_viewer: 'geoMap' }
        }
      }
    }))
    expect(result.tileLayers).to.deep.equal([])
  })

  it('returns an empty tileLayers array when no workflow is active', function () {
    const result = storeMapper(buildStore({ workflows: { active: undefined } }))
    expect(result.tileLayers).to.deep.equal([])
  })

  it('preserves the existing storeMapper outputs (subject, loadingState, activeStepTasks, latest)', function () {
    const subject = { id: 'subject-2', stepHistory: { latest: { foo: 'bar' } } }
    const activeStepTasks = [{ type: 'geoDrawing' }]
    const result = storeMapper(buildStore({
      subjects: { active: subject },
      subjectViewer: { loadingState: 'loading' },
      workflowSteps: { activeStepTasks }
    }))
    expect(result.subject).to.equal(subject)
    expect(result.loadingState).to.equal('loading')
    expect(result.activeStepTasks).to.equal(activeStepTasks)
    expect(result.latest).to.deep.equal({ foo: 'bar' })
  })
})
