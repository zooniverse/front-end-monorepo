import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'
import { mount, shallow } from 'enzyme'
import { Text, TextArea } from 'grommet'
import { expect } from 'chai'
import TextTask from './'
import { default as Task } from '@plugins/tasks/TextTask'

describe('TextTask', function () {
  let wrapper
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })
  const annotation = task.defaultAnnotation

  before(function () {
    const store = types.model('MockStore', {
      annotation: Task.AnnotationModel,
      task: Task.TaskModel
    })
    .create({
      annotation,
      task
    })
    task.setAnnotation(annotation)
    wrapper = shallow(
      <TextTask
        task={task}
      />
    )
  })

  it('should have a labelled textarea', function () {
    const label = wrapper.find('label')
    expect(label.find(Text).prop('children')).to.equal(task.instruction)
    const textarea = label.find(TextArea)
    expect(textarea.prop('defaultValue')).to.equal(annotation.value)
  })

  describe('text tagging', function () {
    beforeEach(function () {
      annotation.update('Hello, this is some test text.')
      wrapper = mount(
        <TextTask
          task={task}
        />
      )
    })

    it('should render buttons for tagging text', function () {
      expect(wrapper.find('button')).to.have.lengthOf(2)
    })

    task.text_tags.forEach(function (tag) {
      it(`should render a ${tag} button`, function () {
        const button = wrapper.find('button').find({ value: tag })
        expect(button).to.have.lengthOf(1)
      })
    })

    it('should tag text', function () {
      const insertionButton = wrapper.find('button').find({ value: 'insertion' })
      const fakeEvent = {
        currentTarget: {
          value: 'insertion'
        }
      }
      const textArea = wrapper.find(TextArea).getDOMNode()
      textArea.selectionStart = 7
      textArea.selectionEnd = 11
      const expectedText = 'Hello, [insertion]this[/insertion] is some test text.'
      insertionButton.simulate('click', fakeEvent)
      const updatedText = textArea.value
      expect(updatedText).to.equal(expectedText)
    })
  })

  describe('on mount', function () {
    before(function () {
      annotation.update('Hello, this is an existing annotation')
      task.setAnnotation(annotation)
      wrapper = mount(
        <TextTask
          task={task}
        />
      )
    })

    it('should preserve an existing annotation', function () {
      const textArea = wrapper.find(TextArea).getDOMNode()
      expect(textArea.value).to.equal('Hello, this is an existing annotation')
    })
  })

  describe('on unmount', function () {
    before(function () {
      sinon.spy(annotation, 'update')
      annotation.update('Hello, this is an existing annotation')
      task.setAnnotation(annotation)
      wrapper = mount(
        <TextTask
          task={task}
        />
      )
      const textArea = wrapper.find(TextArea).getDOMNode()
      textArea.value = 'This has been edited.'
      wrapper.unmount()
    })

    after(function () {
      annotation.update.restore()
    })

    it('should save the current text', function () {
      expect(annotation.update.withArgs('This has been edited.')).to.have.been.calledOnce()
    })
  })
})
