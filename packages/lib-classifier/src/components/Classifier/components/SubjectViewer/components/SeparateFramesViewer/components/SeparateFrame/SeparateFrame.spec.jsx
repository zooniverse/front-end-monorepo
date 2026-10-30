import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'mobx-react'
import Meta, { Default } from './SeparateFrame.stories'
import { composeStory } from '@storybook/react'
import mockStore from '@test/mockStore'
import SeparateFrame from './SeparateFrame'

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

  it('should set up a vertical menu focusgroup', async function () {
    const { container } = render(<DefaultStory />)
    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    expect(menu).to.have.attribute('aria-orientation', 'vertical')
    expect(menu.focusGroup).to.equal('menu')
  })

  it('should navigate toolbar menuitems with one tab stop', async function () {
    const { container } = render(<DefaultStory />)
    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    const menuItems = within(menu).getAllByRole('menuitem')
    expect(menuItems.filter(item => item.tabIndex === 0)).to.have.lengthOf(1)

    const user = userEvent.setup()
    await act(async () => menuItems[0].focus())
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.keyboard('{ArrowDown}'))
    expect(document.activeElement).to.equal(menuItems[1])
    await act(async () => user.keyboard('{ArrowUp}'))
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.tab())
    expect(menu.contains(document.activeElement)).to.equal(false)
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

  it('should add the rotate menuitem to the focusgroup when rotation becomes enabled', async function () {
    const store = mockStore()
    const { container } = render(
      <Provider classifierStore={store}>
        <>
          <SeparateFrame
            frame={0}
            frameUrl='image.jpg'
            subject={{ id: '1', locations: [{ url: 'image.jpg', type: 'image' }] }}
          />
          <button type='button' onClick={() => store.subjectViewer.enableRotation()}>
            Enable rotation
          </button>
        </>
      </Provider>
    )
    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    const user = userEvent.setup()

    expect(within(menu).queryByRole('menuitem', { name: 'Rotate subject' })).to.equal(null)
    await user.click(screen.getByRole('button', { name: 'Enable rotation' }))

    const rotateButton = await within(menu).findByRole('menuitem', { name: 'Rotate subject' })
    expect(rotateButton.tabIndex).to.equal(-1)
    expect(within(menu).getAllByRole('menuitem').filter(item => item.tabIndex === 0)).to.have.lengthOf(1)
  })

})
