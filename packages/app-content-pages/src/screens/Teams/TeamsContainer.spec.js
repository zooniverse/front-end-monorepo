import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import { composeStory } from '@storybook/react'
import { within } from '@testing-library/dom'

import projectAnnotations from '../../../.storybook/preview.js'
import mockData from './TeamsContainer.mock.json'
import Meta, { Default } from './Teams.stories.js'

function RouterMock({ children }) {
  const mockRouter = {
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {}
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

describe('Component > TeamsContainer', function () {
  const DefaultStory = composeStory(Default, Meta, projectAnnotations)

  beforeEach(function () {
    render(
      <RouterMock>
        <DefaultStory />
      </RouterMock>
    )
  })

  it('should have a sidebar with available filters', function () {
    const teamFilters = Default.args.teamData.map(team => team.name)
    const sideBar = document.querySelector('aside')
    const listedFilters = within(sideBar).getAllByRole('link')
    expect(listedFilters.length).to.equal(teamFilters.length + 1) // +1 to account for Show All
    expect(listedFilters[1].textContent).to.equal(teamFilters[0])
  })

  it('should have a sidebar nav with accessible label', function () {
    const sideBar = screen.getByLabelText('Filter by team location')
    expect(sideBar).to.be.ok()
  })

  it('should render all people in data', function () {
    const people = screen.getAllByTestId('person-test-element')
    const numMockPeople = mockData.reduce((count, team) => {
      return count + ((team.name !== 'Alumni') ? team.people.length : 0) // non-alumni in mock.json
    }, 0)
    expect(people.length).to.equal(numMockPeople)
  })
})
