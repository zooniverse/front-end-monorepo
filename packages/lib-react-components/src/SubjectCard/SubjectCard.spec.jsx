import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('../ShareIconButton', function() {
  return {
    default: function MockShareIconButton({ shareUrl }) {
      return <button aria-label='Share' data-share-url={shareUrl} type='button' />
    }
  }
})

import Meta, { LoggedInLandscape } from './stories/SubjectCard.image.stories'

describe('SubjectCard', function() {
  const DefaultStory = composeStory(LoggedInLandscape, Meta)
  const originalUrl = window.location.href

  afterEach(function() {
    window.history.replaceState({}, '', originalUrl)
    vi.restoreAllMocks()
  })

  it('should link to the subject talk page', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('link', { href: '/projects/team/example-project/talk/subjects/75219502' })[0]).toBeTruthy()
  })

  it('should append env query param to the subject talk page link if env exists', function () {
    window.history.replaceState({}, '', '/?env=staging')

    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('link', { href: '/projects/team/example-project/talk/subjects/75219502?env=staging' })[0]).toBeTruthy()
  })

  it('should append env query param to the share URL if env exists', async function() {
    window.history.replaceState({}, '', '/?env=staging')

    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('button', { name: 'Share' })[0].dataset.shareUrl).to.equal(
      `${window.location.origin}/projects/team/example-project/talk/subjects/75219502?env=staging`
    )
  })

  it('should append demo query param to the subject talk page link if demo exists', function () {
    window.history.replaceState({}, '', '/?demo=true')

    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('link', { href: '/projects/team/example-project/talk/subjects/75219502?demo=true' })[0]).toBeTruthy()
  })

  it('should append demo query param to the share URL if demo exists', async function() {
    window.history.replaceState({}, '', '/?demo=true')

    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByRole('button', { name: 'Share' })[0].dataset.shareUrl).to.equal(
      `${window.location.origin}/projects/team/example-project/talk/subjects/75219502?demo=true`
    )
  })

  it('should show the subject ID', function () {
    render(<DefaultStory />)

    // grabbing the first element because each Story renders all three SubjectCard sizes
    expect(screen.getAllByText('Subject 75219502')[0]).toBeTruthy()
  })
})
