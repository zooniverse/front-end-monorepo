import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Task from '@plugins/tasks/single'
import Meta, { Default, WithAnnotation } from './SingleChoiceTask.stories'
import mockTask from './mockTask'

describe('SingleChoiceTask', function () {
  const task = Task.TaskModel.create(mockTask)

  describe('when it renders', function () {
    beforeEach(function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
    })

    it('should have a question', function () {
      const question = screen.getByText(task.question)
      expect(question).toBeDefined()
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer, index) => {
        const label = task.strings.get(`answers.${index}.label`)
        const radioButton = screen.getByRole('radio', { name: label })
        expect(radioButton).toBeDefined()
      })
    })
  })

  describe('with an existing annotation', function () {

    beforeEach(function () {
      const WithAnnotationStory = composeStory(WithAnnotation, Meta)
      render(<WithAnnotationStory />)
    })

    it('should check the selected answer', function () {
      const label = task.strings.get('answers.0.label')
      const radioButton = screen.getByRole('radio', { name: label })
      expect(radioButton.checked).to.equal(true)
    })
  })

  describe('onChange event handler', function () {
    let annotation
    beforeEach(function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      annotation = task.defaultAnnotation()
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
