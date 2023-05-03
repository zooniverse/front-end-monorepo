import { cleanup, render } from '@testing-library/react'

import Background from './Background'

describe('Component > Background', function () {
  it('should render without crashing', function () {
    render(<svg><Background /></svg>)
  })

  it('should render a rect', function () {
    render(<svg><Background /></svg>)
    expect(document.querySelectorAll('rect')).to.have.lengthOf(1)
  })

  it('should pass along any other props', function () {
    render(<svg><Background foo='bar' /></svg>)
    expect(document.querySelector('rect').getAttribute('foo')).to.equal('bar')
  })

  it('should set the fill color by prop', function () {
    render(<svg><Background fill='black' /></svg>)
    expect(document.querySelector('rect').getAttribute('fill')).to.equal('black')
  })

  it('should set the stroke properties if a borderColor is defined', function () {
    let rect
    render(<svg><Background fill='black' /></svg>)
    rect = document.querySelector('rect')
    expect(rect.getAttribute('stroke')).to.be.empty()
    expect(rect.getAttribute('stroke-width')).to.equal('0')
    cleanup()
    render(<svg><Background fill='black' borderColor='#fff' /></svg>)
    rect = document.querySelector('rect')
    expect(rect.getAttribute('stroke')).to.equal('#fff')
    expect(rect.getAttribute('stroke-width')).to.equal('1')
  })

  describe('when there are underlays', function () {
    it('should render multiple rects', function () {
      const underlayParameters = [
        { fill: '#000000', left: 5, width: 10 }
      ]
      render(<svg><Background fill='white' underlayParameters={underlayParameters} /></svg>)
      expect(document.querySelectorAll('rect')).to.have.lengthOf(2)
    })

    it('should render the underlay rects with the specified parameters', function () {
      let underlayRect
      const underlayParameters = [
        { fill: '#000000', left: 5, width: 10 }
      ]
      render(<svg><Background fill='white' underlayParameters={underlayParameters} /></svg>)
      underlayRect = document.querySelector('rect.chartBackground-underlay')
      expect(underlayRect.getAttribute('fill')).to.equal(underlayParameters[0].fill)
      expect(underlayRect.getAttribute('transform')).to.equal(`translate(${underlayParameters[0].left}, 0)`)
      expect(underlayRect.getAttribute('width')).to.equal(underlayParameters[0].width.toString())
      cleanup()
      render(<svg><Background fill='white' borderColor='blue' underlayParameters={underlayParameters} /></svg>)
      underlayRect = document.querySelector('rect.chartBackground-underlay')
      expect(underlayRect.getAttribute('fill')).to.equal(underlayParameters[0].fill)
      expect(underlayRect.getAttribute('transform')).to.equal(`translate(${underlayParameters[0].left}, 1)`)
      expect(underlayRect.getAttribute('width')).to.equal(underlayParameters[0].width.toString())
    })
  })
})
