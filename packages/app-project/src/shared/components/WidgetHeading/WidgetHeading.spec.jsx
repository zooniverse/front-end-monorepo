import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { WidgetHeading } from './WidgetHeading.stories'
import { WidgetHeadingMock } from './WidgetHeading.mock.js'

describe('Component > WidgetHeading', function () {
  it('should render the element correctly', async function () {
    const WidgetHeadingStory = composeStory(WidgetHeading, Meta)
    render(<WidgetHeadingStory />)
    expect(screen.getByRole('heading', {level: parseInt(WidgetHeadingMock.level, 10)})).toBeDefined()
    expect(screen.getByText(WidgetHeadingMock.text)).toBeDefined()
  })
})
