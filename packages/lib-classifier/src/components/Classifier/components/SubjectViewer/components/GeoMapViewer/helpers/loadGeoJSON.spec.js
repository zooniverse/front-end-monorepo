import { Map, View } from 'ol'
import { Select } from 'ol/interaction'
import { transformExtent } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { GEOJSON_READ_OPTIONS } from './constants'
import loadGeoJSON from './loadGeoJSON'

const pointCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [2.2944810, 48.8583701] },
      properties: {}
    }
  ]
}

describe('helpers > loadGeoJSON', function () {
  let source, map, select

  beforeEach(function () {
    source = new VectorSource()
    const layer = new VectorLayer({ source })
    map = new Map({
      layers: [layer],
      view: new View({ center: [0, 0], zoom: 1 })
    })
    map.setSize([800, 600])
    select = new Select({ layers: [layer] })
    map.addInteraction(select)
  })

  afterEach(function () {
    map.setTarget(undefined)
  })

  it('adds the subject features to the source', function () {
    loadGeoJSON({ map, source, select, data: pointCollection })
    expect(source.getFeatures()).to.have.length(1)
  })

  it('selects the first feature by default', function () {
    loadGeoJSON({ map, source, select, data: pointCollection })
    expect(select.getFeatures().getLength()).to.equal(1)
  })

  it('does not select any feature when autoSelect is false', function () {
    loadGeoJSON({ map, source, select, data: pointCollection, autoSelect: false })
    expect(source.getFeatures()).to.have.length(1)
    expect(select.getFeatures().getLength()).to.equal(0)
  })

  it('clears the source and selects nothing when data is null', function () {
    loadGeoJSON({ map, source, select, data: pointCollection })
    loadGeoJSON({ map, source, select, data: null })
    expect(source.getFeatures()).to.have.length(0)
  })

  it('handles an empty FeatureCollection without selecting', function () {
    loadGeoJSON({ map, source, select, data: { type: 'FeatureCollection', features: [] } })
    expect(source.getFeatures()).to.have.length(0)
    expect(select.getFeatures().getLength()).to.equal(0)
  })

  it('constrains the view to the bbox when the FeatureCollection is empty', function () {
    const bbox = [-91.05, 47.96, -90.97, 48.01]
    loadGeoJSON({ map, source, select, data: { type: 'FeatureCollection', bbox, features: [] } })
    const expected = transformExtent(bbox, GEOJSON_READ_OPTIONS.dataProjection, GEOJSON_READ_OPTIONS.featureProjection)
    expect(map.get('subjectExtent')).to.deep.equal(expected)
    expect(map.getLayers().getArray().some(layer => layer.get('extentMask'))).to.equal(true)
    expect(select.getFeatures().getLength()).to.equal(0)
  })

  it('does not constrain when there is no bbox and no features', function () {
    loadGeoJSON({ map, source, select, data: { type: 'FeatureCollection', features: [] } })
    expect(map.get('subjectExtent')).to.equal(undefined)
    expect(map.getLayers().getArray().some(layer => layer.get('extentMask'))).to.equal(false)
  })
})
