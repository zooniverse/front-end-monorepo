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
        type: 'Point'
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
    const task = GeoDrawingTask.create(geoDrawingTask)
    expect(task).to.exist
    expect(task).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      GeoDrawingTask.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = GeoDrawingTask.create(geoDrawingTask)
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
      task = GeoDrawingTask.create(geoDrawingTask)
      annotation = task.defaultAnnotation()
    })

    it('should start with a null value', function () {
      expect(annotation.value).to.equal(null)
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
      annotation.update(geoJSON)
      expect(annotation.value.type).to.equal('FeatureCollection')
      expect(annotation.value.features.length).to.equal(1)
    })
  })

  describe('Actions > setMapExtent', function () {
    let task

    before(function () {
      task = GeoDrawingTask.create(geoDrawingTask)
    })

    it('should set mapExtentMeters', function () {
      const extentInfo = {
        widthMeters: 10000,
        heightMeters: 8000,
        resolution: 1.5
      }
      task.setMapExtent(extentInfo)
      expect(task.mapExtentMeters).to.deep.equal(extentInfo)
    })

    it('should start with null mapExtentMeters', function () {
      const newTask = GeoDrawingTask.create(geoDrawingTask)
      expect(newTask.mapExtentMeters).to.equal(null)
    })

    it('should update mapExtentMeters when called multiple times', function () {
      const firstExtent = { widthMeters: 5000, heightMeters: 4000, resolution: 2.0 }
      const secondExtent = { widthMeters: 15000, heightMeters: 12000, resolution: 1.0 }
      
      task.setMapExtent(firstExtent)
      expect(task.mapExtentMeters).to.deep.equal(firstExtent)
      
      task.setMapExtent(secondExtent)
      expect(task.mapExtentMeters).to.deep.equal(secondExtent)
    })
  })

  describe('Actions > reset', function () {
    let task

    before(function () {
      const taskWithMultipleTools = {
        ...geoDrawingTask,
        tools: [
          { label: 'Map Point', type: 'Point', color: '#ff0000' },
          { label: 'Map Point with Uncertainty', type: 'Point', color: '#00ff00', uncertainty_circle: true }
        ]
      }
      task = GeoDrawingTask.create(taskWithMultipleTools)
    })

    it('should reset activeToolIndex to 0', function () {
      // Set up some state
      task.setActiveTool(1)
      expect(task.activeToolIndex).to.equal(1)
      
      // Reset the task
      task.reset()
      expect(task.activeToolIndex).to.equal(0)
    })

    it('should clear activeOlFeature to null', function () {
      // Set up some state
      const mockOlFeature = { id: 'mock-ol-feature' }
      task.setActiveOlFeature(mockOlFeature)
      expect(task.activeOlFeature).to.deep.equal(mockOlFeature)
      
      // Reset the task
      task.reset()
      expect(task.activeOlFeature).to.equal(null)
    })

    it('should clear mapExtentMeters to null', function () {
      // Set up some state
      task.setMapExtent({ widthMeters: 10000, heightMeters: 8000, resolution: 1.5 })
      expect(task.mapExtentMeters).to.not.equal(null)
      
      // Reset the task
      task.reset()
      expect(task.mapExtentMeters).to.equal(null)
    })
  })
})
