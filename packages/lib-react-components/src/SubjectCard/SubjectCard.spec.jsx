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

import CollectionMeta, {
  LandscapeWithCover as CollectionLandscapeWithCover,
  SelectMode as CollectionSelectMode,
} from './stories/interactive/collection/SubjectCard.collection.stories'
import InteractiveMeta, { Landscape as InteractiveLandscape } from './stories/interactive/singleMedia/SubjectCard.image.stories'
import InteractiveMultiMediaMeta, { MultiImage as InteractiveMultiImage } from './stories/interactive/multiMedia/SubjectCard.multiMedia.stories'
import SimpleMeta, { Landscape as SimpleLandscape } from './stories/simple/SubjectCard.image.stories'

import { RADIO_METEOR_ZOO_SUBJECT } from './stories/SubjectCardStoryData'

describe('SubjectCard', function() {
  const DefaultStory = composeStory(SimpleLandscape, SimpleMeta)
  const InteractiveStory = composeStory(InteractiveLandscape, InteractiveMeta)
  const InteractiveMultiImageStory = composeStory(InteractiveMultiImage, InteractiveMultiMediaMeta)
  const CollectionWithCoverStory = composeStory(CollectionLandscapeWithCover, CollectionMeta)
  const CollectionSelectModeStory = composeStory(CollectionSelectMode, CollectionMeta)
  
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

  describe('with interactive, single media', function () {
    it('should link the image preview', function () {
      render(<InteractiveStory />)
      expect(screen.getByRole('link', { href: '/projects/team/example-project/talk/subjects/75219502' })).toBeTruthy()
    })
  })

  describe('with interactive, multi media', function () {
    it('should render the flipbook controls', function () {
      render(<InteractiveMultiImageStory />)
      expect(screen.getByTestId('flipbook-controls')).toBeTruthy()
    })
  })

  describe('with collection, landscape with cover', function () {
    it('should show the collection cover banner', function () {
      render(<CollectionWithCoverStory />)
      expect(screen.getByText('Collection Cover')).toBeTruthy()
    })
  })
  
  describe('with collection, select mode', function () {
    it('should show the subject checkbox', function () {
      render(<CollectionSelectModeStory />)
      expect(screen.getByRole('checkbox', { name: `Select Subject ${RADIO_METEOR_ZOO_SUBJECT.id}` })).toBeTruthy()
    })
  })
})
