import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Audio, Plain, Transcription, Video, Text } from './SubjectPreview.stories'
import { SubjectPreviewState } from './SubjectPreview.mock.js'

describe('Component > SubjectPreview', function () {
  [Audio, Plain, Transcription, Text, Video].forEach(Component => {
    describe(`${Component.name} logged in story`, function () {
      beforeEach(function () {
        const Story = composeStory(Component, Meta)
        render(<Story />)
      })

      it('should link to the subject Talk page from the preview media', function () {
        expect(screen.getByTestId(`subject-preview-link-${SubjectPreviewState.subjectId}`)).to.have.property('href')
          .to.equal(`https://localhost/projects/${SubjectPreviewState.slug}/talk/subjects/${SubjectPreviewState.subjectId}`)
      })

      it('should have a talk link', function () {
        expect(screen.getByText('SubjectPreview.TalkLink.label')).to.exist()
      })

      it('should have a favorites button', function () {
        expect(screen.getByText('Add to favorites')).to.exist()
      })

      it('should be able to add to favorites', function () {
        expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      })

      it('should not have favorites disabled', function () {
        expect(screen.getByRole('checkbox', { checked: false })).to.have.property('disabled').to.equal(false)
      })

      it('should have a collections button', function () {
        expect(screen.getByText('SubjectPreview.CollectionsButton.add')).to.exist()
      })

      it('should have collections enabled', function () {
        expect(screen.getByTestId('subject-collections-button')).to.have.property('disabled').to.equal(false)
      })
    })

    describe(`${Component.name} logged out story`, function () {
      beforeEach(function () {
        const Story = composeStory(Component, Meta)
        render(<Story isLoggedIn={false} />)
      })

      it('should link to the subject Talk page from the preview media', function () {
        expect(screen.getByTestId(`subject-preview-link-${SubjectPreviewState.subjectId}`)).to.have.property('href')
          .to.equal(`https://localhost/projects/${SubjectPreviewState.slug}/talk/subjects/${SubjectPreviewState.subjectId}`)
      })

      it('should have a talk link', function () {
        expect(screen.getByText('SubjectPreview.TalkLink.label')).to.exist()
      })

      it('should have a favorites button', function () {
        expect(screen.getByText('Add to favorites')).to.exist()
      })

      it('should be able to add to favorites', function () {
        expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      })

      it('should have favorites disabled', function () {
        expect(screen.getByRole('checkbox', { checked: false })).to.have.property('disabled').to.equal(true)
      })

      it('should have a collections button', function () {
        expect(screen.getByText('SubjectPreview.CollectionsButton.add')).to.exist()
      })

      it('should have collections disabled', function () {
        expect(screen.getByTestId('subject-collections-button')).to.have.property('disabled').to.equal(true)
      })
    })
  })
})
