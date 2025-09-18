import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './CollectionsModal.stories'

describe('Component > CollectionsModalContainer', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should have a modal label', function () {
    render(<DefaultStory />)
    expect(screen.getByText('CollectionsModal.title')).toBeDefined()
  })

  describe('when no collection is selected', function () {
    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should have a disabled Add button', function () {
      const btn = screen.getByText('CollectionsModal.SelectCollection.addButton')
      expect(btn).toBeDefined()
      expect(btn.disabled).to.equal(true)
    })

    it('should have a disabled Create button', function () {
      const btn = screen.getByText('CollectionsModal.CreateCollection.createButton')
      expect(btn).toBeDefined()
      expect(btn.disabled).to.equal(true)
    })
  })
})
