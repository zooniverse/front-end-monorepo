import HighlighterTask from '@plugins/tasks/experimental/highlighter'

describe('Model > HighlighterTask', function () {
  const highlighterTask = {
    strings: {
      instruction: 'Highlight the text'
    },
    taskKey: 'T0',
    type: 'highlighter'
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
    const task = HighlighterTask.TaskModel.create(highlighterTask)
    expect(task).to.exist
    expect(task).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      HighlighterTask.TaskModel.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = HighlighterTask.TaskModel.create(highlighterTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.exist
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('highlighter')
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
      task = HighlighterTask.TaskModel.create(highlighterTask)
      annotation = task.defaultAnnotation()
    })

    it('should start with an empty array', function () {
      expect(annotation.value).to.be.an('array')
      expect(annotation.value.length).to.equal(0)
    })

    it('should update annotations', function () {
      const highlight1 = {
        start: 0,
        end: 14,
        text: 'This is a test',
        labelInformation: {
          color: '#00979d',
          label: 'test1'
        }
      }
      const highlight2 = {
        start: 20,
        end: 41,
        text: 'This is another test',
        labelInformation: {
          color: '#FFB6AA	',
          label: 'test2'
        }
      }
      annotation.update([ highlight1, highlight2 ])
      expect(annotation.value[0].text).to.equal('This is a test')
      expect(annotation.value[1].text).to.equal('This is another test')
    })
  })
})
