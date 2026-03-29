import { render, screen, fireEvent } from '@testing-library/react'
import sinon from 'sinon'

import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import LineControls from './LineControls'

describe('LineControls', () => {
  let mark
  let onDelete

  beforeEach(() => {
    mark = {
      id: 'test',
      undo: sinon.stub(),
      redo: sinon.stub(),
      close: sinon.stub()
    }    
    onDelete = sinon.stub()

    render(
      <Grommet theme={zooTheme}>
        <LineControls 
          mark={mark}
          onDelete={onDelete}
        />
      </Grommet>
    )
  })

  it('should render without crashing', () => {
    const svg = document.querySelector('svg')
    expect(svg).to.be.ok
  })

  it('should render default buttons', () => {
    const undoButton = screen.getByRole('button', {name: 'Undo'})
    expect(undoButton).to.be.ok

    const redoButton = screen.getByRole('button', {name: 'Redo'})
    expect(redoButton).to.be.ok

    const closeButton = screen.getByRole('button', {name: 'Close'})
    expect(closeButton).to.be.ok

    const deleteButton = screen.getByRole('button', {name: 'Delete'})
    expect(deleteButton).to.be.ok

    const moveButton = screen.getByRole('button', {name: 'Move'})
    expect(moveButton).to.be.ok
  })

  it('should call mark.undo on pointer down on undo button', () => {
    const button = screen.getByRole('button', {name: 'Undo'})
    fireEvent.pointerDown(button)
    expect(mark.undo).to.have.been.calledOnce
  })

  it('should call mark.redo on pointer down on redo button', () => {
    const button = screen.getByRole('button', {name: 'Redo'})
    fireEvent.pointerDown(button)
    expect(mark.redo).to.have.been.calledOnce
  })

  it('should call mark.close on pointer down on close button', () => {
    const button = screen.getByRole('button', {name: 'Close'})
    fireEvent.pointerDown(button)
    expect(mark.close).to.have.been.calledOnce
  })

  it('should show confirmation buttons on pointer down on delete', () => {
    const button = screen.getByRole('button', {name: 'Delete'})
    fireEvent.pointerDown(button)

    const deleteCancelButton = screen.getByRole('button', {name: 'Cancel Delete'})
    expect(deleteCancelButton).to.be.ok

    const deleteConfirmButton = screen.getByRole('button', {name: 'Confirm Delete'})
    expect(deleteConfirmButton).to.be.ok
  })

  it('should show control buttons on pointer down on cancel delete', () => {
    const deleteButton = screen.getByRole('button', {name: 'Delete'})
    fireEvent.pointerDown(deleteButton)

    const deleteCancelButton = screen.getByRole('button', {name: 'Cancel Delete'})
    fireEvent.pointerDown(deleteCancelButton)

    const moveButton = screen.getByRole('button', {name: 'Move'})
    expect(moveButton).to.be.ok
  })

  it('should call onDelete on pointer down on confirm delete', () => {
    const deleteButton = screen.getByRole('button', {name: 'Delete'})
    fireEvent.pointerDown(deleteButton)

    const deleteConfirmButton = screen.getByRole('button', {name: 'Confirm Delete'})
    fireEvent.pointerDown(deleteConfirmButton)
    expect(onDelete).to.have.been.calledOnce
    expect(onDelete).to.have.been.calledWith(mark)
  })

  it('should change the position on pointer down on move', () => {
    const svg = document.querySelector('svg')
    const className = svg.className.baseVal

    const button = screen.getByRole('button', {name: 'Move'})
    fireEvent.pointerDown(button)
    
    expect(svg.className.baseVal).not.to.equal(className)
  })
})