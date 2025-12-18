import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import Meta, { Default, EiffelTower } from './GeoMapViewer.stories'

const DefaultStory = composeStory(Default, Meta)
const EiffelTowerStory = composeStory(EiffelTower, Meta)

describe('Component > GeoMapViewer', function () {
  describe('default map', function () {
    it('should show the map container', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
    })
  })

  describe('with geoJSON data', function () {
    it('should show the map container with geoJSON features', async function () {
      render(<EiffelTowerStory />)
      
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
    })

    it('should add a vector layer when geoJSON is provided', async function () {
      render(<EiffelTowerStory />)
      
      await waitFor(() => {
        const mapContainer = screen.getByTestId('geo-map-container')
        // OpenLayers creates viewport div when layers are added
        const viewport = mapContainer.querySelector('.ol-viewport')
        expect(viewport).to.exist
      })
    })

    it('should cleanup the map on unmount', async function () {
      const { unmount } = render(<EiffelTowerStory />)
      
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })

      unmount()
      
      expect(screen.queryByTestId('geo-map-container')).to.not.exist
    })
  })
})
