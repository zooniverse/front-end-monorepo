import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as Stories from './SubjectPreview.stories'

describe('Component > SubjectPreview', function () {
  const { Audio, Plain, Text, Video } = composeStories(Stories)

  describe('Logged in default preview behavior', function () {
    beforeEach(function () {
      render(<Plain />)
    })

    it('should link to the subject Talk page from the preview media', function () {
      expect(screen.getByTestId(`subject-preview-link-${Plain.args.subjectId}`))
        .to.have.property('href')
        .to.equal(
          `https://localhost/projects/${Plain.args.slug}/talk/subjects/${Plain.args.subjectId}`
        )
    })

    it('should have a talk link', function () {
      expect(screen.getByText('SubjectPreview.TalkLink.label')).toBeDefined()
    })

    it('should have a favorites button', function () {
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })

    it('should be able to add to favorites', function () {
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
    })

    it('should not have favorites disabled', function () {
      expect(screen.getByRole('checkbox', { checked: false }))
        .to.have.property('disabled')
        .to.equal(false)
    })

    it('should have a collections button', function () {
      expect(
        screen.getByText('SubjectPreview.CollectionsButton.add')
      ).toBeDefined()
    })

    it('should have collections enabled', function () {
      expect(screen.getByTestId('subject-collections-button'))
        .to.have.property('disabled')
        .to.equal(false)
    })
  })

  describe('logged out default preview behavior', function () {
    beforeEach(function () {
      render(<Plain isLoggedIn={false} />)
    })
    it('should link to the subject Talk page from the preview media', function () {
      expect(screen.getByTestId(`subject-preview-link-${Plain.args.subjectId}`))
        .to.have.property('href')
        .to.equal(
          `https://localhost/projects/${Plain.args.slug}/talk/subjects/${Plain.args.subjectId}`
        )
    })

    it('should have a talk link', function () {
      expect(screen.getByText('SubjectPreview.TalkLink.label')).toBeDefined()
    })

    it('should have a favorites button', function () {
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })

    it('should be able to add to favorites', function () {
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
    })

    it('should have favorites disabled', function () {
      expect(screen.getByRole('checkbox', { checked: false }))
        .to.have.property('disabled')
        .to.equal(true)
    })

    it('should have a collections button', function () {
      expect(
        screen.getByText('SubjectPreview.CollectionsButton.add')
      ).toBeDefined()
    })

    it('should have collections disabled', function () {
      expect(screen.getByTestId('subject-collections-button'))
        .to.have.property('disabled')
        .to.equal(true)
    })
  })

  describe('other subject types', function () {
    it('should render an audio element for an audio subject', function () {
      render(<Audio />)
      expect(document.querySelector('audio')).toBeDefined()
    })

    it('should render an video element for a video subject', function () {
      render(<Video  />)
      expect(document.querySelector('video')).toBeDefined()
    })

    it('should render a text element for a text subject', function () {
      render(<Text />)
      expect(document.querySelector('pre')).toBeDefined()
    })
  })
})
