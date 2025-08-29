import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, {
  Default,
  Disabled,
  Next,
  BackOrDone
} from './TaskNavButtons.stories'

describe('TaskNavButtons', function () {
  it('should display Done + DoneAndTalk by default', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(
      screen.getByRole('link', {
        name: 'Done & Talk in a new tab'
      })
    ).toBeDefined()

    expect(
      screen.getByRole('button', {
        name: 'Done'
      })
    ).toBeDefined()
  })

  it('should disable the buttons based on the disabled prop', function () {
    const DisabledStory = composeStory(Disabled, Meta)
    render(<DisabledStory />)

    expect(
      screen.getByRole('button', {
        name: 'Done & Talk in a new tab'
      }).disabled
    ).to.equal(true)

    expect(
      screen.getByRole('button', {
        name: 'Done'
      }).disabled
    ).to.equal(true)
  })

  it('should display a labeled NextButton when there is a next step', function () {
    const NextButtonStory = composeStory(Next, Meta)
    render(<NextButtonStory />)
    expect(
      screen.getByRole('button', { name: 'Next' })
    ).toBeDefined()
  })

  it('should display a labeled BackButton when step history can go back', function () {
    const BackOrDoneStory = composeStory(BackOrDone, Meta)
    render(<BackOrDoneStory />)
    expect(
      screen.getByRole('button', { name: 'Back' })
    ).toBeDefined()
  })
})
