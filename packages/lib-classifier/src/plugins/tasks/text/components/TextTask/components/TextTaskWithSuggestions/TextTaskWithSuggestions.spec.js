import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'

import { default as Task } from '@plugins/tasks/text'
import TextTaskWithSuggestions from './TextTaskWithSuggestions'

describe('TextTask > Components > TextTaskWithSuggestions', function () {
  let task

  before(function () {
    sinon.stub(window, 'scrollTo')
    task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion'],
      type: 'text'
    })
  })

  after(function () {
    window.scrollTo.restore()
  })

  it('should have a labelled TextInput', function () {
    render(
      <TextTaskWithSuggestions
        suggestions={['one', 'two', 'three']}
        task={task}
        value=''
      />
    )

    expect(screen.getByLabelText(task.instruction)).to.exist()
  })

  it('should show text suggestions', async function () {
    /*
      This test takes 4s to run. The workaround is to disable the default mocha timeout.
      TODO: figure out why these tests are so slow.
    */
    this.timeout(0)
    const user = userEvent.setup({ delay: null })
    const suggestions = ['one', 'two', 'three']
    render(
      <TextTaskWithSuggestions
        suggestions={suggestions}
        task={task}
        value=''
      />
    )

    const textInput = screen.getByLabelText(task.instruction)
    await user.pointer({
      keys: '[MouseLeft]',
      target: textInput
    })
    suggestions.forEach(suggestion => {
      const option = screen.getByRole('button', { name: suggestion })
      expect(option).to.exist()
    })
  })

  describe('with value and suggestions', function () {
    it('should render the value', function () {
      render(
        <TextTaskWithSuggestions
          suggestions={['one', 'two', 'three']}
          task={task}
          value='This is an updated annotation value.'
        />
      )

      expect(screen.getByDisplayValue('This is an updated annotation value.')).to.exist()
    })

    it('should not show text suggestions', async function () {
      const user = userEvent.setup({ delay: null })
      const suggestions = ['one', 'two', 'three']
      render(
        <TextTaskWithSuggestions
          suggestions={suggestions}
          task={task}
          value='This is an updated annotation value.'
        />
      )

      const textInput = screen.getByLabelText(task.instruction)
      await user.pointer({
        keys: '[MouseLeft]',
        target: textInput
      })
      suggestions.forEach(suggestion => {
        const option = screen.queryByRole('button', { name: suggestion })
        expect(option).to.be.null()
      })
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
