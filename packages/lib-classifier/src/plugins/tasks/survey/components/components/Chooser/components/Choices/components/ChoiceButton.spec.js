import { expect } from 'chai'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import { ChoiceButton, THUMBNAIL_ASPECT_RATIO } from './ChoiceButton'

describe('Component > ChoiceButton', function () {
  it('should show a button with expected label', function () {
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
    const choiceButton = screen.getByRole('menuitemcheckbox', { name: 'Aardvark' })
    expect(choiceButton).to.be.ok()
  })

  it('should call onChoose on click of the button', async function () {
    const onChooseSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet
        theme={zooTheme}
      >
        <ChoiceButton
          choiceId='RDVRK'
          choiceLabel='Aardvark'
          onChoose={onChooseSpy}
          tabIndex={0}
        />
      </Grommet>
    )
    const choiceButton = screen.getByRole('menuitemcheckbox', { name: 'Aardvark' })
    await user.click(choiceButton)
    expect(onChooseSpy).to.have.been.calledOnceWith('RDVRK')
  })

  it('should call onKeyDown on keyDown of the button', async function () {
    const onKeyDownSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet
        theme={zooTheme}
      >
        <ChoiceButton
          choiceId='RDVRK'
          choiceLabel='Aardvark'
          hasFocus
          onKeyDown={onKeyDownSpy}
          tabIndex={0}
        />
      </Grommet>
    )
    const choiceButton = screen.getByRole('menuitemcheckbox', { name: 'Aardvark' })
    expect(choiceButton).to.equal(document.activeElement)
    await user.keyboard('{enter}')
    expect(onKeyDownSpy).to.have.been.calledOnce()
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
      const choiceButton = screen.getByRole('menuitemcheckbox', { name: 'Aardvark' })
      await user.click(choiceButton)
      expect(onChooseSpy).to.not.have.been.called()
    })

    it('should not call onKeyDown on keyDown of the button', async function () {
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
      const choiceButton = screen.getByRole('menuitemcheckbox', { name: 'Aardvark' })
      expect(choiceButton).to.equal(document.activeElement)
      await user.keyboard('{enter}')
      expect(onKeyDownSpy).to.not.have.been.called()
    })
  })
})
