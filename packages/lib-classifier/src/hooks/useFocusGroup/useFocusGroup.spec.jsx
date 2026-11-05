import { render, screen, waitFor, within } from '@testing-library/react'
import useFocusGroup from './useFocusGroup'

function FocusGroupFixture({
  behavior,
  axis,
  enabled = true,
  renderOwner = true,
  includeSecondTab = true,
  includeNestedFocusGroup = false,
  firstTabDisabled = false,
  ownerRole,
  firstTabRole
}) {
  const focusGroup = useFocusGroup({ behavior, axis }, enabled)

  return (
    renderOwner && (
      <div ref={focusGroup} role={ownerRole}>
        <button type='button' disabled={firstTabDisabled} role={firstTabRole}>First tab</button>
        {includeSecondTab && <button type='button'>Second tab</button>}
        {includeNestedFocusGroup && (
          <div focusgroup='menu'>
            <button type='button'>Nested item</button>
          </div>
        )}
      </div>
    )
  )
}

describe('Hook > useFocusGroup', function () {
  it('should apply tablist and tab roles for the tablist behavior', async function () {
    render(<FocusGroupFixture behavior='tablist' />)

    const tablist = await screen.findByRole('tablist')
    const tabs = within(tablist).getAllByRole('tab')

    expect(tablist).to.have.attribute('focusgroup', 'tablist')
    expect(tablist).to.have.attribute('aria-orientation', 'horizontal')
    expect(tabs).to.have.lengthOf(2)
  })

  it('should set vertical orientation for a radiogroup with block axis', async function () {
    render(<FocusGroupFixture behavior='radiogroup' axis='block' />)

    const radiogroup = await screen.findByRole('radiogroup')
    const radios = within(radiogroup).getAllByRole('radio')

    expect(radiogroup).to.have.attribute('focusgroup', 'radiogroup block')
    expect(radiogroup).to.have.attribute('aria-orientation', 'vertical')
    expect(radios).to.have.lengthOf(2)
  })

  it('should initialize when the owner appears and update when items are added', async function () {
    const { rerender } = render(<FocusGroupFixture behavior='tablist' enabled={false} />)

    rerender(<FocusGroupFixture behavior='tablist' enabled />)
    const tablist = await screen.findByRole('tablist')
    expect(within(tablist).getByRole('tab', { name: 'First tab' })).to.have.property('tabIndex', 0)

    rerender(<FocusGroupFixture behavior='tablist' enabled includeSecondTab />)
    const secondTab = await within(tablist).findByRole('tab', { name: 'Second tab' })
    expect(secondTab).to.have.property('tabIndex', -1)
  })

  it('should initialize when the owner appears while enabled', async function () {
    const { rerender } = render(
      <FocusGroupFixture behavior='tablist' enabled renderOwner={false} />
    )

    rerender(<FocusGroupFixture behavior='tablist' enabled />)
    const tablist = await screen.findByRole('tablist')

    expect(tablist).to.have.attribute('focusgroup', 'tablist')
    expect(within(tablist).getByRole('tab', { name: 'First tab' })).to.have.property('tabIndex', 0)
  })

  it('should exclude disabled buttons from the focusgroup item collection', async function () {
    render(<FocusGroupFixture behavior='tablist' firstTabDisabled />)

    const tablist = await screen.findByRole('tablist')
    const disabledButton = within(tablist).getByRole('button', { name: 'First tab' })
    const enabledTab = within(tablist).getByRole('tab', { name: 'Second tab' })

    expect(disabledButton).not.to.have.attribute('role')
    expect(disabledButton).not.to.have.attribute('data-fg-ati')
    expect(enabledTab).to.have.attribute('data-fg-ati', 'none')
    expect(enabledTab).to.have.property('tabIndex', 0)
  })

  it('should undecorate items that become disabled', async function () {
    const { rerender } = render(<FocusGroupFixture behavior='menu' />)
    const menu = await screen.findByRole('menu')
    const firstItem = within(menu).getByRole('menuitem', { name: 'First tab' })

    expect(firstItem).to.have.attribute('data-fg-ati', 'none')

    rerender(<FocusGroupFixture behavior='menu' firstTabDisabled />)

    await waitFor(() => {
      expect(firstItem).not.to.have.attribute('role')
      expect(firstItem).not.to.have.attribute('data-fg-ati')
      expect(firstItem).not.to.have.attribute('tabindex')
    })
  })

  it('should exclude items inside nested focusgroups', async function () {
    const { container } = render(
      <FocusGroupFixture behavior='menu' includeNestedFocusGroup />
    )
    const menu = await screen.findByRole('menu')
    const nestedItem = within(menu).getByRole('button', { name: 'Nested item' })

    expect(within(menu).getAllByRole('menuitem')).to.have.lengthOf(2)
    expect(nestedItem).not.to.have.attribute('data-fg-ati')
    expect(nestedItem).not.to.have.attribute('role')
  })

  it('should restore hook-owned attributes when disabled', async function () {
    const { container, rerender } = render(<FocusGroupFixture behavior='menu' />)
    const menu = await screen.findByRole('menu')
    const items = within(menu).getAllByRole('menuitem')

    rerender(<FocusGroupFixture behavior='menu' enabled={false} />)

    await waitFor(() => {
      expect(menu).not.to.have.attribute('focusgroup')
      expect(menu).not.to.have.attribute('aria-orientation')
      expect(menu).not.to.have.attribute('role')
      items.forEach(item => {
        expect(item).not.to.have.attribute('role')
        expect(item).not.to.have.attribute('data-fg-ati')
        expect(item).not.to.have.attribute('tabindex')
      })
    })
    expect(container.querySelector('[focusgroup]')).to.be.null
  })

  it('should preserve author-supplied owner and item roles', async function () {
    const { container } = render(
      <FocusGroupFixture behavior='menu' ownerRole='group' firstTabRole='menuitemcheckbox' />
    )

    const owner = container.querySelector('[focusgroup]')
    const checkboxItem = within(owner).getByRole('menuitemcheckbox', { name: 'First tab' })
    const inferredItem = within(owner).getByRole('menuitem', { name: 'Second tab' })

    expect(owner).to.have.attribute('role', 'group')
    expect(checkboxItem).to.have.attribute('role', 'menuitemcheckbox')
    expect(inferredItem).to.have.attribute('role', 'menuitem')
  })

  it('should leave native focusgroup roles implicit', async function () {
    Object.defineProperty(HTMLElement.prototype, 'focusGroup', {
      configurable: true,
      get: () => ({ supports: () => true })
    })

    try {
      const { container } = render(<FocusGroupFixture behavior='tablist' />)
      const owner = container.querySelector('[focusgroup]')
      const buttons = within(owner).getAllByRole('button')

      expect(owner).not.to.have.attribute('role')
      expect(owner).not.to.have.attribute('aria-orientation')
      buttons.forEach(button => expect(button).not.to.have.attribute('role'))
    } finally {
      delete HTMLElement.prototype.focusGroup
    }
  })
})
