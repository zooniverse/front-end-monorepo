import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import Meta, { Default } from './RadiusSlider.stories'

describe('RadiusSlider', function () {
  beforeEach(function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
  })

  it('should show the adjust radius label', function () {
    expect(screen.getByText('Adjust the uncertainty circle radius (m):')).to.exist
  })

  it('should render the range input', function () {
    expect(screen.getByRole('slider')).to.exist
  })
})
