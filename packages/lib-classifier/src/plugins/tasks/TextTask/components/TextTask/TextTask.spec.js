import React from 'react'
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
    wrapper = shallow(
      <TextTask
        annotation={annotation}
        task={task}
      />
    )
  })

  it('should have a labelled textarea', function () {
    const label = wrapper.find('label')
    expect(label.find(Text).prop('children')).to.equal(task.instruction)
    const textarea = label.find(TextArea)
    expect(textarea.prop('value')).to.equal(annotation.value)
  })

  describe('onChange', function () {
    beforeEach(function () {
      annotation.update('')
      wrapper = shallow(
        <TextTask
          annotation={annotation}
          task={task}
        />
      )
    })

    it('should update the textarea', function () {
      const fakeEvent = {
        target: {
          value: 'Hello there!'
        }
      }
      wrapper.find(TextArea).simulate('change', fakeEvent)
      wrapper.setProps({ annotation })
      expect(wrapper.find(TextArea).prop('value')).to.equal(fakeEvent.target.value)
    })

    it('should update the task annotation', function () {
      const textArea = wrapper.find(TextArea)
      const fakeEvent = {
        target: {
          value: 'Hello there!'
        }
      }
      textArea.simulate('change', fakeEvent)
      expect(annotation.value).to.deep.equal(fakeEvent.target.value)
    })
  })

  describe('text tagging', function () {
    beforeEach(function () {
      annotation.update('Hello, this is some test text.')
      wrapper = mount(
        <TextTask
          annotation={annotation}
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
      wrapper.setProps({ annotation })
      expect(wrapper.find(TextArea).prop('value')).to.equal(expectedText)
    })
  })
})
