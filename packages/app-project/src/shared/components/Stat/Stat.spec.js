import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './Stat.stories.js'
import { DefaultMock  } from './Stat.mock'

/* Note that this UI is animated, so we cannot look for values in AnimatedNumber
components via unit test environment */

describe('Component > Stat', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should render the Text Label', function () {
    expect(screen.getByText(DefaultMock.label)).to.exist()
  })
})
