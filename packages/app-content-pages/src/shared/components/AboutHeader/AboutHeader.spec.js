import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import Meta, { Default } from './AboutHeader.stories.js'

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

describe('Component > AboutHeader', function () {
  const DefaultStory = composeStory(Default, Meta)

  before(function () {
    render(
      <RouterMock>
        <DefaultStory />
      </RouterMock>
    )
  })

  it('should have the following links', function () {
    expect(document.querySelector('[href="/"]')).to.be.ok()
    expect(document.querySelector('[href="/publications"]')).to.be.ok()
    expect(document.querySelector('[href="/team"]')).to.be.ok()
    expect(document.querySelector('[href="/acknowledgements"]')).to.be.ok()
    expect(document.querySelector('[href="/resources"]')).to.be.ok()
    expect(document.querySelector('[href="/contact"]')).to.be.ok()
    expect(document.querySelector('[href="/faq"]')).to.be.ok()
    expect(document.querySelector('[href="/highlights"]')).to.be.ok()
    expect(document.querySelector('[href="/mobile-app"]')).to.be.ok()
    expect(document.querySelector('[href="/donate"]')).to.be.ok()
  })
})
