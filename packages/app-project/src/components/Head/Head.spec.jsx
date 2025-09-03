import NextHead from 'next/head'
import sinon from 'sinon'
import { render } from '@testing-library/react'

import Head from './Head'

describe('Component > Head', function () {
  const stub = sinon.stub(NextHead, 'default').callsFake(({ children }) => <>{children}</>)

  it('should render the required tags', function () {
    render(<Head />)
    expect(document.querySelector(`meta[property='og:url']`)).toBeDefined()
    expect(document.querySelector(`meta[property='og:title']`)).toBeDefined()
    expect(document.querySelector(`meta[property='og:description']`)).toBeDefined()
    expect(document.querySelector(`meta[name='twitter:site']`)).toBeDefined()
    expect(document.querySelector(`meta[name='twitter:card']`)).toBeDefined()
    expect(document.querySelector(`meta[name='twitter:image']`)).toBeDefined()
    expect(document.querySelector(`meta[name='twitter:creator']`)).to.equal(null)
  })

  it('should render a meta `twitter:creator` tag if available', function () {
    render(<Head projectTwitterUsername={'foobar'} />)
    expect(document.querySelector(`meta[name='twitter:creator']`)).toBeDefined()
  })
})
