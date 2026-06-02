import { render } from '@testing-library/react'
import { useContext } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SVGCanvas from './SVGCanvas'

describe('SVGCanvas', function () {
  it('should render an svg g element', function () {
    render(
      <SVGCanvas />
    )

    const g = document.querySelector('g')
    expect(g).to.exist
  })

  it('should pass extra props to svg g', function () {
    const transform = 'rotate(90 0 0)'

    render(
      <SVGCanvas
        transform={transform}
      >
      </SVGCanvas>
    )

    const g = document.querySelector('g')
    expect(g.getAttribute('transform')).to.equal(transform)
  })

  it('should render child', function () {
    const Child = () => {
      return <div />
    }

    render(
      <SVGCanvas>
        <Child />
      </SVGCanvas>
    )

    const child = document.querySelector('div')
    expect(child).to.exist 
  })

  it('should provide SVGContext with scale and non-null canvas', function () {
    let context
    const Child = () => {
      context = useContext(SVGContext)
      return null
    }

    render(
      <SVGCanvas
        scale={2}
      >
        <Child />
      </SVGCanvas>
    )

    expect(context.canvas).not.to.be.null
    expect(context.scale).to.equal(2)
  })
})
