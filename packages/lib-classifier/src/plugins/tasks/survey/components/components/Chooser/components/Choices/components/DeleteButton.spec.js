import { Grommet } from 'grommet'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import DeleteButton from './DeleteButton'

describe('Component > DeleteButton', function () {
  it('should show a button with expected aria-label', function () {
    render(
      <Grommet
        theme={zooTheme}
      >
        <DeleteButton
          choiceLabel='Aardvark'
          deleteFn={() => {}}
        />
      </Grommet>
    )
    const deleteButton = screen.getByRole('button', { name: 'SurveyTask.DeleteButton.delete' })
    expect(deleteButton).to.be.ok()
  })

  describe('when disabled', function () {
    it('should not call deleteFn on click of the button', async function () {
      const deleteFnSpy = sinon.spy()
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet
          theme={zooTheme}
        >
          <DeleteButton
            choiceLabel='Aardvark'
            deleteFn={deleteFnSpy}
            disabled={true}
          />
        </Grommet>
      )
      const deleteButton = screen.getByRole('button', { name: 'SurveyTask.DeleteButton.delete' })
      await user.click(deleteButton)
      expect(deleteFnSpy).to.not.have.been.called()
    })
  })

  describe('when enabled', function () {
    it('should call deleteFn on click of the button', async function () {
      const deleteFnSpy = sinon.spy()
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet
          theme={zooTheme}
        >
          <DeleteButton
            choiceLabel='Aardvark'
            deleteFn={deleteFnSpy}
            disabled={false}
          />
        </Grommet>
      )
      const deleteButton = screen.getByRole('button', { name: 'SurveyTask.DeleteButton.delete' })
      await user.click(deleteButton)
      expect(deleteFnSpy).to.have.been.calledOnce()
    })
  })
})
