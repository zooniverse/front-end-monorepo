import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { CollectionsButton } from './CollectionsButton.stories'

describe('Component > CollectionsButton', function () {
  beforeEach(function () {
    const CollectionsButtonStory = composeStory(CollectionsButton, Meta)
    render(<CollectionsButtonStory />)
  })

  it('should render the CollectionsButton', function () {
    expect(screen.getByText('SubjectPreview.CollectionsButton.add')).toBeDefined()
  })

  // NOTE: We do not test the CollectionsModal functionality here.
  // It is tested in the CollectionsModal component.
  it('should open the CollectionsModal and dismiss correctly', function () {
    fireEvent.click(screen.getByText('SubjectPreview.CollectionsButton.add'))
    waitFor(function() {
      expect(screen.getByText('CollectionsModal.title')).toBeDefined()
      fireEvent.click(screen.getByLabelText('Close'))
      waitFor(function() {
        expect(screen.getByText('SubjectPreview.CollectionsButton.add')).toBeDefined()
      })
    })
  })
})
