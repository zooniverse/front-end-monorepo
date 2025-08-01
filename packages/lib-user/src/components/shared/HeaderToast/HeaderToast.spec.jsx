import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { CopyJoinLink } from './HeaderToast.stories'

describe('components > shared > HeaderToast', function() {
  const user = userEvent.setup()
  const DefaultStory = composeStory(CopyJoinLink, Meta)

  it('should render a button', function() {
    render(<DefaultStory />)

    // The first "Link" in the button name is from the link icon
    expect(screen.getByRole('button', { name: 'Link Copy Join Link' })).toBeTruthy()
  })

  describe('when the button is clicked', function() {
    it('should show a toast', async function() {
      render(<DefaultStory />)

      const button = screen.getByRole('button', { name: 'Link Copy Join Link' })
      await user.click(button)

      const toast = screen.getByText('Join Link Copied!')

      expect(toast).toBeTruthy()
    })
  })
})
