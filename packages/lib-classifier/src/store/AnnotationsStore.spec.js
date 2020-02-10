import AnnotationsStore from './AnnotationsStore'
import Task from '@plugins/tasks/models/Task'

describe('Model > AnnotationsStore', function () {
  let model
  before(function () {
    model = AnnotationsStore.create({})
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have no annotations', function () {
    expect(model.annotations.size).to.equal(0)
  })

  describe(`updating an annotation`, function () {
    const task = Task.create({ taskKey: 'T0', type: 'default', question: 'How many cats?' })

    before(function () {
      model = AnnotationsStore.create({})
    })

    describe('for a new task', function () {
      it('should create a new annotation', function () {
        model.addAnnotation(task)
        expect(model.annotations.size).to.equal(1)
      })

      it('should allow for 0 values', function () {
        const annotation = model.addAnnotation(task, 0)
        expect(annotation.value).to.equal(0)
      })

      it('should allow for null values', function () {
        const annotation = model.addAnnotation(task, null)
        expect(annotation.value).to.be.null
      })
    })

    describe('for an existing task', function () {
      it('should not create a new annotation', function () {
        const annotation = model.addAnnotation(task, 2)
        expect(model.annotations.size).to.equal(1)
        expect(annotation.value).to.equal(2)
      })
    })
  })

  describe(`removing an annotation`, function () {
    const task = Task.create({ taskKey: 'T0', type: 'default', question: 'How many cats?' })

    before(function () {
      model = AnnotationsStore.create({})
    })

    describe('for a new task', function () {
      it('should do nothing', function () {
        expect(model.annotations.size).to.equal(0)
        model.removeAnnotation('T0')
        expect(model.annotations.size).to.equal(0)
      })
    })

    describe('for an existing task', function () {
      it('should remove the existing annotation', function () {
        const annotation = model.addAnnotation(task, 2)
        expect(model.annotations.size).to.equal(1)
        model.removeAnnotation('T0')
        expect(model.annotations.size).to.equal(0)
      })
    })
  })
})
