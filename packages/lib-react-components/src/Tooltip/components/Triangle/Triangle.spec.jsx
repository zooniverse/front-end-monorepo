import { render } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Triangle.stories'

describe('Tooltip > Component > Triangle', function () {
  const { Default, CustomColor, CustomDirection } = composeStories(stories)

  describe('with a custom color', function () {
    it('should render specific colors, if specified', function () {
      render(<CustomColor />)
      const svg = document.querySelector('svg')
      expect(svg.getAttribute('fill')).to.equal('cyan')
    })
  })

  describe('with point direction settings', function () {
    it('should point up as default', function () {
      render(<Default />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(0deg)')
    })

    it('should point down, if specified', function () {
      render(<CustomDirection />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(180deg)')
    })
  })
})
