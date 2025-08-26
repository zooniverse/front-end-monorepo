import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'

import Meta, { OneTask, ThreeTasks } from './TaskHelp.stories'

describe('TaskHelp', function () {
  const OneTaskStory = composeStory(OneTask, Meta)
  const ThreeTasksStory = composeStory(ThreeTasks, Meta)

  it('should show a button to open the task(s) help modal', function () {
    render(<OneTaskStory />)

    const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
    expect(needHelpButton).to.be.ok()
  })

  describe('with a single task', function () {
    let user

    beforeEach(function () {
      user = userEvent.setup({ delay: null })
    })

    it('should show the help text for a single task', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.be.ok())
    })

    it('should not show any <hr />', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
      await user.click(needHelpButton)

      expect(screen.queryByRole('separator')).to.be.null()
    })

    it('should no longer show the modal when the close button is clicked', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.be.ok())
      const closeButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.close' })
      await user.click(closeButton)

      expect(screen.queryByText('Try this')).to.be.null()
    })
  })

  describe('with multiple tasks', function () {
    let user

    beforeEach(function () {
      user = userEvent.setup({ delay: null })
    })

    it('should show the help text for multiple tasks', async function () {
      render(<ThreeTasksStory />)

      const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.be.ok())
      expect(screen.getByText('Try this again')).to.be.ok()
    })

    it('should show the expected <hr />', async function () {
      render(<ThreeTasksStory />)

      const needHelpButton = screen.getByRole('button', { name: 'TaskArea.Tasks.TaskHelp.label' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getAllByRole('separator')).to.have.lengthOf(1))
    })
  })
})
