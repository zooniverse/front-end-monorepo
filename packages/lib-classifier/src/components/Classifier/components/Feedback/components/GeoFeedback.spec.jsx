import { render, screen } from '@testing-library/react'
import { Provider } from 'mobx-react'

import GeoFeedback from './GeoFeedback'

describe('Component > GeoFeedback', function () {
  function buildClassifierStore () {
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
              tile_layers: [{ type: 'osm' }]
            }
          }
        }
      }
    }
  }

  it('should render the feedback map container', function () {
    render(
      <Provider classifierStore={buildClassifierStore()}>
        <GeoFeedback />
      </Provider>
    )
    expect(screen.getByTestId('geo-feedback-map')).to.exist
  })

  it('should attach an OpenLayers viewport to the container', function () {
    render(
      <Provider classifierStore={buildClassifierStore()}>
        <GeoFeedback />
      </Provider>
    )
    const container = screen.getByTestId('geo-feedback-map')
    expect(container.querySelector('.ol-viewport')).to.exist
  })
})
