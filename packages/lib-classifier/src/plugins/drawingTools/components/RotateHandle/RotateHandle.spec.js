import React from 'react'
import { render, screen } from '@testing-library/react'

import RotateHandle from './RotateHandle'

describe('Component > Rotatehandle', function () {
  beforeEach(function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <RotateHandle
          fill='red'
          scale={1}
          x={100}
          y={200}
        />
      </svg>
    )
  })

  it('should render without crashing', function () {
    expect(screen.queryByTestId('rotate-handle')).to.exist()
  })
})
