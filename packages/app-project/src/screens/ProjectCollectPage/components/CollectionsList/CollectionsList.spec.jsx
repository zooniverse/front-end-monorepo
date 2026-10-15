import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './CollectionsList.stories'

describe('Component > CollectionsList', function () {
  describe('with collections', function () {
    const DefaultStory = composeStory(Default, Meta)

    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should render a list item for each collection', function () {
      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(Default.args.collections.length)
    })
  })
})
