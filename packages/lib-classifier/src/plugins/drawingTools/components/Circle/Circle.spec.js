import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Circle from './Circle'
import { default as CircleMark } from '../../models/marks/Circle'
import DragHandle from '../DragHandle'

/*
TODO
- [x] Draw Circle
- [ ] Import Mark.js to test for x_center and y_center
- [ ] Move Circle
- [ ] Resize with handle
- [ ] Is active
- [ ] Is not active
- [ ] Delete Circle
*/

describe('Circle tool', function () {
  it('should render a Circle with the coordinates provided', function () {
    render(<Circle mark={{ x_center: 200, y_center: 200, r: 100 }} scale={1} />)

    expect(screen.getByTestId('circle-element'))
      .to.have.attr('r')
      .to.equal('100')
  })
})
