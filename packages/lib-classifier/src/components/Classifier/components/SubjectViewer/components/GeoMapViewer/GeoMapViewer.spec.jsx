import { composeStory } from '@storybook/react'
import { render, waitFor } from '@testing-library/react'
import Meta, { Default } from './GeoMapViewer.stories'

describe('Component > GeoMapViewer', function () {
  describe('default map', function () {
    it('should show the map container', async function () {
      const MockGeoMapViewer = composeStory(Default, Meta)
      render(<MockGeoMapViewer />)
      const mapContainer = document.querySelector('.map-container')
      await waitFor(() => {
        expect(mapContainer).to.exist
      })
    })
  })
})
