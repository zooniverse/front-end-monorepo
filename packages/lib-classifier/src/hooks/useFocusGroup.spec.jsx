import { render, screen, within } from '@testing-library/react'
import { useRef } from 'react'
import useFocusGroup from './useFocusGroup'

function FocusGroupFixture({ behavior, axis, enabled = true, includeSecondTab = true, firstTabDisabled = false }) {
  const focusGroup = useRef(null)
  useFocusGroup(focusGroup, { behavior, axis }, enabled)

  return (
    enabled && (
      <div ref={focusGroup}>
        <button type='button' disabled={firstTabDisabled}>First tab</button>
        {includeSecondTab && <button type='button'>Second tab</button>}
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
