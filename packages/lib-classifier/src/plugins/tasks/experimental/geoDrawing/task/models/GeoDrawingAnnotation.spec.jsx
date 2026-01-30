import GeoDrawingAnnotation from './GeoDrawingAnnotation'

describe('Model > GeoDrawingAnnotation', function () {
  describe('without a GeoJSON value', function () {
    let geoDrawingAnnotation

    before(function () {
      geoDrawingAnnotation = GeoDrawingAnnotation.create({ id: 'geo1', task: 'T0', taskType: 'geoDrawing' })
    })

    it('should exist', function () {
      expect(geoDrawingAnnotation).to.exist
      expect(geoDrawingAnnotation).to.be.an('object')
    })

    it('should have an empty value array', function () {
      expect(geoDrawingAnnotation.value).to.deep.equal([])
    })

    it('should be incomplete', function () {
      expect(geoDrawingAnnotation.isComplete).to.equal(false)
    })
  })

  describe('with a GeoJSON value', function () {
    let geoDrawingAnnotation
    const geoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [2.2944810, 48.8583701]
          },
          properties: {
            name: 'Eiffel Tower'
          }
        }
      ]
    }

    before(function () {
      geoDrawingAnnotation = GeoDrawingAnnotation.create({
        id: 'geo2',
        task: 'T0',
        taskType: 'geoDrawing',
        value: [geoJSON]
      })
    })

    it('should exist', function () {
      expect(geoDrawingAnnotation).to.exist
      expect(geoDrawingAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(geoDrawingAnnotation.isComplete).to.equal(true)
    })

    it('should store the GeoJSON value', function () {
      expect(geoDrawingAnnotation.value.length).to.equal(1)
      expect(geoDrawingAnnotation.value[0].type).to.equal('FeatureCollection')
    })
  })

  describe('Actions > update', function () {
    it('should update the annotation value', function () {
      const geoJSON = {
        type: 'FeatureCollection',
        features: []
      }
      const geoDrawingAnnotation = GeoDrawingAnnotation.create({
        id: 'geo3',
        task: 'T0',
        taskType: 'geoDrawing'
      })

      expect(geoDrawingAnnotation.value.length).to.equal(0)

      geoDrawingAnnotation.update([geoJSON])

      expect(geoDrawingAnnotation.value.length).to.equal(1)
      expect(geoDrawingAnnotation.value[0].type).to.equal('FeatureCollection')
    })
  })
})
