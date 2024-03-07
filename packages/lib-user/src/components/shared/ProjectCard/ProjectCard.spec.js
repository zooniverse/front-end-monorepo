import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { NfnCaliFlowers } from './ProjectCard.stories.js'

describe('components > shared > ProjectCard', function () {
  const DefaultStory = composeStory(NfnCaliFlowers, Meta)

  it('should show the project name', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Notes from Nature - Capturing California\'s Flowers')).to.be.ok()
  })

  it('should show the project description', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Using digital images to investigate ​phenological change in a biodiversity hotspot​')).to.be.ok()
  })

  it('should link to the project', function () {
    render(<DefaultStory />)

    expect(screen.getByRole('link', { href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers'})).to.be.ok()
  })
})
