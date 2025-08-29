import { render, screen } from '@testing-library/react'

import Selection from "./Selection";

describe('Selection', function () {
  let selection, deleteButton

  before(function () {
    render(<Selection color='#65EECA' text='This is a test' />)
    selection = document.querySelector('mark')
    deleteButton = screen.getByRole('button', { name: 'HighlighterTask.delete' })
  })

  it('should render the text (with delete button ×)', function () {
    expect(selection).to.have.text('This is a test ×')
  })

  it('should render the delete button', function () {
    expect(deleteButton).toBeDefined()
    expect(deleteButton).to.have.text('×')
  })
})
