import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, PublicSingle } from './CollectionCard.stories'

describe('components > shared > CollectionCard', function () {
  const DefaultStory = composeStory(Default, Meta)
  const PublicSingleStory = composeStory(PublicSingle, Meta)

  it('should show the collection name', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Best of the Best')).toBeTruthy()
  })

  it('should show the collection description', function () {
    render(<DefaultStory />)

    expect(screen.getByText(`Only the very best subjects I've found in this project. Cool!!`)).toBeTruthy()
  })

  it('should link to the collection', function () {
    render(<DefaultStory />)

    expect(screen.getByRole('link', { href: 'https://www.zooniverse.org/collections/testuser/best-of-the-best' })).toBeTruthy()
  })

  it('should show a private collection icon when the collection is private', function () {
    render(<DefaultStory />)

    expect(screen.getByLabelText('Private collection')).toBeTruthy()
  })

  it('should not show a private collection icon when the collection is not private', function () {
    render(<PublicSingleStory />)

    expect(screen.queryByLabelText('Private collection')).toBeNull()
  })

  it('should show a collaborators icon when the collection has more than one collaborator', function () {
    render(<DefaultStory />)

    expect(screen.getByLabelText('Collection has collaborators')).toBeTruthy()
  })

  it('should not show a collaborators icon when the collection has only one collaborator', function () {
    render(<PublicSingleStory />)

    expect(screen.queryByLabelText('Collection has collaborators')).toBeNull()
  })
})
