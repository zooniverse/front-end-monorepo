import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './SubjectCard.stories.js'

describe('UserHome > compoents > SubjectCard', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show the subject id', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all four ProjectCard sizes
    expect(
      screen.getAllByText(`Subject ${Default.args.subjectID}`)[0]
    ).to.be.ok()
  })

  it('should link to the subject Talk page', function () {
    render(<DefaultStory />)

    const href = `https://www.zooniverse.org/projects/${Default.args.projectSlug}/talk/subjects/${Default.args.subjectID}`
    expect(screen.getAllByRole('link', { href: href})[0]).to.be.ok()
  })
})
