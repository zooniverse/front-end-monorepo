import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { expect } from 'chai'
import { Grommet } from 'grommet'

import SingleChoiceTask from './SingleChoiceTask'
import Task from '@plugins/tasks/single'

describe('SingleChoiceTask', function () {
  const task = Task.TaskModel.create({
    answers: [{ label: 'yes' }, { label: 'no' }],
    required: true,
    strings: {
      'answers.0.label': 'yes',
      'answers.1.label': 'no',
      question: 'Is there a cat?'
    },
    taskKey: 'init',
    type: 'single'
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
        <SingleChoiceTask annotation={annotation} task={task} />,
        { wrapper: withGrommet()}
      )
    })

    it('should have a question', function () {
      const question = screen.getByText(task.question)
      expect(question).to.exist()
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer, index) => {
        const label = task.strings.get(`answers.${index}.label`)
        const radioButton = screen.getByRole('radio', { name: label })
        expect(radioButton).to.exist()
      })
    })
  })

  describe('with an annotation', function () {

    beforeEach(function () {
      annotation.update(0)
      render(
        <SingleChoiceTask
          annotation={annotation}
          task={task}
        />,
        { wrapper: withGrommet()}
      )
    })

    it('should check the selected answer', function () {
      const label = task.strings.get('answers.0.label')
      const radioButton = screen.getByRole('radio', { name: label })
      expect(radioButton.checked).to.be.true()
    })
  })

  describe('onChange event handler', function () {
    beforeEach(function () {
      annotation.update(null)
      render(
        <SingleChoiceTask
          annotation={annotation}
          task={task}
        />,
        { wrapper: withGrommet()}
      )
    })

    it('should update the annotation', async function () {
      const user = userEvent.setup()
      const answerTests = task.answers.map(async (answer, index) => {
        const label = task.strings.get(`answers.${index}.label`)
        const radioButton = screen.getByRole('radio', { name: label })
        expect(annotation.value).to.not.equal(index)
        await user.click(radioButton)
        waitFor(() => expect(annotation.value).to.equal(index))
      })
      await Promise.all(answerTests)
    })

    it('should not update the annotation if the answer is already checked', async function () {
      const user = userEvent.setup()
      const label = task.strings.get('answers.1.label')
      const radioButton = screen.getByRole('radio', { name: label })
      await user.click(radioButton)
      waitFor(() => expect(annotation.value).to.equal(1))
      await user.click(radioButton)
      waitFor(() => expect(annotation.value).to.equal(1))
    })
  })
})
