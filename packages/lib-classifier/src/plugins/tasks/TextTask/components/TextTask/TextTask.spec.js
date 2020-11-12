import { mount, shallow } from 'enzyme'
import { Grommet, TextArea } from 'grommet'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import TextTask from './'
import { default as Task } from '@plugins/tasks/TextTask'
import DefaultTextTask from './components/DefaultTextTask'
import TextTaskWithSuggestions from './components/TextTaskWithSuggestions'

describe('TextTask', function () {
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })
  const annotation = task.defaultAnnotation

  before(function () {
    types.model('MockStore', {
      annotation: Task.AnnotationModel,
      task: Task.TaskModel
    })
    .create({
      annotation,
      task
    })
    task.setAnnotation(annotation)
  })

  describe('default task', function () {
    let wrapper
    before(function () {
      const shallowOptions = {
        wrappingComponent: <Grommet />,
        wrappingComponentProps: { theme: zooTheme }
      }
      wrapper = shallow(
        <TextTask
          task={task}
        />,
        shallowOptions
      )
    })

    it('should render a DefaultTextTask', function () {
      expect(wrapper.find(DefaultTextTask)).to.have.lengthOf(1)
    })

    describe('text tagging', function () {
      beforeEach(function () {
        sinon.spy(annotation, 'update')
        annotation.update('Hello, this is some test text.')
        wrapper = mount(
          <TextTask
            task={task}
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        const insertionButton = wrapper.find('button').find({ value: 'insertion' })
        const fakeEvent = {
          currentTarget: {
            value: 'insertion'
          }
        }
        const textArea = wrapper.find(TextArea).getDOMNode()
        textArea.selectionStart = 7
        textArea.selectionEnd = 11
        insertionButton.simulate('click', fakeEvent)
      })

      afterEach(function () {
        annotation.update.restore()
      })

      it('should tag text', function () {
        const textArea = wrapper.find(TextArea).getDOMNode()
        const expectedText = 'Hello, [insertion]this[/insertion] is some test text.'
        const updatedText = textArea.value
        expect(updatedText).to.equal(expectedText)
      })

      it('should save the tagged text', function () {
        const expectedText = 'Hello, [insertion]this[/insertion] is some test text.'
        expect(annotation.update.withArgs(expectedText)).to.have.been.calledOnce()
      })
    })

    describe('on mount', function () {
      before(function () {
        annotation.update('Hello, this is an existing annotation')
        task.setAnnotation(annotation)
        wrapper = mount(
          <TextTask
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
        sinon.spy(annotation, 'update')
        annotation.update('Hello, this is an existing annotation')
        task.setAnnotation(annotation)
        wrapper = mount(
          <TextTask
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

      after(function () {
        annotation.update.restore()
      })

      it('should save the current text', function () {
        expect(annotation.update.withArgs('This has been edited.')).to.have.been.calledOnce()
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
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
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
  
  describe('task with suggestions', function () {
    let wrapper
    const suggestions = [
      'a transcribed sentence',
      'a transcribed sentience',
      'a transribed sentence',
      'a conscripted sentience'
    ]
    before(function () {
      wrapper = shallow(
        <TextTask
          subTaskPreviousAnnotationValues={suggestions}
          task={task}
        />
      )
    })

    it('should render a TextTaskWithSuggestions', function () {
      expect(wrapper.find(TextTaskWithSuggestions)).to.have.lengthOf(1)
    })

    describe('text tagging', function () {
      beforeEach(function () {
        sinon.spy(annotation, 'update')
        annotation.update('Hello, this is some test text.')
        wrapper = mount(
          <TextTask
            subTaskPreviousAnnotationValues={suggestions}
            task={task}
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        const insertionButton = wrapper.find('button').find({ value: 'insertion' })
        const fakeEvent = {
          currentTarget: {
            value: 'insertion'
          }
        }
        const textInput = wrapper.find('input').getDOMNode()

        textInput.selectionStart = 7
        textInput.selectionEnd = 11
        insertionButton.simulate('click', fakeEvent)
      })

      afterEach(function () {
        annotation.update.restore()
      })

      it('should tag text', function () {
        const textInput = wrapper.find('input').getDOMNode()
        const expectedText = 'Hello, [insertion]this[/insertion] is some test text.'
        const updatedText = textInput.value
        expect(updatedText).to.equal(expectedText)
      })

      it('should save the tagged text', function () {
        const expectedText = 'Hello, [insertion]this[/insertion] is some test text.'
        expect(annotation.update.withArgs(expectedText)).to.have.been.calledOnce()
      })
    })

    describe('on mount', function () {
      before(function () {
        annotation.update('Hello, this is an existing annotation')
        task.setAnnotation(annotation)
        wrapper = mount(
          <TextTask
            subTaskPreviousAnnotationValues={suggestions}
            task={task}
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
      })

      it('should preserve an existing annotation', function () {
        const textInput = wrapper.find('input').getDOMNode()
        expect(textInput.value).to.equal('Hello, this is an existing annotation')
      })
    })

    describe('on change', function () {
      before(function () {
        sinon.spy(annotation, 'update')
        annotation.update('Hello, this is an existing annotation')
        task.setAnnotation(annotation)
        wrapper = mount(
          <TextTask
            subTaskPreviousAnnotationValues={suggestions}
            task={task}
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        const textInput = wrapper.find('input').getDOMNode()
        textInput.value = 'This has been edited.'
        wrapper.find('input').simulate('change')
      })

      after(function () {
        annotation.update.restore()
      })

      it('should save the current text', function () {
        expect(annotation.update.withArgs('This has been edited.')).to.have.been.calledOnce()
      })
    })

    describe('on unmount', function () {
      before(function () {
        sinon.spy(annotation, 'update')
        annotation.update('Hello, this is an existing annotation')
        task.setAnnotation(annotation)
        wrapper = mount(
          <TextTask
            subTaskPreviousAnnotationValues={suggestions}
            task={task}
          />,
          {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        const textInput= wrapper.find('input').getDOMNode()
        textInput.value = 'This has been edited.'
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
})
