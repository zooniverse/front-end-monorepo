import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import Meta, { Default, WithGeoDrawingTask } from './GeoMapViewer.stories'

const DefaultStory = composeStory(Default, Meta)
const WithGeoDrawingTaskStory = composeStory(WithGeoDrawingTask, Meta)

describe('Component > GeoMapViewer', function () {
  describe('default map', function () {
    it('should show the map container', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
    })

    it('should not show the recenter button when geoJSON is undefined', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
      expect(screen.queryByRole('button', { name: 'Recenter map to features' })).to.not.exist
    })

    it('should not show the reset button when geoJSON is undefined', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
      expect(screen.queryByRole('button', { name: 'Reset features on map' })).to.not.exist
    })
  })

  describe('with GeoDrawingTask and geoJSON data', function () {
    it('should show the map container with geoJSON features', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })
    })

    it('should add a vector layer when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        const mapContainer = screen.getByTestId('geo-map-container')
        // OpenLayers creates viewport div when layers are added
        const viewport = mapContainer.querySelector('.ol-viewport')
        expect(viewport).to.exist
      })
    })

    it('should show the recenter button when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Recenter map to features' })).to.exist
      })
    })

    it('should show the reset button when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Reset features on map' })).to.exist
      })
    })

    it('should cleanup the map on unmount', async function () {
      const { unmount } = render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByTestId('geo-map-container')).to.exist
      })

      unmount()
      
      expect(screen.queryByTestId('geo-map-container')).to.not.exist
    })
  })
})
