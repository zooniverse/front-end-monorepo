import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Sidebar.stories.js'

describe('Component > Sidebar', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should render a list of links to page sections', function () {
    screen.debug()
    expect(document.querySelector(`[href="#${Default.args.sections[0].slug}"]`)).to.be.ok()
  })

  it('should have sidebar nav with accessible label', function () {
    const sideBar = screen.getByLabelText(Default.args.ariaLabel)
    expect(sideBar).to.be.ok()
  })
})
