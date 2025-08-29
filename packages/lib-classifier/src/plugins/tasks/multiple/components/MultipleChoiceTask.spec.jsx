import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Task from '@plugins/tasks/multiple'
import Meta, { Default, WithAnnotation } from './MultipleChoiceTask.stories'
import mockTask from './mockTask'

describe('MultipleChoiceTask', function () {
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
        const checkbox = screen.getByRole('checkbox', { name: label })
        expect(checkbox).toBeDefined()
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
      const checkbox = screen.getByRole('checkbox', { name: label })
      expect(checkbox.checked).to.equal(true)
    })
  })

  describe('onChange', function () {
    let annotation

    beforeEach(function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      annotation = task.defaultAnnotation()
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
