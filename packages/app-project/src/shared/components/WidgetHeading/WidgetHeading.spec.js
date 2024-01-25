import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { WidgetHeading } from './WidgetHeading.stories.js'
import { WidgetHeadingMock } from './WidgetHeading.mock'

describe('Component > WidgetHeading', function () {
  it('should render the element correctly', async function () {
    const WidgetHeadingStory = composeStory(WidgetHeading, Meta)
    render(<WidgetHeadingStory />)
    expect(screen.getByRole('heading', {level: parseInt(WidgetHeadingMock.level, 10)})).to.exist()
    expect(screen.getByText(WidgetHeadingMock.text)).to.exist()
  })
})
