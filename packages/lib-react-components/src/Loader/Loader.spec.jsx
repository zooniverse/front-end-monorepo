import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Loader.stories'

describe('Component > Loader', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should be accessible', function () {
    render(<DefaultStory />)
    const component = screen.getByLabelText('Loading')
    expect(component).to.exist()
    expect(component.getAttribute('role')).to.equal('status')
  })
})
