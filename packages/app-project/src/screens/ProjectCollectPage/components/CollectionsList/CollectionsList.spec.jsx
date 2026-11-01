import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, Loading } from './CollectionsList.stories'

const DefaultStory = composeStory(Default, Meta)
const LoadingStory = composeStory(Loading, Meta)

describe('Component > CollectionsList', function () {
  describe('with collections', function () {
    it('should render a list item for each collection', function () {
      render(<DefaultStory />)
      
      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(Default.args.collections.length)
    })
  })

  describe('while loading', function () {
    it('should show a blocking overlay and mark the list busy', function () {
      render(<LoadingStory />)

      expect(screen.getByTestId('collections-loading-overlay')).toBeDefined()
      expect(screen.getAllByRole('listitem')).to.have.length(Loading.args.collections.length)
    })
  })
})
