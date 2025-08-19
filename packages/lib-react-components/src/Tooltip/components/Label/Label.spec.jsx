import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Label.stories'

describe('Tooltip > Component > Label', function () {
  const { BottomPlacement, Default, NoArrow } = composeStories(stories)

  describe('default props', function () {
    beforeEach(function () {
      render(<Default />)
    })

    it('should render the label', function () {
      expect(screen.queryByText(Default.args.label)).to.exist()
    })

    it('should render a triangle/arrow, by default', function () {
      render(<Default />)
      const triangle = document.querySelector('svg polygon')
      expect(triangle).to.exist()
      expect(triangle.getAttribute('points')).to.equal('5,0 10,10 0,10')
    })

    it('should render an downward triangle/arrow if Tippy-defined placement = top', function () {
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(180deg)')
    })
  })

  describe('with specific props', function () {
    it('should not render a triangle/arrow if arrow=false', function () {
      render(<NoArrow />)
      const triangle = document.querySelector('svg polygon')
      expect(triangle).to.not.exist()
    })

    it('should render an upward triangle/arrow if Tippy-defined placement = bottom', function () {
      render(<BottomPlacement />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(0deg)')
    })
  })
})
