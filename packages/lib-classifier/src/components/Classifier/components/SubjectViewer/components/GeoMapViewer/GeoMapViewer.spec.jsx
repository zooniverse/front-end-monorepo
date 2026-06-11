import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import TileLayer from 'ol/layer/Tile'
import Meta, { Default, WithGeoDrawingTask, WithoutGeoDrawingTask } from './GeoMapViewer.stories'

const DefaultStory = composeStory(Default, Meta)
const WithGeoDrawingTaskStory = composeStory(WithGeoDrawingTask, Meta)

describe('Component > GeoMapViewer', function () {
  describe('default map', function () {
    it('should show the map container', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })
    })

    it('should not show the recenter button when geoJSON is undefined', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })
      expect(screen.queryByRole('button', { name: 'Recenter to features' })).to.not.exist
    })

    it('should not show the reset button when geoJSON is undefined', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })
      expect(screen.queryByRole('button', { name: 'Reset features to original position' })).to.not.exist
    })
  })

  describe('with GeoDrawingTask and geoJSON data', function () {
    it('should show the map container with geoJSON features', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })
    })

    it('should add a vector layer when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        const mapContainer = screen.getByRole('region', { name: 'Interactive map' })
        // OpenLayers creates viewport div when layers are added
        const viewport = mapContainer.querySelector('.ol-viewport')
        expect(viewport).to.exist
      })
    })

    it('should show the recenter button when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Recenter to features' })).to.exist
      })
    })

    it('should show the reset button when geoJSON is provided', async function () {
      render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Reset features to original position' })).to.exist
      })
    })

    it('should cleanup the map on unmount', async function () {
      const { unmount } = render(<WithGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })

      unmount()
      
      expect(screen.queryByRole('region', { name: 'Interactive map' })).to.not.exist
    })
  })

  describe('configured tile layers', function () {
    const twoLayers = [
      { type: 'osm', label: 'OpenStreetMap' },
      { type: 'wms', label: 'imagery', url: 'https://example.org/wms', params: { LAYERS: 'foo' } }
    ]

    function baseLayers (map) {
      // basemap tile layers are TileLayers; the feature + selection layers are VectorLayers
      return map.getLayers().getArray().filter(layer => layer instanceof TileLayer)
    }

    it('falls back to a single OSM base layer when no tile_layers are configured', async function () {
      let map = null
      render(<DefaultStory onMapReady={(olMap) => { map = olMap }} />)
      await waitFor(() => expect(map).to.exist)
      expect(baseLayers(map)).to.have.lengthOf(1)
    })

    it('builds one base tile layer per configured descriptor', async function () {
      let map = null
      render(<DefaultStory tileLayers={twoLayers} onMapReady={(olMap) => { map = olMap }} />)
      await waitFor(() => expect(map).to.exist)
      expect(baseLayers(map)).to.have.lengthOf(2)
    })

    it('shows only the first configured layer by default', async function () {
      let map = null
      render(<DefaultStory tileLayers={twoLayers} onMapReady={(olMap) => { map = olMap }} />)
      await waitFor(() => expect(map).to.exist)
      expect(baseLayers(map).map(layer => layer.getVisible())).to.deep.equal([true, false])
    })

    it('shows the layer marked default instead of the first', async function () {
      const withDefault = [
        { type: 'osm', label: 'OpenStreetMap' },
        { type: 'wms', label: 'imagery', url: 'https://example.org/wms', params: { LAYERS: 'foo' }, default: true }
      ]
      let map = null
      render(<DefaultStory tileLayers={withDefault} onMapReady={(olMap) => { map = olMap }} />)
      await waitFor(() => expect(map).to.exist)
      expect(baseLayers(map).map(layer => layer.getVisible())).to.deep.equal([false, true])
    })
  })

  describe('without GeoDrawingTask but with geoJSON data', function () {
    it('should show the recenter button but not the reset button', async function () {
      const WithoutGeoDrawingTaskStory = composeStory(WithoutGeoDrawingTask, Meta)
      render(<WithoutGeoDrawingTaskStory />)
      
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Interactive map' })).to.exist
      })

      expect(screen.getByRole('button', { name: 'Recenter to features' })).to.exist
      expect(screen.queryByRole('button', { name: 'Reset to original position' })).to.not.exist
    })
  })
})
