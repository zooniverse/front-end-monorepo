import { mount, shallow } from 'enzyme'
import { Grommet, TextArea } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import { default as Task } from '@plugins/tasks/experimental/textFromSubject'
import TextFromSubjectContainer from './TextFromSubjectContainer'
import TextFromSubjectTask from './TextFromSubjectTask'

describe('TextFromSubjectContainer', function () {
  let wrapper

  const task = Task.TaskModel.create({
    strings: {
      instruction: 'Correct the text'
    },
    taskKey: 'T0',
    type: 'textFromSubject'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    const shallowOptions = {
      wrappingComponent: <Grommet />,
      wrappingComponentProps: { theme: zooTheme }
    }
    wrapper = shallow(
      <TextFromSubjectContainer
        annotation={annotation}
        task={task}
      />,
      shallowOptions
    )
  })

  it('should render a TextFromSubjectTask', function () {
    expect(wrapper.find(TextFromSubjectTask)).to.have.lengthOf(1)
  })

  describe('on mount', function () {
    before(function () {
      wrapper = mount(
        <TextFromSubjectContainer
          annotation={annotation}
          task={task}
        />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    describe('with an annotation not initialized from subject', function () {
      it('should have a TextArea with prop of disabled equal to true', function () {
        const textArea = wrapper.find(TextArea).getDOMNode()
        expect(textArea.disabled).to.be.true()
      })
    })

    describe('with an annotation initialized from subject', function () {
      before(function () {
        annotation.updateFromSubject('Initial content from subject.')
      })

      it('should include the initial content from subject', function () {
        const textArea = wrapper.find(TextArea).getDOMNode()
        expect(textArea.value).to.equal('Initial content from subject.')
      })
    })
  })

  describe('on change', function () {
    before(function () {
      annotation.updateFromSubject('Initial content from subject.')
      wrapper = mount(
        <TextFromSubjectContainer
          annotation={annotation}
          task={task}
        />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
      const textArea = wrapper.find(TextArea).getDOMNode()
      textArea.value = 'This has been edited.'
      wrapper.find(TextArea).simulate('change')
    })

    it('should save the current text', function () {
      expect(annotation.value).to.equal('This has been edited.')
    })
  })
})
