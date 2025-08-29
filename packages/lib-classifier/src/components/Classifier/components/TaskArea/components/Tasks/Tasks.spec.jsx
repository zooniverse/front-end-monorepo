import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, {
  MultipleTasks,
  NoClassification,
  NoStep,
  SubjectLoading,
  WorkflowLoading
} from './Tasks.stories'

describe('Tasks', function () {
  describe('without an active classification', function () {
    const NoClassificationStory = composeStory(NoClassification, Meta)

    it('should render null', function () {
      render(<NoClassificationStory />)
      expect(screen.queryByText('TaskArea.Tasks.DoneButton.done')).to.equal(
        null
      )
    })
  })

  describe('without an active step', function () {
    const NoStepStory = composeStory(NoStep, Meta)

    it('should render null', function () {
      render(<NoStepStory />)
      expect(screen.queryByText('TaskArea.Tasks.DoneButton.done')).to.equal(
        null
      )
    })
  })

  describe('loading states', function () {
    const SubjectLoadingStory = composeStory(SubjectLoading, Meta)
    const WorkflowLoadingStory = composeStory(WorkflowLoading, Meta)

    it('should display a loading message while the workflow loads', function () {
      render(<WorkflowLoadingStory />)
      expect(screen.getByText('TaskArea.Tasks.loading')).toBeDefined()
      expect(screen.queryByText('TaskArea.Tasks.DoneButton.done')).to.equal(
        null
      )
    })

    it('should render null while the subject loads', function () {
      render(<SubjectLoadingStory />)
      expect(screen.queryByText('TaskArea.Tasks.DoneButton.done')).to.equal(
        null
      )
    })
  })

  describe('with a step and classification', function () {
    const MultipleTasksStory = composeStory(MultipleTasks, Meta)

    it('should render a task component if the workflow is loaded', function () {
      render(<MultipleTasksStory />)
      expect(screen.getByText('TaskArea.Tasks.DoneButton.done')).toBeDefined()
    })

    it('should autofocus the task', function () {
      render(<MultipleTasksStory />)
      const activeElement = document.activeElement
      expect(activeElement.className.includes('StyledFieldset'))
    })
  })
})
