import { expect } from 'chai'
import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { SubjectMock } from './SubjectMock'
import Meta, { Default } from './SubjectGroupModal.stories.jsx'

describe('Component > SubjectGroupModal', function () {
  const DefaultStory = composeStory(Default, Meta)

  describe('essential component parts', function () {
    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should have a close button', function () {
      const closeButton = screen.getByRole('button', { name: 'Close' })
      expect(closeButton).to.be.ok
    })

    it('should render the title', function () {
      const title = screen.getByText('Discuss this subject group')
      expect(title).to.be.ok
    })

    it('should generate links and images for all the mock subjects', function () {
      const s = SubjectMock.subject
      s.locations.forEach((location, i) => {
        const altText = screen.getByAltText(`Subject ${s.subjectIds[i]}`)
        expect(altText).to.be.ok

        const link = screen.getByRole('link', { name: `Subject ${s.subjectIds[i]}` })
        expect(link.getAttribute('href')).to.include(s.subjectIds[i])

        const img = screen.getByRole('img', { name: `Subject ${s.subjectIds[i]}` })
        expect(img.getAttribute('src')).to.equal(location.url)
      })
    })
  })
})
