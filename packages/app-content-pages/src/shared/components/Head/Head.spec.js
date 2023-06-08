import NextHead from 'next/head'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'

import Head from './Head'

describe('Component > Head', function () {
  before(function () {
    const stub = sinon.stub(NextHead, 'default').callsFake(({ children }) => <>{children}</>)
    render(<Head />)
  })

  it('should render the required tags', function () {
    screen.debug()
    expect(document.querySelector(`meta[property='og:url']`)).to.be.ok()
    expect(document.querySelector(`meta[property='og:title']`)).to.be.ok()
    expect(document.querySelector(`meta[property='og:description']`)).to.be.ok()
    expect(document.querySelector(`meta[name='twitter:site']`)).to.be.ok()
    expect(document.querySelector(`meta[name='twitter:card']`)).to.be.ok()
  })
})
