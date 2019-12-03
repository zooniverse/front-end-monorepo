import AnnotationsStore from './AnnotationsStore'
import taskRegistry from '@plugins/tasks'

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
    const SingleChoiceTask = taskRegistry.get('single').TaskModel
    const task = SingleChoiceTask.create({ taskKey: 'T0', type: 'single', question: 'How many cats?' })

    describe('for a new task', function () {
      it('should create a new annotation', function () {
        model.addAnnotation(task)
        expect(model.annotations.size).to.equal(1)
      })
    })

    describe('for an existing task', function () {
      it('should not create a new annotation', function () {
        model.addAnnotation(task, 2)
        expect(model.annotations.size).to.equal(1)
      })
    })
  })
})