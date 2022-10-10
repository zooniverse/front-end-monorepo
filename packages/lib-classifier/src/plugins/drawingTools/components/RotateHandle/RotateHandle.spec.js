import React from 'react'
import { render, screen } from '@testing-library/react'

import RotateHandle from './RotateHandle'

describe('Component > Rotatehandle', function () {
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
    const rotateHandle = document.querySelector('g[transform]')
    expect(rotateHandle).to.exist()
  })

  it('should have the correct transform', function () {
    const rotateHandle = document.querySelector('g[transform]')
    expect(rotateHandle.getAttribute('transform')).to.equal('translate(100, 200) scale(0.5)')
  })

  it('should have the correct colour', function () {
    const innerSVG = screen.getByLabelText('DrawingTools.RotateHandle')
    expect(innerSVG.getAttribute('fill')).to.equal('red')
  })
})
