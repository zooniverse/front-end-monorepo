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
    instruction: 'Correct the text',
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
      annotation.update('Hello, this is an existing annotation')
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

    it('should preserve an existing annotation', function () {
      const textArea = wrapper.find(TextArea).getDOMNode()
      expect(textArea.value).to.equal('Hello, this is an existing annotation')
    })
  })

  describe('on change', function () {
    before(function () {
      annotation.update('Hello, this is an existing annotation')
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
