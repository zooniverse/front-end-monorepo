import taskRegistry from './'

describe('Task models', function () {
  const taskTypes = Object.keys(taskRegistry.register)
  taskTypes.forEach(function (taskType) {
    let task
    describe(taskType, function () {
      before(function () {
        const taskSnapshot = {
          answers: [],
          instruction: `${taskType} instructions`,
          options: [ '1', '2', '3', '4' ],
          question: `${taskType} question`,
          taskKey: 'init',
          type: taskType
        }
        const { TaskModel } = taskRegistry.get(taskType)
        task = TaskModel.create(taskSnapshot)
      })

      it('should exist', function () {
        expect(task).to.be.ok()
      })

      describe('annotations', function () {
        let annotation

        before(function () {
          annotation = task.createAnnotation()
        })

        it('should exist', function () {
          expect(annotation).to.be.ok()
        })

        it('should store the task key', function () {
          expect(annotation.task).to.equal(task.taskKey)
        })

        it('should store the task type', function () {
          expect(annotation.taskType).to.equal(taskType)
        })

        it('should not be in progress', function () {
          expect(annotation._inProgress).to.be.false()
        })

        describe('on update', function () {
          it('should be marked in progress', function () {
            annotation.update(annotation.value)
            expect(annotation._inProgress).to.be.true()
          })
        })
      })
    })
  })
})