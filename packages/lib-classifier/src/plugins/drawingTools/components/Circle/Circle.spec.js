import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
import Circle from './Circle'
import { default as CircleMark } from '../../models/marks/Circle'

describe.only('Circle tool', function () {
  let mark
  beforeEach(function () {
    mark = CircleMark.create({
      id: 'circle1',
      toolType: 'circle',
      x_center: 200,
      y_center: 200,
      r: 50
    })
  })

  it('should render a Circle with the coordinates provided', () => {
    render(<Circle active mark={mark} scale={1} />)

    expect(screen.getByTestId('circle-element'))
      .to.have.attr('r')
      .to.equal('50')
  })

  it('should change the radius when drag handle is moved', async () => {
    const user = userEvent.setup()

    render(<Circle active mark={mark} scale={1} />)

    expect(mark.x_center).to.equal(200)
    expect(mark.y_center).to.equal(200)
    expect(mark.r).to.equal(50)

    // click on dragHandle
    // move dragHandle
    // release mouse button
    const circleDragHandle = screen.getByTestId('draghandle')
    await user.pointer([
      { keys: '[MouseLeft>]', target: circleDragHandle },
      { coords: { x: 300, y: 200 } },
      { keys: '[/MouseLeft]' }
    ])

    expect(mark.x_center).to.equal(200)
    expect(mark.y_center).to.equal(200)
    expect(mark.r).to.equal(100)
  })
})
