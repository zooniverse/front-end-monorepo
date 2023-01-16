import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Triangle } from './Triangle'

describe('Component > Triangle', function () {
  it('should render without crashing', function () {
    render(<Triangle theme={zooTheme} />)
    expect(screen).to.be.ok()
  })

  describe('with color settings', function () {
    it('should render theme colors, if specified', function () {
      render(<Triangle theme={zooTheme} />)
      const svg = document.querySelector('svg')
      expect(svg.getAttribute('fill')).to.equal(zooTheme.global.colors['dark-2'])
    })

    it('should render specific colors, if specified', function () {
      render(<Triangle theme={zooTheme} color='cyan' />)
      const svg = document.querySelector('svg')
      expect(svg.getAttribute('fill')).to.equal('cyan')
    })
  })

  describe('with point direction settings', function () {
    it('should point up, if specified', function () {
      render(<Triangle theme={zooTheme} pointDirection='up' />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(0deg)')
    })

    it('should point down, if specified', function () {
      render(<Triangle theme={zooTheme} pointDirection='down' />)
      const svg = document.querySelector('svg')
      const svgStyle = window.getComputedStyle(svg)
      expect(svgStyle.getPropertyValue('transform')).to.equal('rotate(180deg)')
    })
  })
})
