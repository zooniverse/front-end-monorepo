import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import createWFSSource from './createWFSSource'

const fakeProjection = { getCode: () => 'EPSG:3857' }
const sampleExtent = [-10131597, 6126858, -10018754, 6178060]

describe('helpers > createWFSSource', function () {
  describe('descriptor type "wfs"', function () {
    const wfsDescriptor = {
      type: 'wfs',
      label: 'NHD Hydrography',
      url: 'https://hydro.nationalmap.gov/arcgis/services/nhd/MapServer/WFSServer',
      typeName: 'nhd:NHDFlowline'
    }

    it('returns an OL VectorSource with GeoJSON format', function () {
      const source = createWFSSource(wfsDescriptor)
      expect(source).to.be.instanceof(VectorSource)
      expect(source.getFormat()).to.be.instanceof(GeoJSON)
    })

    it('builds a GetFeature URL containing service=WFS, the configured typeName, the view projection as srsname, and the current bbox', function () {
      const source = createWFSSource(wfsDescriptor)
      const urlFn = source.getUrl()
      expect(urlFn).to.be.a('function')

      const url = urlFn(sampleExtent, 1.0, fakeProjection)
      expect(url).to.include('service=WFS')
      expect(url).to.include('request=GetFeature')
      expect(url).to.include('typeName=nhd%3ANHDFlowline')
      expect(url).to.include('srsname=EPSG%3A3857')
      expect(url).to.include('outputFormat=application%2Fjson')
      expect(url).to.include(`bbox=${sampleExtent.join('%2C')}%2CEPSG%3A3857`)
    })

    it('forwards attributions from the descriptor to the source', function () {
      const source = createWFSSource({
        ...wfsDescriptor,
        attributions: 'Source: U.S. Geological Survey, National Hydrography Dataset'
      })
      const attribFn = source.getAttributions()
      expect(attribFn).to.be.a('function')
      expect(attribFn()[0]).to.include('U.S. Geological Survey')
    })

    it('throws when wfs descriptor omits url', function () {
      expect(() => createWFSSource({ type: 'wfs', typeName: 'foo' })).to.throw(/url/i)
    })

    it('throws when wfs descriptor omits typeName', function () {
      expect(() => createWFSSource({ type: 'wfs', url: 'https://example.org/wfs' })).to.throw(/typeName/)
    })
  })

  describe('descriptor type "geojson"', function () {
    it('returns an OL VectorSource with GeoJSON format and a static url when no bbox placeholder is present', function () {
      const source = createWFSSource({
        type: 'geojson',
        label: 'Project area',
        url: 'https://example.org/static/project-area.geojson'
      })
      expect(source).to.be.instanceof(VectorSource)
      expect(source.getFormat()).to.be.instanceof(GeoJSON)
      expect(source.getUrl()).to.equal('https://example.org/static/project-area.geojson')
    })

    it('uses a bbox-aware URL function when the configured url contains a {bbox} placeholder', function () {
      const source = createWFSSource({
        type: 'geojson',
        label: 'NHD Flowline (REST)',
        url: 'https://hydro.nationalmap.gov/arcgis/rest/services/nhd/MapServer/6/query?where=1%3D1&geometry={bbox}&geometryType=esriGeometryEnvelope&inSR=4326&outSR=4326&f=geojson'
      })
      const urlFn = source.getUrl()
      expect(urlFn).to.be.a('function')

      const url = urlFn(sampleExtent, 1.0, fakeProjection)
      expect(url).to.not.include('{bbox}')
      expect(url).to.include(`geometry=${sampleExtent.join('%2C')}`)
      expect(url).to.include('f=geojson')
    })

    it('forwards attributions from the descriptor to the source', function () {
      const source = createWFSSource({
        type: 'geojson',
        url: 'https://example.org/static/project-area.geojson',
        attributions: 'Project team'
      })
      const attribFn = source.getAttributions()
      expect(attribFn).to.be.a('function')
      expect(attribFn()).to.include('Project team')
    })

    it('throws when geojson descriptor omits url', function () {
      expect(() => createWFSSource({ type: 'geojson' })).to.throw(/url/i)
    })
  })

  it('throws on an unknown descriptor type', function () {
    expect(() => createWFSSource({ type: 'mystery-source', url: 'https://example.org' })).to.throw(/unknown.*type/i)
  })

  it('throws on a null descriptor', function () {
    expect(() => createWFSSource(null)).to.throw()
  })
})
