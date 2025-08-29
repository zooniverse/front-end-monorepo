import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import Meta, { Default, CustomMaxWidthAndHeight, CustomViewBox } from './PlaceholderSVG.stories'

describe('Component > SingleImageViewer > PlaceholderSVG', function () {

  it('should have default props', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    const svg = screen.getByTestId('placeholder-svg')
    expect(svg.getAttribute('viewBox')).to.equal('0 0 800 600')
    expect(svg).to.have.style('max-width', '100%')
  })

  it('should apply custom maxWidth and maxHeight', function () {
    const CustomMaxWidthAndHeightStory = composeStory(CustomMaxWidthAndHeight, Meta)
    render(<CustomMaxWidthAndHeightStory />)
    const svg = screen.getByTestId('placeholder-svg')
    expect(svg).to.have.style('max-width', '500px')
    expect(svg).to.have.style('max-height', '400px')
  })

  it('should apply custom viewBox', function () {
    const CustomViewBoxStory = composeStory(CustomViewBox, Meta)
    render(<CustomViewBoxStory />)
    const svg = screen.getByTestId('placeholder-svg')
    expect(svg.getAttribute('viewBox')).to.equal('0 0 400 300')
  })

  it('should have expected accessibility attributes', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    const svg = screen.getByTestId('placeholder-svg')
    expect(svg.getAttribute('focusable')).toBeDefined()
    expect(svg.getAttribute('tabindex')).to.equal('0')
  })
})
