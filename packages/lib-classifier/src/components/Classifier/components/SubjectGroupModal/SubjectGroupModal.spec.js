import { expect } from 'chai'
import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { SubjectMock } from './SubjectMock'
import Meta, { Default } from './SubjectGroupModal.stories.js'

describe('Component > SubjectGroupModal', function () {
  const DefaultStory = composeStory(Default, Meta)

  describe('essential component parts', function () {
    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should have a close button', function () {
      expect(screen.getByRole('button', { name: 'Close' })).to.exist()
    })

    it('should render the title', function () {
      expect(screen.getByText('Discuss this subject group')).to.exist()
    })

    it('should generate links and images for all the mock subjects', function () {
      const s = SubjectMock.workflowConfiguration.lastSubject
      s.locations.forEach((location, i) => {
        expect(screen.getByAltText(`Subject ${s.subjectIds[i]}`)).to.exist()

        expect(screen.getByRole('link', { name: `Subject ${s.subjectIds[i]}` }))
          .to.have.attribute('href')
          .that.includes(s.subjectIds[i])

        expect(screen.getByRole('img', { name: `Subject ${s.subjectIds[i]}` }))
          .to.have.attribute('src', location.url)
      })
    })
  })
})
