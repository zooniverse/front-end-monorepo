import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
import Rectangle from './Rectangle'
import { default as RectangleMark } from '../../models/marks/Rectangle'

describe('Rectangle tool', () => {
  let mark
  beforeEach(() => {
    mark = RectangleMark.create({
      id: 'rect1',
      toolType: 'rectangle',
      x_center: 100,
      y_center: 200,
      width: 30,
      height: 40
    })
  })

  it('should render a rectangle with correct dimensions and position', () => {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <Rectangle mark={mark} scale={1} />
      </svg>
    )

    const rectElement = screen.getByTestId('rectangle-element')

    expect(rectElement.getAttribute('height')).to.equal('40')
    expect(rectElement.getAttribute('width')).to.equal('30')
    expect(rectElement.getAttribute('x')).to.equal('85')
    expect(rectElement.getAttribute('y')).to.equal('180')
  })

  it('should render an active rectangle with four drag handles', () => {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <Rectangle active mark={mark} scale={1} />
      </svg>
    )

    expect(screen.getByTestId('rect-dragHandle1')).to.exist
    expect(screen.getByTestId('rect-dragHandle2')).to.exist
    expect(screen.getByTestId('rect-dragHandle3')).to.exist
    expect(screen.getByTestId('rect-dragHandle4')).to.exist
  })

  it('should resize when a drag handle is moved', async () => {
    const user = userEvent.setup()

    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <Rectangle active mark={mark} scale={1} />
      </svg>
    )

    const rectElement = screen.getByTestId('rectangle-element')

    expect(rectElement.getAttribute('height')).to.equal('40')
    expect(rectElement.getAttribute('width')).to.equal('30')
    expect(rectElement.getAttribute('x')).to.equal('85')
    expect(rectElement.getAttribute('y')).to.equal('180')

    const rectDragHandle3 = screen.getByTestId('rect-dragHandle3')

    await user.pointer([
      { keys: '[MouseLeft>]', target: rectDragHandle3 },
      { coords: { x: 300, y: 200 } },
      { keys: '[/MouseLeft]' }
    ])

    expect(rectElement.getAttribute('height')).to.equal('240')
    expect(rectElement.getAttribute('width')).to.equal('270')
    expect(rectElement.getAttribute('x')).to.equal('115')
    expect(rectElement.getAttribute('y')).to.equal('180')
  })
})
