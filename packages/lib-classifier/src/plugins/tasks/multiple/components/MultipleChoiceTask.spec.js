import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { expect } from 'chai'
import { Grommet } from 'grommet'

import { MultipleChoiceTask } from './MultipleChoiceTask'
import Task from '@plugins/tasks/multiple'

describe('MultipleChoiceTask', function () {
  const task = Task.TaskModel.create({
    answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
    required: false,
    strings: {
      'answers.0.label': 'napping',
      'answers.1.label': 'standing',
      'answers.2.label': 'playing',
      question: 'What is/are the cat(s) doing?'
    },
    taskKey: 'T1',
    type: 'multiple'
  })

  const annotation = task.defaultAnnotation()

  function withGrommet() {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          {children}
        </Grommet>
      )
    }
  }

  describe('when it renders', function () {
    beforeEach(function () {
      render(
        <MultipleChoiceTask annotation={annotation} task={task} />,
        {wrapper: withGrommet()}
      )
    })

    it('should have a question', function () {
      const question = screen.getByText(task.question)
      expect(question).to.exist()
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer, index) => {
        const label = task.strings.get(`answers.${index}.label`)
        const checkbox = screen.getByRole('checkbox', { name: label })
        expect(checkbox).to.exist()
      })
    })
  })

  describe('with an annotation', function () {
    beforeEach(function () {
      annotation.update([0])
      render(
        <MultipleChoiceTask
          annotation={annotation}
          task={task}
        />,
        {wrapper: withGrommet()}
      )
    })

    it('should check the selected answer', function () {
      const label = task.strings.get('answers.0.label')
      const checkbox = screen.getByRole('checkbox', { name: label })
      expect(checkbox.checked).to.be.true()
    })
  })

  describe('onChange', function () {
    beforeEach(function () {
      annotation.update([])
      render(
        <MultipleChoiceTask
          annotation={annotation}
          task={task}
        />,
        {wrapper: withGrommet()}
      )
    })

    it('should update the annotation', async function () {
      const user = userEvent.setup()
      const expectedValue = []
      const answerTests = task.answers.map(async (answer, index) => {
        const label = task.strings.get(`answers.${index}.label`)
        const checkbox = screen.getByRole('checkbox', { name: label })
        expectedValue.push(index)
        expect(annotation.value).to.not.equal(expectedValue)
        await user.click(checkbox)
        waitFor(() => expect(annotation.value).to.equal(expectedValue))
      })
      await Promise.all(answerTests)
    })

    it('should add and remove checked and unchecked answers from the annotation value', async function () {
      const user = userEvent.setup()
      let label = task.strings.get('answers.0.label')
      let checkbox = screen.getByRole('checkbox', { name: label })
      await user.click(checkbox)
      waitFor(() => expect(annotation.value).to.deep.equal([0]))
      label = task.strings.get('answers.2.label')
      checkbox = screen.getByRole('checkbox', { name: label })
      await user.click(checkbox)
      waitFor(() => expect(annotation.value).to.deep.equal([0, 2]))
      checkbox = screen.getByRole('checkbox', { name: label })
      await user.click(checkbox)
      waitFor(() => expect(annotation.value).to.deep.equal([0]))
      label = task.strings.get('answers.0.label')
      checkbox = screen.getByRole('checkbox', { name: label })
      await user.click(checkbox)
      waitFor(() => expect(annotation.value).to.deep.equal([]))
    })
  })
})
