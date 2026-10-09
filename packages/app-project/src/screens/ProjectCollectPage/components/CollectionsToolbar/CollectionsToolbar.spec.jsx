import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './CollectionsToolbar.stories'

describe('Component > CollectionsToolbar', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should show the collection result count', function () {
    expect(screen.getByText('Showing 1-20 of 123 collections')).to.exist
  })

  it('should show the minimum subjects toggle and sort selector', function () {
    expect(screen.getByRole('checkbox', { name: 'Hide collections with only 1 subject' })).to.exist
    expect(screen.getByLabelText('Sort by:')).to.exist
  })
})
