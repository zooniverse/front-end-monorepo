import * as stories from './SpacedText.stories'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'

describe('Component > SpacedText', function () {
  const { Default } = composeStories(stories)

  it('should render children as text', function () {
    const { getByText } = render(<Default />)
    const item = getByText(Default.args.children)
    expect(item).exists()
  })
})
