import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import { composeStory } from '@storybook/react'

import mockData from './teamData.mock.json'
import Meta, { Default } from './OurTeam.stories'

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

describe('Component > Our Team', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(
      <RouterMock>
        <DefaultStory />
      </RouterMock>
    )
  })

  it('should have a nav with label', function () {
    const sideBar = screen.getByText('Institution') // This is the DropdownNav in jsdom
    expect(sideBar).toBeTruthy()
  })

  it('should render all people in data', function () {
    const people = screen.getAllByTestId('person-test-element')
    const numMockPeople = mockData.reduce((count, team) => {
      return count + team.people.length
    }, 0)
    expect(people.length).to.equal(numMockPeople)
  })
})
