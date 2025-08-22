import { render, screen, within } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { ConnectWithProject, ConnectWithProjectEmpty } from './ConnectWithProject.stories'
import { ConnectWithProjectMock } from './ConnectWithProject.mock.js'

describe('Component > ConnectWithProject', function () {
  describe('when the project has links', function() {
    beforeEach(function () {
      const ConnectWithProjectStory = composeStory(ConnectWithProject, Meta)
      render(<ConnectWithProjectStory />)
    })

    ConnectWithProjectMock.project.urls.forEach(function (urlObject) {
      it(`should render the ${urlObject.name} icon`, async function () {
        await expect(screen.getByLabelText(urlObject.name)).to.be.ok()
      })

      it(`should render the ${urlObject.name} link`, function () {
        const el = document.getElementsByClassName(`connect-with-project-${urlObject.site}`)[0]
        expect(within(el).getByRole('link')).to.have.property('href')
      })

      it(`should render the ${urlObject.name} label`, function () {
        const el = document.getElementsByClassName(`connect-with-project-${urlObject.site}`)[0]
        expect(within(el).getByText(`ConnectWithProject.ProjectLink.types.${urlObject.name.toLowerCase()}`)).to.exist()
      })
    })
  })

  describe('when the project has no links', function() {
    it('should render as nothing', function () {
      const ConnectWithProjectStory = composeStory(ConnectWithProjectEmpty, Meta)
      render(<ConnectWithProjectStory />)
      expect(screen.queryAllByRole('link').length).to.equal(0)
    })
  })
})
