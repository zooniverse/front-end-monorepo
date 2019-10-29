import React from 'react'
import { mount, shallow } from 'enzyme'
import { Text, TextArea } from 'grommet'
import { expect } from 'chai'
import sinon from 'sinon'

import TextTask from './'

describe('TextTask', function () {
  let wrapper
  const mockTask = {
    annotation: {
      task: 'T0',
      value: ''
    },
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    updateAnnotation: sinon.stub()
  }

  before(function () {
    wrapper = shallow(
      <TextTask
        task={mockTask}
      />
    )
  })

  it('should have a labelled textarea', function () {
    const label = wrapper.find('label')
    expect(label.find(Text).prop('children')).to.equal(mockTask.instruction)
    const textarea = label.find(TextArea)
    expect(textarea.prop('value')).to.equal(mockTask.annotation.value)
  })

  describe('onChange', function () {
    beforeEach(function () {
      wrapper = shallow(
        <TextTask
          task={mockTask}
        />
      )
    })

    afterEach(function () {
      mockTask.updateAnnotation.resetHistory()
    })

    it('should update the textarea', function () {
      const textArea = wrapper.find(TextArea)
      const fakeEvent = {
        target: {
          value: 'Hello there!'
        }
      }
      textArea.simulate('change', fakeEvent)
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
      expect(mockTask.updateAnnotation.withArgs(fakeEvent.target.value)).to.have.been.calledOnce()
    })
  })

  describe('text tagging', function () {
    beforeEach(function () {
      const annotation = {
        task: 'T0',
        value: 'Hello, this is some test text.'
      }
      wrapper = mount(
        <TextTask
          task={Object.assign({}, mockTask, { annotation })}
        />
      )
    })

    afterEach(function () {
      mockTask.updateAnnotation.resetHistory()
    })

    it('should render buttons for tagging text', function () {
      expect(wrapper.find('button')).to.have.lengthOf(2)
    })

    mockTask.text_tags.forEach(function (tag) {
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
      expect(textArea.value).to.equal(expectedText)
    })
  })
})
