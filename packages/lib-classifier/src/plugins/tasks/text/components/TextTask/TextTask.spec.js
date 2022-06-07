import React from 'react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import TextTask from './'
import { default as Task } from '@plugins/tasks/text'

describe('Text Task', function () {

  this.timeout(0)

  function withGrommet({ children }) {
    return (
      <Grommet theme={zooTheme}>
        {children}
      </Grommet>
    )
  }

  describe('without tags', async function () {
    let modifiers, textInput

    const task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      type: 'text'
    })
    const annotation = task.defaultAnnotation()

    before(async function () {
      const user = userEvent.setup()
      render(
        <TextTask
          annotation={annotation}
          task={task}
        />,
        {
          wrapper: withGrommet
        }
      )
      modifiers = screen.queryByRole('group', {
        name: 'TextTask.TextTagButtons.modifiers'
      })
      textInput = screen.getByRole('textbox', {
        name: task.instruction
      })
      await user.type(textInput, 'Hello world!')
    })

    it('should have a labelled text input', function () {
      expect(textInput).to.exist()
    })

    it('should save typed text', function () {
      expect(annotation.value).to.equal('Hello world!')
    })

    it('should display the current annotation', function () {
      expect(textInput.value).to.equal(annotation.value)
    })

    it('should not have text modifier buttons', function () {
      expect(modifiers).to.be.null()
    })
  })

  describe('without suggestions', async function () {
    let buttons, modifiers, textInput

    const task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    })
    const annotation = task.defaultAnnotation()

    before(async function () {
      const user = userEvent.setup()
      render(
        <TextTask
          annotation={annotation}
          task={task}
        />,
        {
          wrapper: withGrommet
        }
      )
      modifiers = screen.getByRole('group', {
        name: 'TextTask.TextTagButtons.modifiers'
      })
      buttons = task.text_tags.map(tag => within(modifiers).getByRole('button', {
        name: `TextTask.TextTagButtons.modifiers ${tag}`
      }))
      textInput = screen.getByRole('textbox', {
        name: task.instruction
      })
      await user.type(textInput, 'Hello world!')
    })

    it('should have a labelled text input', function () {
      expect(textInput).to.exist()
    })

    it('should save typed text', function () {
      expect(annotation.value).to.equal('Hello world!')
    })

    it('should display the current annotation', function () {
      expect(textInput.value).to.equal(annotation.value)
    })

    it('should have text modifier buttons', function () {
      expect(modifiers).to.exist()
    })

    it('should have a modifier button for each text tag', function () {
      expect(buttons).to.have.lengthOf(task.text_tags.length)
    })
  })

  describe('tagging text', function () {
    let buttons, modifiers, textInput

    const task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    })
    const annotation = task.defaultAnnotation()

    before(async function () {
      const user = userEvent.setup()
      render(
        <TextTask
          annotation={annotation}
          task={task}
        />,
        {
          wrapper: withGrommet
        }
      )
      modifiers = screen.getByRole('group', {
        name: 'TextTask.TextTagButtons.modifiers'
      })
      const insertion = within(modifiers).getByRole('button', {
        name: 'TextTask.TextTagButtons.modifiers insertion'
      })
      textInput = screen.getByRole('textbox', {
        name: task.instruction
      })
      await user.type(textInput, 'Hello, this is some test text.')
      await user.pointer([
        {
          target: textInput,
          offset: 7,
          keys: '[MouseLeft>]'
        },
        {
          offset: 11
        }
      ])
      await user.click(insertion)
    })

    it('should wrap selected text', function () {
      expect(annotation.value).to.equal('Hello, [insertion]this[/insertion] is some test text.')
    })

    it('should display the edited annotation', function () {
      expect(textInput.value).to.equal(annotation.value)
    })
  })

  describe('literal insertion tags', function () {
    let buttons, modifiers, textInput

    const task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    })
    const annotation = task.defaultAnnotation()

    before(async function () {
      const user = userEvent.setup()
      render(
        <TextTask
          annotation={annotation}
          task={task}
        />,
        {
          wrapper: withGrommet
        }
      )
      modifiers = screen.getByRole('group', {
        name: 'TextTask.TextTagButtons.modifiers'
      })
      const ampersand = within(modifiers).getByRole('button', {
        name: 'TextTask.TextTagButtons.modifiers &'
      })
      textInput = screen.getByRole('textbox', {
        name: task.instruction
      })
      await user.type(textInput, 'Dungeons and Dragons')
      await user.pointer([
        {
          target: textInput,
          offset: 9,
          keys: '[MouseLeft>]'
        },
        {
          offset: 12
        }
      ])
      await user.click(ampersand)
    })

    it('should replace selected text', function () {
      expect(annotation.value).to.equal('Dungeons & Dragons')
    })

    it('should display the edited annotation', function () {
      expect(textInput.value).to.equal(annotation.value)
    })
  })

  describe('with suggestions', function () {
    let buttons, modifiers, textInput

    const task = Task.TaskModel.create({
      instruction: 'Type something here',
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    })
    const annotation = task.defaultAnnotation()
    const suggestions = [
      'a transcribed sentence',
      'a transcribed sentience',
      'a transribed sentence',
      'a conscripted sentience'
    ]

    before(async function () {
      const user = userEvent.setup()
      render(
        <TextTask
          annotation={annotation}
          suggestions={suggestions}
          task={task}
        />,
        {
          wrapper: withGrommet
        }
      )
      modifiers = screen.getByRole('group', {
        name: 'TextTask.TextTagButtons.modifiers'
      })
      buttons = task.text_tags.map(tag => within(modifiers).getByRole('button', {
        name: `TextTask.TextTagButtons.modifiers ${tag}`
      }))
      textInput = screen.getByRole('combobox', {
        name: task.instruction
      })
      await user.pointer({
        keys: '[MouseLeft]',
        target: textInput
      })
      const options = suggestions.map(suggestion => screen.getByRole('option', { name: suggestion }))
      await user.click(options[1])
    })

    it('should have a labelled text input', function () {
      expect(textInput).to.exist()
    })

    it('should save the selected suggestion', function () {
      expect(annotation.value).to.equal(suggestions[1])
    })

    it('should display the selected suggestion', function () {
      expect(textInput.value).to.equal(annotation.value)
    })

    it('should have text modifier buttons', function () {
      expect(modifiers).to.exist()
    })

    it('should have a modifier button for each text tag', function () {
      expect(buttons).to.have.lengthOf(task.text_tags.length)
    })
  })
})