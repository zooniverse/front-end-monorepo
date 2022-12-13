import { render } from '@testing-library/react'
import { Default, Meta } from './DefaultLayout.stories'
import { composeStory } from '@storybook/testing-react'

describe('Component > DefaultLayout', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render without crashing', function () {
    render(<DefaultStory />)
  })
})
