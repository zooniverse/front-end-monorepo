import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { NfnCaliFlowers } from './ProjectCard.stories'

describe('components > shared > ProjectCard', function () {
  const DefaultStory = composeStory(NfnCaliFlowers, Meta)

  it('should show the project name', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all four ProjectCard sizes
    expect(screen.getAllByText('Notes from Nature - Capturing California\'s Flowers')[0]).toBeTruthy()
  })

  it('should show the project description', function () {
    render(<DefaultStory />)

    expect(screen.getAllByText('Using digital images to investigate ​phenological change in a biodiversity hotspot​')[0]).toBeTruthy()
  })

  it('should link to the project', function () {
    render(<DefaultStory />)

    expect(screen.getAllByRole('link', { href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers'})[0]).toBeTruthy()
  })
})
