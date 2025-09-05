import { render, screen } from '@testing-library/react'
import Meta, { Default, NoSubject } from './FlipbookViewer.stories'
import { composeStory } from '@storybook/react'
import userEvent from '@testing-library/user-event'

describe('Component > FlipbookViewer', function () {
  const DefaultStory = composeStory(Default, Meta)

  describe('with a valid subject', function () {
    it('should render the correct number of thumbnnails', function () {
      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      expect(thumbnailButtons).to.have.length(4)
    })

    it('should highlight the active frame thumbnail with a border', function () {
      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      const { border } = window.getComputedStyle(thumbnailButtons[0])
      expect(border).to.equal('2px solid rgb(240, 178, 0)') // neutral-2 in theme
    })

    it('should have previous and next buttons', function () {
      const { getByText } = render(<DefaultStory />)
      const nextButton = getByText('Next')
      const prevButton = getByText('Previous')
      expect(nextButton).to.exist
      expect(prevButton).to.exist
    })

    it('should handle changing the current frame via thumbnail', async function () {
      const user = userEvent.setup({ delay: null })

      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      const buttonStyle = window.getComputedStyle(thumbnailButtons[0])
      expect(buttonStyle.border).to.equal('2px solid rgb(240, 178, 0)') // neutral-2 in theme

      await user.pointer({
        keys: '[MouseLeft]',
        target: thumbnailButtons[1]
      })

      const newButtonStyle = window.getComputedStyle(thumbnailButtons[1])
      expect(newButtonStyle.border).to.equal('2px solid rgb(240, 178, 0)')
    })

    it('should handle using arrow keys on the tablist', async function () {
      const user = userEvent.setup({ delay: null })

      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      expect(thumbnailButtons[0].tabIndex).to.equal(0)

      thumbnailButtons[0].focus()
      await user.keyboard('{ArrowRight}')

      expect(thumbnailButtons[0].tabIndex).to.equal(-1)
      expect(thumbnailButtons[1].tabIndex).to.equal(0)
    })
  })

  describe('without a subject', function () {
    const NoSubjectStory = composeStory(NoSubject, Meta)

    it('should display an error message and no image element ', function () {
      const { container } = render(<NoSubjectStory />)

      const imageElement = container.querySelector('image')
      const errorMessage = screen.getByText('Something went wrong.')
      expect(imageElement).to.equal(null)
      expect(errorMessage).to.exist
    })
  })

  describe('Flipbook controls', function () {
    it('should have a play or pause button', function () {
      const { getByLabelText } = render(<DefaultStory />)
      const playButton = getByLabelText('Play video')
      expect(playButton).to.exist
    })

    it('should play or pause via keyboard when image is focused', async function () {
      const user = userEvent.setup({ delay: null })

      const { getByLabelText } = render(<DefaultStory />)
      const image = document.querySelector('image')

      await user.click(image)
      await user.keyboard(' ')

      const pauseButton = getByLabelText('Pause video')
      expect(pauseButton).to.exist
    })

    it('should change the looping speed', async function () {
      const user = userEvent.setup({ delay: null })
      const { findByLabelText, findByRole } = render(<DefaultStory />)
      const speedButton = await findByLabelText(
        'Video playback speed selection; Selected: 1x'
      )

      await user.pointer({
        keys: '[MouseLeft]',
        target: speedButton
      })

      const selectedSpeed = await findByRole('option', { name: '1x' })
      expect(selectedSpeed.selected).to.equal(true)

      /** The following is the correct way to test with RTL
       *  but Grommet does not render Select as a <select>
       *  so selectOptions() will not find the speed options
       */

      // await userEvent.selectOptions(getByRole('listbox'), '0.5x')
      // const newSelectedSpeed = getByRole('option', { name: '0.5x' })
      // expect(newSelectedSpeed.selected).to.equal(true)
    })
  })
})
