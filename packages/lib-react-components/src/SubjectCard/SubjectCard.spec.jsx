import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('../ShareIconButton', function() {
  return {
    default: function MockShareIconButton({ shareUrl }) {
      return <button aria-label='Share' data-share-url={shareUrl} type='button' />
    }
  }
})

import SimpleMeta, { Landscape as SimpleLandscape } from './stories/simple/SubjectCard.image.stories'
import InteractiveMeta, {
  Landscape as InteractiveLandscape,
  LandscapeWithCover,
  LandscapeWithOnSetCover
} from './stories/interactive/singleMedia/SubjectCard.image.stories'
import { RADIO_METEOR_ZOO_SUBJECT } from './stories/SubjectCardStoryData'

describe('SubjectCard', function() {
  const DefaultStory = composeStory(SimpleLandscape, SimpleMeta)
  const InteractiveDefaultStory = composeStory(InteractiveLandscape, InteractiveMeta)
  const WithCoverStory = composeStory(LandscapeWithCover, InteractiveMeta)
  const WithOnSetCoverStory = composeStory(LandscapeWithOnSetCover, InteractiveMeta)
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

  describe('with collection cover', function () {
    it('should not render cover by default', function () {
      render(<InteractiveDefaultStory />)
      expect(screen.queryByText('Collection Cover')).toBeNull()
      expect(screen.queryByText('Set as Collection Cover')).toBeNull()
    })

    it('should call onSetCover with the subject when the button is clicked', async function () {
      const user = userEvent.setup()
      const onSetCover = vi.fn()
      render(<WithOnSetCoverStory onSetCover={onSetCover} />)

      await user.click(screen.getByRole('button', { name: 'Set as Collection Cover' }))
      expect(onSetCover).toHaveBeenCalledWith(RADIO_METEOR_ZOO_SUBJECT)
    })

    it('should show the cover banner when isCover is true', function () {
      render(<WithCoverStory />)
      expect(screen.getByText('Collection Cover')).toBeTruthy()
      expect(screen.queryByRole('button', { name: 'Set as Collection Cover' })).toBeNull()
    })
  })
})
