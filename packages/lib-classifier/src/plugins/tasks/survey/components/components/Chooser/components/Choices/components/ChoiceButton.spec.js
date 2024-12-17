import { expect } from 'chai'
import { Grommet } from 'grommet'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import ChoiceButton from './ChoiceButton'

describe('Component > ChoiceButton', function () {
  it('should show a menuitem with expected label', function () {
    render(
      <Grommet
        theme={zooTheme}
      >
        <ChoiceButton
          choiceId='RDVRK'
          choiceLabel='Aardvark'
          tabIndex={0}
        />
      </Grommet>
    )
    const choiceMenuItem = screen.getByRole('menuitem', { name: 'Aardvark' })
    expect(choiceMenuItem).to.be.ok()
  })

  it('should have a button to open the submenu for the choice', function () {
    render(
      <Grommet
        theme={zooTheme}
      >
        <ChoiceButton
          choiceId='RDVRK'
          choiceLabel='Aardvark'
          tabIndex={0}
        />
      </Grommet>
    )
    const choiceButton = screen.getByRole('button', { name: 'Open submenu for Aardvark' })
    expect(choiceButton).to.be.ok()
  })

  describe('when disabled', function () {
    it('should not call onChoose on click of the button', async function () {
      const onChooseSpy = sinon.spy()
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet
          theme={zooTheme}
        >
          <ChoiceButton
            choiceId='RDVRK'
            choiceLabel='Aardvark'
            disabled
            onChoose={onChooseSpy}
            tabIndex={0}
          />
        </Grommet>
      )
      const choiceButton = screen.getByRole('button', { name: 'Open submenu for Aardvark' })
      await user.click(choiceButton)
      expect(onChooseSpy).to.not.have.been.called()
    })

    it('should not call onKeyDown on keyDown of the menuitem', async function () {
      const onKeyDownSpy = sinon.spy()
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet
          theme={zooTheme}
        >
          <ChoiceButton
            choiceId='RDVRK'
            choiceLabel='Aardvark'
            disabled
            hasFocus
            onKeyDown={onKeyDownSpy}
            tabIndex={0}
          />
        </Grommet>
      )
      const choiceMenuItem = screen.getByRole('menuitem', { name: 'Aardvark' })
      expect(choiceMenuItem).to.equal(document.activeElement)
      await user.keyboard('{enter}')
      expect(onKeyDownSpy).to.not.have.been.called()
    })
  })

  describe('when selected', function () {
    it('should show a menuitem with expected aria label', function () {
      render(
        <Grommet
          theme={zooTheme}
        >
          <ChoiceButton
            choiceId='RDVRK'
            choiceLabel='Aardvark'
            selected={true}
            tabIndex={0}
          />
        </Grommet>
      )
      const choiceButton = screen.getByRole('menuitem', { name: 'Aardvark; identified' })
      expect(choiceButton).to.be.ok()
    })
  })
})
