import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react-webpack5'

import Meta, { Default } from './Loader.stories.js'

describe('Component > Loader', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should be accessible', function () {
    render(<DefaultStory />)
    const component = screen.getByLabelText('Loading classifier')
    expect(component).to.exist()
    expect(component.getAttribute('role')).to.equal('status')
  })
})
