import { expect } from 'chai'
import React from 'react'
import { default as Task } from '@plugins/tasks/text'
import { render, screen } from '@testing-library/react'
import TextTaskWithSuggestions from './TextTaskWithSuggestions'

describe('TextTask > Components > TextTaskWithSuggestions', function () {
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })
  // default text annotation value = ''
  const annotation = task.defaultAnnotation()

  it('should render without crashing', function () {
    render(
      <TextTaskWithSuggestions
        task={task}
        value={annotation.value}
      />
    )

    expect(screen).to.be.ok()
  })

  it('should have a labelled TextInput', function () {
    render(
      <TextTaskWithSuggestions
        task={task}
        value={annotation.value}
      />
    )

    expect(screen.getByText(task.instruction)).to.exist()
  })

  describe('with value and suggestions', function () {
    before(function () {
      annotation.update('This is an updated annotation value.')
    })

    it('should render the value', function () {
      render(
        <TextTaskWithSuggestions
          suggestions={['one', 'two', 'three']}
          task={task}
          value={annotation.value}
        />
      )

      expect(screen.getByDisplayValue(annotation.value)).to.exist()
    })
  })
})

/**
UI to test in lib-classifier storybook:
- ?path=/story/tasks-text--with-suggestions
- ?path=/story/drawing-tools-transcribedlines--default

The TextTaskWithSuggestions component
  without an annotation value and suggestions
    should show suggestions
      with a blank or empty text input
      the suggestions should be shown

  with an annotation value and suggestions
    should not show suggestions
      type in the text input box to create an annotation value,
      the suggestions should not be shown
*/
