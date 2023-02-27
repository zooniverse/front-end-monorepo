import { expect } from 'chai'
import { Grommet } from 'grommet'
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
    const choiceButton = screen.getByRole('button', { name: 'Aardvark' })
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
      const choiceButton = screen.getByRole('button', { name: 'Aardvark' })
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
      const choiceButton = screen.getByRole('button', { name: 'Aardvark' })
      expect(choiceButton).to.equal(document.activeElement)
      await user.keyboard('{enter}')
      expect(onKeyDownSpy).to.not.have.been.called()
    })
  })
})

// UI testing
// - choice button styling is determined by the columns count and media width
// - the following breaks down the expected choice button styling by columns count and media width:

// any columns count and media width >= 1280px (i.e. laptop or desktop) - choice button styling ROW

// 1 column
//   - any media width - choice button styling ROW

// 2 columns
//   - media width <= 768px (i.e. iPhone held vertically) - choice button styling ROW
//   - media 768px < width < 1280px (i.e. iPhone held horizontally) - choice button styling COLUMN

// 3 column
//   - media width <= 768px (i.e. iPhone held vertically) - choice button styling COLUMN
//   - media 768px < width < 1280px (i.e. iPhone held horizontally) - choice button styling COLUMN

// the Choices storybooks (https://zooniverse.github.io/front-end-monorepo/@zooniverse/classifier/?path=/story/tasks-survey-chooser-choices--less-thirty-more-twenty) reflect the above details if you change the responsive viewport in the storybook toolbar.
