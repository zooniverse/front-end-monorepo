import { Grommet } from 'grommet'
import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { MessageFromResearcher, NoMessageFromResearcher, NoResearcher } from './MessageFromResearcher.stories'
import {
  MessageFromResearcherProjectNamedMock,
  MessageFromResearcherProjectNoResearcherMock
} from './MessageFromResearcher.mock.js'

describe('Component > MessageFromResearcher', function () {
  describe('Researcher and Message', function () {
    beforeEach(function () {
      const MessageFromResearcherStory = composeStory(MessageFromResearcher, Meta)
      render(<Grommet><MessageFromResearcherStory /></Grommet>)
    })

    it('should render the researcher name', function () {
      expect(screen.getByText(MessageFromResearcherProjectNamedMock.project.owners[0].display_name)).to.exist()
    })

    it('should render the researcher avatar', function () {
      expect(screen.getByAltText(`${MessageFromResearcherProjectNamedMock.project.owners[0].display_name} avatar`)).to.exist()
      expect(screen.getByAltText(`${MessageFromResearcherProjectNamedMock.project.owners[0].display_name} avatar`))
        .to.have.property('src').to.equal(MessageFromResearcherProjectNamedMock.project.owners[0].avatar_src)
    })

    it('should render the researcher message', function () {
      expect(screen.getByText(MessageFromResearcherProjectNamedMock.project.researcher_quote)).to.exist()
    })
  })

  describe('No Researcher and Message', function () {
    beforeEach(function () {
      const NoResearcherStory = composeStory(NoResearcher, Meta)
      render(<Grommet><NoResearcherStory /></Grommet>)
    })

    it('should render the project slug', function () {
      expect(screen.getByText(MessageFromResearcherProjectNoResearcherMock.project.display_name)).to.exist()
    })

    it('should render the project avatar', function () {
      expect(screen.getByAltText(`${MessageFromResearcherProjectNamedMock.project.display_name} avatar`)).to.exist()
      expect(screen.getByAltText(`${MessageFromResearcherProjectNamedMock.project.display_name} avatar`))
        .to.have.property('src').to.equal(MessageFromResearcherProjectNamedMock.project.avatar.src)
    })

    it('should render the researcher message', function () {
      expect(screen.getByText(MessageFromResearcherProjectNamedMock.project.researcher_quote)).to.exist()
    })
  })

  describe('No Message', function () {
    beforeEach(function () {
      const NoMessageFromResearcherStory = composeStory(NoMessageFromResearcher, Meta)
      render(<Grommet><NoMessageFromResearcherStory /></Grommet>)
    })

    it('should render the default no-message text', function () {
      expect(screen.getByText('Home.MessageFromResearcher.noMessage')).to.exist()
    })

    it('should render the talk link', function () {
      expect(screen.getByText('Home.MessageFromResearcher.noMessageButton')).to.exist()
      expect(screen.getByRole('link')).to.have.property('href')
        .to.equal(`https://localhost/projects/${MessageFromResearcherProjectNamedMock.project.slug}/talk`)
    })
  })
})
