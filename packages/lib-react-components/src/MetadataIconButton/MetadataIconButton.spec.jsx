import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, Disabled, FilteredMetadataOnly } from './MetadataIconButton.stories'

describe('MetadataIconButton', function() {
  it('should open metadata modal when metadata is visible', async function() {
    const MetadataIconButtonStory = composeStory(Default, Meta)
    const user = userEvent.setup({ delay: null })

    render(<MetadataIconButtonStory />)

    const button = screen.getByRole('button', { name: 'Metadata' })
    await user.click(button)

    expect(screen.getByRole('dialog', { name: 'Metadata' })).toBeDefined()
    expect(screen.getByRole('columnheader', { name: 'Label' })).toBeDefined()
    expect(screen.getByRole('columnheader', { name: 'Value' })).toBeDefined()
  })

  describe('when disabled', function() {
    it('should not be clickable', function() {
      const MetadataIconButtonStory = composeStory(Disabled, Meta)
      render(<MetadataIconButtonStory />)

      const button = screen.getByRole('button', { name: 'Metadata' })
      expect(button.disabled).to.equal(true)
    })
  })

  describe('when all metadata is filtered', function() {
    it('should be disabled', function() {
      const MetadataIconButtonStory = composeStory(FilteredMetadataOnly, Meta)
      render(<MetadataIconButtonStory />)

      const button = screen.getByRole('button', { name: 'Metadata' })
      expect(button.disabled).to.equal(true)
    })
  })
})
