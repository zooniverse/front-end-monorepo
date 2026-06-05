import { render, screen } from '@testing-library/react'
import UndoButton from './UndoButton'

describe('Drawing tools > UndoButton', () => {
  it('should render without crashing', function () {
    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <UndoButton x={50} y={-10} />
      </svg>
    )

    const undoButton = screen.getByRole('button', {
      name: /undo/i
    })

    expect(undoButton).to.exist
  })
})
