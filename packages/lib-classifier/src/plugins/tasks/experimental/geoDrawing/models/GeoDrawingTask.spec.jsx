import GeoDrawingTask from './GeoDrawingTask'

describe('Model > GeoDrawingTask', function () {
  const geoDrawingTask = {
    strings: {
      instruction: 'Draw a point on the map.'
    },
    taskKey: 'T0',
    tools: [
      {
        label: 'Map Point',
        type: 'geoPoint'
      }
    ],
    type: 'geoDrawing'
  }

  const singleChoiceTask = {
    answers: [
      { label: 'yes', next: 'S2' },
      { label: 'no', next: 'S3' }
    ],
    strings: {
      question: 'Do you exist?'
    },
    required: '',
    taskKey: 'T1',
    type: 'single'
  }

  it('should exist', function () {
    const task = GeoDrawingTask.TaskModel.create(geoDrawingTask)
    expect(task).to.exist
    expect(task).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      GeoDrawingTask.TaskModel.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = GeoDrawingTask.TaskModel.create(geoDrawingTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.exist
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('geoDrawing')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = GeoDrawingTask.TaskModel.create(geoDrawingTask)
      annotation = task.defaultAnnotation()
    })

    it('should start with an empty array', function () {
      expect(annotation.value).to.be.an('array')
      expect(annotation.value.length).to.equal(0)
    })

    it('should update annotations', function () {
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
      annotation.update([geoJSON])
      expect(annotation.value.length).to.equal(1)
      expect(annotation.value[0].type).to.equal('FeatureCollection')
    })
  })
})
