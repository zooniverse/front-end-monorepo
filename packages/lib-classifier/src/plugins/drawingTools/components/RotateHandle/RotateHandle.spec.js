import React from 'react'
import { render, screen } from '@testing-library/react'

import RotateHandle from './RotateHandle'

describe.only('Component > Rotatehandle', function () {
  beforeEach(function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <RotateHandle
          fill='red'
          scale={2}
          x={100}
          y={200}
        />
      </svg>
    )
  })

  it('should render without crashing', function () {
    expect(screen.queryByTestId('rotate-handle')).to.exist()
  })

  it('should have the correct transform', function () {
    const rotateHandle = screen.queryByTestId('rotate-handle')
    expect(rotateHandle.getAttribute('transform')).to.equal('translate(100, 200) scale(0.5)')
  })

  it('should have the correct colour', function () {
    const innerSVG = screen.queryByTestId('rotate-handle-inner-svg')
    expect(innerSVG.getAttribute('fill')).to.equal('red')
  })
})
