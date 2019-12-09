import Tool from './Tool'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'
import taskRegistry from '@plugins/tasks'
import ClassificationStore from '@store/ClassificationStore'

const toolData = {
  color: '#ff0000',
  label: 'Point',
  max: '10',
  min: 1
}

describe('Model > DrawingTools > Tool', function () {
  it('should exist', function () {
    const tool = Tool.create(toolData)
    expect(tool).to.exist()
    expect(tool).to.be.an('object')
  })
  
  describe('tool.createMark', function () {
    it('should add a new mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      expect(tool.marks.size).to.equal(1)
    })
  })

  describe('tool.deleteMark', function () {
    it('should remove a mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      tool.deleteMark(mark)
      expect(tool.marks).to.be.empty()
    })
  })

  describe('with fewer than the minimum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
    })

    it('should be incomplete', function () {
      expect(tool.isComplete).to.be.false()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })
  
  describe('with the minimum marks but fewer than the maximum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
      const ids = ['1', '2']
      ids.forEach(id => tool.createMark({ id }))
    })

    it('should be complete', function () {
      expect(tool.isComplete).to.be.true()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })
  
  describe('with the maximum marks', function () {
    it('should be disabled', function () {
      const tool = Tool.create(toolData)
      const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      ids.forEach(id => tool.createMark({ id }))
      expect(tool.disabled).to.be.true()
    })
  })

  describe('with subtasks', function () {
    const SingleChoiceTask = taskRegistry.get('single').TaskModel
    const MultipleChoiceTask = taskRegistry.get('multiple').TaskModel

    describe('with incomplete, optional tasks', function () {
      let tasks
      before(function () {
        tasks = [
          MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: false })),
          SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: false }))
        ]
      })

      it('should be complete', function () {
        const tool = Tool.create(Object.assign({}, toolData, { tasks }))
        tool.classifications = ClassificationStore.create()
        expect(tool.hasCompletedTasks).to.be.true()
      })
    })

    describe('with any incomplete, required tasks', function () {
      let tasks
      before(function () {
        tasks = [
          MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: false })),
          SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: true }))
        ]
      })

      it('should be incomplete', function () {
        const tool = Tool.create(Object.assign({}, toolData, { tasks }))
        tool.classifications = ClassificationStore.create()
        expect(tool.hasCompletedTasks).to.be.false()
      })
    })

    describe('with only required tasks', function () {
      let tool
      let tasks
      before(function () {
        tasks = [
          MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: true })),
          SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: true }))
        ]
        tool = Tool.create(Object.assign({}, toolData, { tasks }))
        tool.classifications = ClassificationStore.create()
        const mockSubject = {
          id: 'subject',
          metadata: {}
        }
        const mockWorkflow = {
          id: 'workflow',
          version: '1.0'
        }
        const mockProject = {
          id: 'project'
        }
        tool.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
      })

      it('should be incomplete', function () {
        expect(tool.hasCompletedTasks).to.be.false()
      })

      describe('after annotating task T1', function () {
        it('should still be incomplete', function () {
          tasks[0].updateAnnotation([1])
          expect(tool.hasCompletedTasks).to.be.false()
        })

        it('should have one complete task', function () {
          expect(tasks[0].isComplete).to.be.true()
          expect(tasks[1].isComplete).to.be.false()
        })
      })

      describe('after annotating tasks T1 & T2', function () {
        it('should be complete', function () {
          tasks[1].updateAnnotation(1)
          expect(tool.hasCompletedTasks).to.be.true()
        })

        it('should have two complete tasks', function () {
          expect(tasks[0].isComplete).to.be.true()
          expect(tasks[1].isComplete).to.be.true()
        })
      })
    })
  })
})
