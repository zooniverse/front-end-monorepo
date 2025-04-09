import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, {
  Default,
  Disabled,
  Next,
  BackOrDone
} from './TaskNavButtons.stories.js'

describe('TaskNavButtons', function () {
  it('should display Done + DoneAndTalk by default', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(
      screen.getByRole('link', {
        name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk TaskArea.Tasks.DoneAndTalkButton.newTab'
      })
    ).to.be.ok()

    expect(
      screen.getByRole('button', {
        name: 'TaskArea.Tasks.DoneButton.done'
      })
    ).to.be.ok()
  })

  it('should disable the buttons based on the disabled prop', function () {
    const DisabledStory = composeStory(Disabled, Meta)
    render(<DisabledStory />)

    expect(
      screen.getByRole('button', {
        name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk TaskArea.Tasks.DoneAndTalkButton.newTab'
      }).disabled
    ).to.be.true()

    expect(
      screen.getByRole('button', {
        name: 'TaskArea.Tasks.DoneButton.done'
      }).disabled
    ).to.be.true()
  })

  it('should display a labeled NextButton when there is a next step', function () {
    const NextButtonStory = composeStory(Next, Meta)
    render(<NextButtonStory />)
    expect(
      screen.getByRole('button', { name: 'TaskArea.Tasks.NextButton.next' })
    ).to.be.ok()
  })

  it('should display a labeled BackButton when step history can go back', function () {
    const BackOrDoneStory = composeStory(BackOrDone, Meta)
    render(<BackOrDoneStory />)
    expect(
      screen.getByRole('button', { name: 'TaskArea.Tasks.BackButton.back' })
    ).to.be.ok()
  })
})
