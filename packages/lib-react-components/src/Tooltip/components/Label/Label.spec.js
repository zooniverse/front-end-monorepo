import { render, screen } from '@testing-library/react'
import Triangle from '../Triangle'
import { Label } from './Label'

describe('Tooltip > Component > Label', function () {
  describe('with simple props', function () {
    beforeEach(function () {
      render(<Label label='helpful tip' />)
    })

    it('renders without crashing', function () {
      expect(screen).to.be.ok()
    })

    it('should render the label', function () {
      expect(screen.queryByText('helpful tip')).to.exist()
    })
  })

  describe('with specific props', function () {
    it('should render a triangle/arrow, by default', function () {
      render(<Label label='helpful tip' />)
      const triangle = document.querySelector('svg polygon')
      expect(triangle).to.exist()
      expect(triangle.getAttribute('points')).to.equal('5,0 10,10 0,10')
    })

    it('should render a triangle/arrow if arrow=true', function () {
      render(<Label label='helpful tip' arrow={true} />)
      const triangle = document.querySelector('svg polygon')
      expect(triangle).to.exist()
      expect(triangle.getAttribute('points')).to.equal('5,0 10,10 0,10')
    })

    it('should not render a triangle/arrow if arrow=false', function () {
      render(<Label label='helpful tip' arrow={false} />)
      const triangle = document.querySelector('svg polygon')
      expect(triangle).to.not.exist()
    })

    it('should render an downward triangle/arrow if Tippy-defined placement = top', function () {
      render(<Label label='helpful tip' arrow={true} data-placement='top' />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(180deg)')
    })

    it('should render an upward triangle/arrow if Tippy-defined placement = bottom', function () {
      render(<Label label='helpful tip' arrow={true} data-placement='bottom' />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(0deg)')
    })
  })
})
