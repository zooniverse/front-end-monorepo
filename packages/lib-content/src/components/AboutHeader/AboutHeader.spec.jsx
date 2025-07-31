import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import Meta, { Default } from './AboutHeader.stories'

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
    expect(document.querySelector('[href="/about"]').href).to.equal('https://localhost/about')
    expect(document.querySelector('[href="/about/publications"]').href).to.equal('https://localhost/about/publications')
    expect(document.querySelector('[href="/about/team"]').href).to.equal('https://localhost/about/team')
    expect(document.querySelector('[href="/about/resources"]').href).to.equal('https://localhost/about/resources')
    expect(document.querySelector('[href="/about/faq"]').href).to.equal('https://localhost/about/faq')
  })
})
