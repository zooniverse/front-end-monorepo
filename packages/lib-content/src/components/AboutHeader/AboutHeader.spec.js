import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import Meta, { Default } from './AboutHeader.stories.js'

describe('Component > AboutHeader', function () {
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

  const DefaultStory = composeStory(Default, Meta)

  before(function () {
    render(
      <RouterMock>
        <DefaultStory />
      </RouterMock>
    )
  })

  it('should have the following links', function () {
    expect(document.querySelector('[href="/about"]')).to.be.ok()
    expect(document.querySelector('[href="/about/publications"]')).to.be.ok()
    expect(document.querySelector('[href="/about/team"]')).to.be.ok()
    expect(document.querySelector('[href="/about/resources"]')).to.be.ok()
    expect(document.querySelector('[href="/about/faq"]')).to.be.ok()
  })
})
