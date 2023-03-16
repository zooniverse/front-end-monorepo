import { expect } from 'chai'
import { composeStory } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './HighlighterTask.stories'

describe('HighlighterTask', function () {
  const DefaultStory = composeStory(Default, Meta)

  describe('when it renders', function () {
    it('should show the instruction', function () {
      render(<DefaultStory />)
      const instruction = screen.getByText('Highlight the text')
      expect(instruction).to.be.ok()
    })
  })
})
