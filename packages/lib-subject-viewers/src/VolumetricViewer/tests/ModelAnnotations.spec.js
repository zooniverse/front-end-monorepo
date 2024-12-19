import { ModelAnnotations } from './../models/ModelAnnotations'

describe('Component > VolumetricViewer > ModelAnnotations', () => {
  const ANNOTATION_THRESHOLD = 15
  const model = ModelAnnotations({ onAnnotation: () => {} })
  const viewerMock = {
    setPointsAnnotationIndex: () => {}
  }

  it('should have initial state', () => {
    expect(model).to.exist()
    expect(model.annotations).to.exist()
    expect(model.annotations.length).to.equal(0)
    expect(model.config).deep.to.equal({
      activeAnnotation: null,
      algorithm: null,
      viewer: false
    })
    expect(model._listeners.length).to.equal(0)
  })

  it('should initialize()', () => {
    const configData = {
      viewer: viewerMock
    }

    model.initialize(configData)

    expect(model.config).deep.to.equal({
      activeAnnotation: null,
      algorithm: null,
      viewer: viewerMock
    })
  })

  it('should create a new annotation', (done) => {
    const activePoint = 1

    const addAnnotationListener = (obj) => {
      model.off('add:annotation', addAnnotationListener)

      expect(obj.annotationIndex).to.equal(0)

      expect(obj.annotations.length).to.equal(1)
      expect(obj.annotations[0]).to.equal(obj.annotation)

      expect(obj.annotation.label).to.equal('Annotation 2')
      expect(obj.annotation.threshold).to.equal(ANNOTATION_THRESHOLD)
      expect(obj.annotation.points.active).deep.to.equal([activePoint])
      expect(obj.annotation.points.connected).deep.to.equal([[]])
      expect(obj.annotation.points.all.data).deep.to.equal([])

      expect(model.config.activeAnnotation).to.equal(0)
      expect(model.annotations.length).to.equal(1)
      expect(model.annotations[0]).to.equal(obj.annotation)

      done()
    }

    model.on('add:annotation', addAnnotationListener)
    model.actions.annotation.add({ point: activePoint })
  })

  it('should create a second annotation', (done) => {
    const pointToAdd = 2

    const addAnnotationListener = (obj) => {
      model.off('add:annotation', addAnnotationListener)

      expect(obj.annotationIndex).to.equal(1)

      expect(obj.annotations.length).to.equal(pointToAdd)
      expect(obj.annotations[0]).not.to.equal(obj.annotation)
      expect(obj.annotations[1]).to.equal(obj.annotation)

      expect(obj.annotation.label).to.equal('Annotation 3')
      expect(obj.annotation.threshold).to.equal(ANNOTATION_THRESHOLD)
      expect(obj.annotation.points.active).deep.to.equal([pointToAdd])
      expect(obj.annotation.points.connected).deep.to.equal([[]])
      expect(obj.annotation.points.all.data).deep.to.equal([])

      expect(model.config.activeAnnotation).to.equal(1)
      expect(model.annotations.length).to.equal(2)
      expect(model.annotations[0]).not.to.equal(obj.annotation)
      expect(model.annotations[1]).to.equal(obj.annotation)

      done()
    }

    model.on('add:annotation', addAnnotationListener)
    model.actions.annotation.add({ point: pointToAdd })
  })

  it('should make the first annotation active', (done) => {
    const activeIndex = 0

    const activeAnnotationListener = (obj) => {
      model.off('active:annotation', activeAnnotationListener)

      expect(obj.annotationIndex).to.equal(activeIndex)
      expect(model.config.activeAnnotation).to.equal(obj.annotationIndex)
      done()
    }

    expect(model.config.activeAnnotation).not.to.equal(activeIndex)
    model.on('active:annotation', activeAnnotationListener)
    model.actions.annotation.active({ index: activeIndex })
  })

  it('should remove the first annotation', (done) => {
    const activeIndex = 0

    const removeAnnotationListener = (obj) => {
      model.off('remove:annotation', removeAnnotationListener)

      expect(obj.annotationIndex).to.equal(activeIndex)
      expect(obj.annotation.label).to.equal('Annotation 2')
      expect(obj.annotations.length).to.equal(1)
      expect(obj.annotations[0]).not.to.equal(obj.annotation)

      expect(model.config.activeAnnotation).to.equal(null)
      expect(model.annotations.length).to.equal(1)
      expect(model.annotations[0]).not.to.equal(obj.annotation)
      done()
    }

    model.on('remove:annotation', removeAnnotationListener)
    model.actions.annotation.remove({ index: activeIndex })
  })

  it('should add a point to no active annotation, creating a new annotation', (done) => {
    const activePoint = 3

    const addAnnotationListener = (obj) => {
      model.off('add:annotation', addAnnotationListener)

      expect(obj.annotationIndex).to.equal(1)

      expect(obj.annotations.length).to.equal(2)
      expect(obj.annotations[1]).to.equal(obj.annotation)

      expect(obj.annotation.label).to.equal('Annotation 4')
      expect(obj.annotation.threshold).to.equal(ANNOTATION_THRESHOLD)
      expect(obj.annotation.points.active).deep.to.equal([activePoint])
      expect(obj.annotation.points.connected).deep.to.equal([[]])
      expect(obj.annotation.points.all.data).deep.to.equal([])

      expect(model.config.activeAnnotation).to.equal(1)
      expect(model.annotations.length).to.equal(2)
      expect(model.annotations[1]).to.equal(obj.annotation)

      done()
    }

    model.on('add:annotation', addAnnotationListener)
    model.actions.point.add({ point: activePoint })
  })

  it('should add a point to an active annotation', (done) => {
    const activePoint = 4
    const activeIndex = model.config.activeAnnotation

    const updateAnnotationListener = (obj) => {
      model.off('update:annotation', updateAnnotationListener)

      expect(obj.annotationIndex).to.equal(activeIndex)
      expect(obj.annotations.length).to.equal(2)

      expect(obj.annotation.label).to.equal('Annotation 4')
      expect(obj.annotation.points.active).deep.to.equal([3, 4])
      expect(obj.annotation.points.connected).deep.to.equal([[], []])
      expect(obj.annotation.points.all.data).deep.to.equal([])

      expect(model.config.activeAnnotation).to.equal(activeIndex)
      expect(model.annotations.length).to.equal(2)
      done()
    }

    model.on('update:annotation', updateAnnotationListener)
    model.actions.point.add({ point: activePoint })
  })

  it('should export the current annotation data', () => {
    const data = model.export()

    expect(data).deep.to.equal([
      {
        label: 'Annotation 3',
        points: {
          active: [2],
          connected: [[]]
        },
        threshold: 15
      },
      {
        label: 'Annotation 4',
        points: {
          active: [3, 4],
          connected: [[], []]
        },
        threshold: 15
      }
    ])
  })
})
