import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import { PROJECTS } from '../../../../test/mocks/panoptes'

import Meta, { Default } from './TopProjects.stories.js'

describe('components > shared > TopProjects', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show "Top Projects" content section title', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Top Projects')).to.be.ok()
  })

  it('should show a "see more" link', function () {
    render(<DefaultStory />)

    expect(screen.getByRole('link', { name: 'See more' })).to.be.ok()
  })

  it('should show the projects provided', function () {
    render(<DefaultStory />)

    PROJECTS.forEach(project => {
      expect(screen.getByText(project.display_name)).to.be.ok()
    })
  })
})
