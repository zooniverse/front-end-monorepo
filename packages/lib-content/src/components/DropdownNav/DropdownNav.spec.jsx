import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './DropdownNav.stories.jsx'

describe('Component > DropdownNav', function() {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should have a label', function() {
    const dropButton = screen.getByText(Default.args.sidebarLabel)
    expect(dropButton).toBeTruthy()
  })

  it('should render links to page sections', async function() {
    const dropButton = screen.getByText(Default.args.sidebarLabel)
    fireEvent.click(dropButton)

    await waitFor(() => {
      const links = document.querySelectorAll('a')
      expect(links).to.have.lengthOf(Default.args.sections.length)
    })
  })
})
