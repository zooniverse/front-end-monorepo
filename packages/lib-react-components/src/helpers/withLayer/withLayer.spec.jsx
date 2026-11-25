import { fireEvent, render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import withLayer from './withLayer'

function Content({ children }) {
  return <div>{children}</div>
}

const WithLayer = withLayer(Content)

function renderLayer(props) {
  return render(
    <Grommet theme={zooTheme}>
      <WithLayer title='Layer title' {...props}>
        Layer content
      </WithLayer>
    </Grommet>
  )
}

function pressEscape() {
  fireEvent.keyDown(document, { key: 'Escape', keyCode: 27, which: 27 })
}

describe('HOC > withLayer', function () {
  it('should render nothing when inactive', function () {
    renderLayer()
    expect(screen.queryByText('Layer content')).to.equal(null)
  })

  it('should render the wrapped component in a labelled dialog when active', function () {
    renderLayer({ active: true })
    const dialog = screen.getByRole('dialog', { name: 'Layer title' })
    expect(dialog.textContent).to.equal('Layer content')
  })

  it('should close on a click outside the layer', function () {
    const closeFn = vi.fn()
    renderLayer({ active: true, closeFn })
    fireEvent.mouseDown(document.body)
    expect(closeFn).toHaveBeenCalledOnce()
  })

  it('should close on Escape', function () {
    const closeFn = vi.fn()
    renderLayer({ active: true, closeFn, modal: false })
    pressEscape()
    expect(closeFn).toHaveBeenCalledOnce()
  })

  describe('with closeOnClickOutside false', function () {
    it('should stay open on a click outside the layer', function () {
      const closeFn = vi.fn()
      renderLayer({ active: true, closeFn, closeOnClickOutside: false, modal: false })
      fireEvent.mouseDown(document.body)
      expect(closeFn).not.toHaveBeenCalled()
    })

    it('should close on Escape', function () {
      const closeFn = vi.fn()
      renderLayer({ active: true, closeFn, closeOnClickOutside: false, modal: false })
      pressEscape()
      expect(closeFn).toHaveBeenCalledOnce()
    })
  })
})
