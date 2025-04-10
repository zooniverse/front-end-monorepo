import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Publications.stories.js'

function RouterMock({ children }) {
  const mockRouter = {
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

describe('Component > Publications Page', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(
      <RouterMock>
        <DefaultStory />
      </RouterMock>
    )
  })

  it('should have sidebar nav label', function () {
    const sideBar = screen.getByText('Discipline')  // This is the DropdownNav in jsdom
    expect(sideBar).to.be.ok()
  })

  it('should render all publications in data', function () {
    const publications = screen.getAllByTestId('publication-test-element')
    expect(publications.length).to.equal(20) // number of publications in mock.json
  })
})
