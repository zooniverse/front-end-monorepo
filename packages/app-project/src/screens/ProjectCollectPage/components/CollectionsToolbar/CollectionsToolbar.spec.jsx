import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './CollectionsToolbar.stories'

describe('Component > CollectionsToolbar', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should show the collection result count', function () {
    expect(screen.getByText('Collect.resultsCount')).toBeDefined()
  })

  it('should show the minimum subjects toggle and sort selector', function () {
    expect(screen.getByRole('checkbox', { name: 'Collect.hideSingleSubject' })).toBeDefined()
    expect(screen.getByLabelText('Collect.sortBy')).toBeDefined()
  })
})
