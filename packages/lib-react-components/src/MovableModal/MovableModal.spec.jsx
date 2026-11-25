import { fireEvent, render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { useState } from 'react'

import { MovableModal } from './MovableModal'

function renderModal(props) {
  const { container } = render(
    <Grommet theme={zooTheme}>
      <MovableModal closeFn={() => true} title='Modal Heading' {...props}>
        <input aria-label='Notes' type='text' />
      </MovableModal>
    </Grommet>
  )
  const modal = container.querySelector('[aria-keyshortcuts]')
  return { modal, movable: modal?.closest('.react-draggable') }
}

describe('MovableModal', function () {
  it('should render the title and children', function () {
    renderModal()
    expect(screen.getByText('Modal Heading')).toBeDefined()
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeDefined()
  })

  describe('drag icon', function () {
    it('should show in the heading, hidden from assistive technology', function () {
      const { modal } = renderModal()
      const icon = modal.querySelector('svg[aria-label="Drag"]')
      expect(icon.getAttribute('aria-hidden')).to.equal('true')
      expect(icon.parentElement.contains(screen.getByText('Modal Heading'))).to.equal(true)
    })

    it('should show without a title', function () {
      const { modal } = renderModal({ title: '' })
      expect(modal.querySelector('svg[aria-label="Drag"]')).to.not.equal(null)
    })
  })

  describe('with a controlled position', function () {
    function ControlledModal() {
      const [position, setPosition] = useState({ x: 0, y: 0 })
      const rndProps = {
        onDragStop: (event, { x, y }) => setPosition({ x, y }),
        position
      }
      return (
        <Grommet theme={zooTheme}>
          <MovableModal closeFn={() => true} rndProps={rndProps} title='Modal Heading'>
            <p>Content</p>
          </MovableModal>
        </Grommet>
      )
    }

    it('should move with the arrow keys', function () {
      const { container } = render(<ControlledModal />)
      const modal = container.querySelector('[aria-keyshortcuts]')
      fireEvent.keyDown(modal, { key: 'ArrowRight' })
      fireEvent.keyDown(modal, { key: 'ArrowDown', shiftKey: true })
      expect(modal.closest('.react-draggable').style.transform).to.equal('translate(10px,50px)')
    })
  })

  describe('keyboard', function () {
    it('should be reachable with the Tab key', function () {
      const { modal } = renderModal()
      expect(modal.tabIndex).to.equal(0)
    })

    it('should describe its shortcuts', function () {
      const { modal } = renderModal()
      expect(modal.getAttribute('aria-keyshortcuts')).to.equal('ArrowUp ArrowDown ArrowLeft ArrowRight')
    })

    it('should move right with the right arrow key', function () {
      const { modal, movable } = renderModal()
      fireEvent.keyDown(modal, { key: 'ArrowRight' })
      expect(movable.style.transform).to.equal('translate(10px,0px)')
    })

    it('should move down with the down arrow key', function () {
      const { modal, movable } = renderModal()
      fireEvent.keyDown(modal, { key: 'ArrowDown' })
      expect(movable.style.transform).to.equal('translate(0px,10px)')
    })

    it('should move further with Shift held', function () {
      const { modal, movable } = renderModal()
      fireEvent.keyDown(modal, { key: 'ArrowRight', shiftKey: true })
      fireEvent.keyDown(modal, { key: 'ArrowDown', shiftKey: true })
      expect(movable.style.transform).to.equal('translate(50px,50px)')
    })

    it('should stay inside the window', function () {
      const { modal, movable } = renderModal()
      fireEvent.keyDown(modal, { key: 'ArrowLeft' })
      fireEvent.keyDown(modal, { key: 'ArrowUp' })
      expect(movable.style.transform).to.equal('translate(0px,0px)')
    })

    it('should keep the arrow keys from scrolling the page', function () {
      const { modal } = renderModal()
      const notCancelled = fireEvent.keyDown(modal, { key: 'ArrowDown' })
      expect(notCancelled).to.equal(false)
    })

    it('should leave arrow keys alone inside the content', function () {
      const { movable } = renderModal()
      const notCancelled = fireEvent.keyDown(screen.getByRole('textbox', { name: 'Notes' }), { key: 'ArrowRight' })
      expect(notCancelled).to.equal(true)
      expect(movable.style.transform).to.equal('translate(0px,0px)')
    })

    it('should leave other keys alone', function () {
      const { modal, movable } = renderModal()
      const notCancelled = fireEvent.keyDown(modal, { key: 'a' })
      expect(notCancelled).to.equal(true)
      expect(movable.style.transform).to.equal('translate(0px,0px)')
    })
  })
})
