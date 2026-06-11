import TileLayer from 'ol/layer/Tile'
import WebGLTileLayer from 'ol/layer/WebGLTile'
import OSM from 'ol/source/OSM'
import GeoTIFF from 'ol/source/GeoTIFF'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'
import createTileLayer from './createTileLayer'

describe('helpers > createTileLayer', function () {
  it('builds an OSM tile layer for type osm', function () {
    const layer = createTileLayer({ type: 'osm', label: 'OpenStreetMap' })
    expect(layer).to.be.instanceOf(TileLayer)
    expect(layer.getSource()).to.be.instanceOf(OSM)
  })

  it('builds a WMS tile layer for type wms', function () {
    const layer = createTileLayer({
      type: 'wms',
      url: 'https://imageserver.gisdata.mn.gov/cgi-bin/wms?',
      params: { LAYERS: 'fsa2023' }
    })
    expect(layer).to.be.instanceOf(TileLayer)
    expect(layer.getSource()).to.be.instanceOf(TileWMS)
    expect(layer.getSource().getParams().LAYERS).to.equal('fsa2023')
  })

  it('builds an XYZ tile layer for type xyz', function () {
    const layer = createTileLayer({
      type: 'xyz',
      url: 'https://tiles.example.com/{z}/{x}/{y}.png'
    })
    expect(layer).to.be.instanceOf(TileLayer)
    expect(layer.getSource()).to.be.instanceOf(XYZ)
  })

  it('builds a WebGL tile layer with a GeoTIFF source for type cog', function () {
    const layer = createTileLayer({
      type: 'cog',
      url: 'https://example.com/imagery/cog.tif'
    })
    expect(layer).to.be.instanceOf(WebGLTileLayer)
    expect(layer.getSource()).to.be.instanceOf(GeoTIFF)
  })

  it('sets attributions on a cog GeoTIFF source', function () {
    const layer = createTileLayer({
      type: 'cog',
      url: 'https://example.com/imagery/cog.tif',
      attributions: 'MnGeo'
    })
    expect(layer.getSource().getAttributions()).to.be.a('function')
  })

  it('throws when cog descriptor omits url', function () {
    expect(() => createTileLayer({ type: 'cog' })).to.throw(/url/i)
  })

  it('defaults wms FORMAT to image/png when neither format nor params.FORMAT is set', function () {
    const layer = createTileLayer({
      type: 'wms',
      url: 'https://example.org/wms',
      params: { LAYERS: 'foo' }
    })
    expect(layer.getSource().getParams().FORMAT).to.equal('image/png')
  })

  it('uses the first-class format field for wms FORMAT', function () {
    const layer = createTileLayer({
      type: 'wms',
      format: 'image/jpeg',
      url: 'https://imageserver.gisdata.mn.gov/cgi-bin/wms?',
      params: { LAYERS: 'fsa2023' }
    })
    expect(layer.getSource().getParams().FORMAT).to.equal('image/jpeg')
  })

  it('falls back to params.FORMAT when no first-class format is set', function () {
    const layer = createTileLayer({
      type: 'wms',
      url: 'https://example.org/wms',
      params: { LAYERS: 'foo', FORMAT: 'image/png8' }
    })
    expect(layer.getSource().getParams().FORMAT).to.equal('image/png8')
  })

  it('prefers the first-class format field over params.FORMAT', function () {
    const layer = createTileLayer({
      type: 'wms',
      format: 'image/jpeg',
      url: 'https://example.org/wms',
      params: { LAYERS: 'foo', FORMAT: 'image/png' }
    })
    expect(layer.getSource().getParams().FORMAT).to.equal('image/jpeg')
  })

  it('passes a projection through to a wms source', function () {
    const layer = createTileLayer({
      type: 'wms',
      url: 'https://example.org/wms',
      params: { LAYERS: 'foo' },
      projection: 'EPSG:4326'
    })
    expect(layer.getSource().getProjection().getCode()).to.equal('EPSG:4326')
  })

  it('passes a projection through to an xyz source', function () {
    const layer = createTileLayer({
      type: 'xyz',
      url: 'https://tiles.example.com/{z}/{x}/{y}.png',
      projection: 'EPSG:4326'
    })
    expect(layer.getSource().getProjection().getCode()).to.equal('EPSG:4326')
  })

  it('defaults an xyz source to EPSG:3857 when no projection is set', function () {
    const layer = createTileLayer({
      type: 'xyz',
      url: 'https://tiles.example.com/{z}/{x}/{y}.png'
    })
    expect(layer.getSource().getProjection().getCode()).to.equal('EPSG:3857')
  })

  it('accepts a projection on a cog descriptor without throwing (applied at render)', function () {
    const layer = createTileLayer({
      type: 'cog',
      url: 'https://example.com/imagery/cog.tif',
      projection: 'EPSG:26915'
    })
    expect(layer).to.be.instanceOf(WebGLTileLayer)
  })

  it('passes attributions through to the source', function () {
    const layer = createTileLayer({
      type: 'wms',
      url: 'https://example.org/wms',
      params: { LAYERS: 'foo' },
      attributions: 'MnGeo'
    })
    expect(layer.getSource().getAttributions()).to.be.a('function')
  })

  it('throws when wms descriptor omits url', function () {
    expect(() => createTileLayer({ type: 'wms', params: { LAYERS: 'foo' } })).to.throw(/url/i)
  })

  it('throws when wms descriptor omits params.LAYERS', function () {
    expect(() => createTileLayer({ type: 'wms', url: 'https://example.org/wms' })).to.throw(/LAYERS/i)
  })

  it('throws when xyz descriptor omits url', function () {
    expect(() => createTileLayer({ type: 'xyz' })).to.throw(/url/i)
  })

  it('throws on an unknown descriptor type', function () {
    expect(() => createTileLayer({ type: 'bogus' })).to.throw(/unknown descriptor type/i)
  })
})
