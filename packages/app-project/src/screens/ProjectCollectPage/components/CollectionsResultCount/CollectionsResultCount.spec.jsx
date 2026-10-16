import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, Loading } from './CollectionsResultCount.stories'

const DefaultStory = composeStory(Default, Meta)
const LoadingStory = composeStory(Loading, Meta)

describe('Component > CollectionsResultCount', function () {
  it('should show the result count text', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Collect.resultsCount')).toBeDefined()
  })

  it('should hide the count text while loading', function () {
    render(<LoadingStory />)

    expect(screen.queryByText('Collect.resultsCount')).toBeNull()
  })
})
