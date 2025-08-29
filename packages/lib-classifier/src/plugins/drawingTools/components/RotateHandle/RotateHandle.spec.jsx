import { render, screen } from '@testing-library/react'

import RotateHandle from './RotateHandle'

describe('Component > Rotatehandle', function () {
  beforeEach(function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <RotateHandle
          fill='red'
          x={100}
          y={200}
        />
      </svg>
    )
  })

  it('should render without crashing', function () {
    const rotateHandle = document.querySelector('g[transform]')
    expect(rotateHandle).toBeDefined()
  })

  it('should have the correct colour', function () {
    const innerSVG = screen.getByLabelText('DrawingTools.RotateHandle')
    expect(innerSVG.getAttribute('fill')).to.equal('red')
  })
})
