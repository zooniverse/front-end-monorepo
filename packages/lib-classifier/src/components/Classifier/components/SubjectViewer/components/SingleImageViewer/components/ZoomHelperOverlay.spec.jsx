import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './ZoomHelperOverlay.stories'

describe('Component > SingleImageViewer > ZoomHelperOverlay', function () {
  it('should show the expected text', function (){
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(screen.getByText('Use CTRL + scroll to zoom')).toBeDefined()
  })
})
