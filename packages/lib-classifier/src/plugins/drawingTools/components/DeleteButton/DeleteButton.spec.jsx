import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { Point } from '@plugins/drawingTools/models/marks'
import { DeleteButton } from './DeleteButton'

describe('Drawing tools > DeleteButton', function () {
  const mark = Point.create({ id: 'point1', x: 50, y: 50, toolType: 'point' })

  it('should render without crashing', function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <DeleteButton label='Delete' mark={mark} />
      </svg>
    )

    const deleteButton = screen.getByRole('button', {
      name: /delete/i
    })

    expect(deleteButton).to.exist()
  })
})
