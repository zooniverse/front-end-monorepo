import { render, screen } from '@testing-library/react'
import { DeleteButton } from './DeleteButton'
// import { Point } from '@plugins/drawingTools/models/marks'

// Must be skipped because the above import isn't handled as expected in Vitest's env
describe.skip('Drawing tools > DeleteButton', function () {
  // const mark = Point.create({ id: 'point1', x: 50, y: 50, toolType: 'point' })

  it('should render without crashing', function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <DeleteButton label='Delete' mark={mark} />
      </svg>
    )

    const deleteButton = screen.getByRole('button', {
      name: /delete/i
    })

    expect(deleteButton).to.exist
  })
})
