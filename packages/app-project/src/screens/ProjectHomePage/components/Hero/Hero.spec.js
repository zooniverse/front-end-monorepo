import { render, } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Hero.stories.js'

describe('Component > Hero', function () {
  const DefaultStory = composeStory(Default, Meta)
  it('should render without crashing', function () {
    render(<DefaultStory />)
  })
})
