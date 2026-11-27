import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet, ResponsiveContext } from 'grommet'

import TaskHelp from './TaskHelp'
import Meta, { OneTask, ThreeTasks } from './TaskHelp.stories'

describe('TaskHelp', function () {
  const OneTaskStory = composeStory(OneTask, Meta)
  const ThreeTasksStory = composeStory(ThreeTasks, Meta)

  it('should show a button to open the task(s) help modal', function () {
    render(<OneTaskStory />)

    const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
    expect(needHelpButton).to.exist
  })

  describe('with a single task', function () {
    let user

    beforeEach(function () {
      user = userEvent.setup({ delay: null })
    })

    it('should show the help text for a single task', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.exist)
    })

    it('should not show any <hr />', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)

      expect(screen.queryByRole('separator')).to.equal(null)
    })

    it('should no longer show the modal when a close button is clicked', async function () {
      render(<OneTaskStory />)

      const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.exist)
      const closeButtons = screen.getAllByRole('button', { name: 'Close' })
      await user.click(closeButtons[0])

      expect(screen.queryByText('Try this')).to.equal(null)
    })

  })

  describe('on a wide screen', function () {
    let user
    let container
    let needHelpButton

    beforeEach(async function () {
      user = userEvent.setup({ delay: null });
      ({ container } = render(
        <Grommet theme={zooTheme}>
          <ResponsiveContext.Provider value='large'>
            <TaskHelp {...OneTask.args} />
          </ResponsiveContext.Provider>
        </Grommet>
      ))
      needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)
      await waitFor(() => expect(screen.getByText('Try this')).to.exist)
    })

    it('should stay open when the volunteer clicks outside the help', async function () {
      await user.click(document.body)

      expect(screen.getByText('Try this')).to.exist
    })

    it('should close when Escape is pressed', function () {
      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27, which: 27 })

      expect(screen.queryByText('Try this')).to.equal(null)
    })

    it('should place the help directly after the help button in the document', function () {
      const dialog = screen.getByRole('dialog', { name: 'Need some help with this task?' })

      expect(container.contains(dialog)).to.equal(true)
      expect(needHelpButton.nextElementSibling.contains(dialog)).to.equal(true)
    })

    it('should keep the rest of the page available while open', function () {
      expect(document.querySelector('[class*="StyledOverlay"]')).to.equal(null)
      expect(needHelpButton.closest('[aria-hidden="true"]')).to.equal(null)
    })
  })

  describe('with multiple tasks', function () {
    let user

    beforeEach(function () {
      user = userEvent.setup({ delay: null })
    })

    it('should show the help text for multiple tasks', async function () {
      render(<ThreeTasksStory />)

      const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getByText('Try this')).to.exist)
      expect(screen.getByText('Try this again')).to.exist
    })

    it('should show the expected <hr />', async function () {
      render(<ThreeTasksStory />)

      const needHelpButton = screen.getByRole('button', { name: 'Need some help with this task?' })
      await user.click(needHelpButton)

      await waitFor(() => expect(screen.getAllByRole('separator')).to.have.lengthOf(1))
    })
  })
})
