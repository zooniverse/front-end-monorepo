import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Meta, { Default } from './SeparateFrame.stories'
import { composeStory } from '@storybook/react'

function makeFocusgroupItemsVisible(container) {
  // jsdom reports no layout boxes or default writing mode for toolbar buttons.
  const focusgroup = container.querySelector('[focusgroup]')
  focusgroup.style.writingMode = 'horizontal-tb'
  container.querySelectorAll('[focusgroup] button').forEach(button => {
    button.style.writingMode = 'horizontal-tb'
    Object.defineProperty(button, 'getClientRects', {
      configurable: true,
      value: () => [{}]
    })
  })
}

describe('Component > SeparateFrame', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should display an image element', async function () {
    const { container } = render(<DefaultStory />)
    const imageElement = container.querySelector('image')
    expect(imageElement).to.exist
  })

  it('should display an image toolbar', function () {
    render(<DefaultStory />)
    const zoomInBtn = screen.getByLabelText('Zoom in on subject')
    expect(zoomInBtn).to.exist
  })

  it('should set up a vertical menubar focusgroup', async function () {
    const { container } = render(<DefaultStory />)
    makeFocusgroupItemsVisible(container)
    const menubar = await screen.findByRole('menubar')
    expect(menubar).to.have.attribute('aria-orientation', 'vertical')
    expect(menubar.focusGroup).to.equal('menubar block')
  })

  it('should navigate toolbar menuitems with one tab stop', async function () {
    const { container } = render(<DefaultStory />)
    makeFocusgroupItemsVisible(container)
    const menubar = await screen.findByRole('menubar')
    const menuItems = within(menubar).getAllByRole('menuitem')
    expect(menuItems.filter(item => item.tabIndex === 0)).to.have.lengthOf(1)

    const user = userEvent.setup()
    await act(async () => menuItems[0].focus())
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.keyboard('{ArrowDown}'))
    expect(document.activeElement).to.equal(menuItems[1])
    await act(async () => user.keyboard('{ArrowUp}'))
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.tab())
    expect(menubar.contains(document.activeElement)).to.equal(false)
  })

  it('should activate the rotate menuitem with Enter and Space', async function () {
    const { container } = render(<DefaultStory />)
    makeFocusgroupItemsVisible(container)
    const rotateButton = await screen.findByRole('menuitem', { name: 'Rotate subject' })
    const rotationTransform = container.querySelector('[data-testid="single-image-canvas-rotation-transform-group"]')
    const user = userEvent.setup()
    await act(async () => rotateButton.focus())

    await act(async () => user.keyboard('{Enter}'))
    expect(rotationTransform).to.have.attribute('transform', 'rotate(-90 400 300)')
    await act(async () => user.keyboard('{ }'))
    expect(rotationTransform).to.have.attribute('transform', 'rotate(-180 400 300)')
  })
})
