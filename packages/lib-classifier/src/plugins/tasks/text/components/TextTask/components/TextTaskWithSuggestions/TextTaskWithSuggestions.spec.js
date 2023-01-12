import { expect } from 'chai'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { default as Task } from '@plugins/tasks/text'
import TextTaskWithSuggestions from './TextTaskWithSuggestions'

describe('TextTask > Components > TextTaskWithSuggestions', function () {
  // this turns off Mocha's time limit for slow tests
  this.timeout(5000)
  
  let task
  const suggestions = ['one', 'two', 'three']

  before(function () {
    sinon.stub(window, 'scrollTo')
    
    task = Task.TaskModel.create({
      strings: {
        instruction: 'Type something here',
      },
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion'],
      type: 'text'
    })
  })

  after(function () {
    window.scrollTo.restore()
  })

  describe('with suggestions and without value', function () {
    let textInput, options

    before(async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <TextTaskWithSuggestions
          suggestions={suggestions}
          task={task}
          value=''
        />
      )
  
      textInput = screen.getByLabelText(task.instruction)
      await user.pointer({
        keys: '[MouseLeft]',
        target: textInput
      })
      options = document.querySelectorAll('[role=option]')
    })


    it('should have a labelled TextInput', function () {
      expect(textInput).to.exist()
    })
  
    it('should show text suggestions', async function () {
      expect(options).to.have.lengthOf(suggestions.length)
      suggestions.forEach((suggestion, index) => {
        expect(options[index]).to.have.text(suggestion)
      })
    })
  })

  describe('with suggestions and value', function () {
    let textInputValue, options

    before(async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <TextTaskWithSuggestions
          suggestions={suggestions}
          task={task}
          value='This is an updated annotation value.'
        />
      )
  
      const textInput = screen.getByLabelText(task.instruction)
      textInputValue = textInput.value
      await user.pointer({
        keys: '[MouseLeft]',
        target: textInput
      })
      options = document.querySelectorAll('[role=option]')
    })
    
    it('should render the value', function () {
      expect(textInputValue).to.equal('This is an updated annotation value.')
    })

    it('should not show text suggestions', async function () {
      expect(options).to.have.lengthOf(0)
    })
  })
})

/**
UI to test in lib-classifier storybook:
- ?path=/story/tasks-text--with-suggestions
- ?path=/story/drawing-tools-transcribedlines--default

The TextTaskWithSuggestions component with suggestions
  without an annotation value
    should show suggestions
      with a blank or empty text input
      the suggestions should be shown

  with an annotation value
    should not show suggestions
      type in the text input box to create an annotation value,
      the suggestions should not be shown
*/
