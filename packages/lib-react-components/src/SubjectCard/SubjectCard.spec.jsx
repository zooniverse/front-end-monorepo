import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { LoggedInLandscape } from './stories/static/SubjectCard.image.stories'

describe('SubjectCard', function() {
  const DefaultStory = composeStory(LoggedInLandscape, Meta)

  it('should link to the subject talk page', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('link', { href: '/projects/team/example-project/talk/subjects/75219502' })[0]).toBeTruthy()
  })

  it('should show the subject ID', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByText('Subject 75219502')[0]).toBeTruthy()
  })
})
