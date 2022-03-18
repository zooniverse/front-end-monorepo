import { expect } from 'chai'

import getCookie from './getCookie'

describe('Helper > getCookie', function () {
  after(function () {
    document.cookie = null
  })

  it('should return an empty string if there is not a next.js context', function () {
    const value = getCookie()
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if the response does not have a cookie', function () {
    const value = getCookie({ headers: { foo: 'bar' } })
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if a name parameter is not defined', function () {
    document.cookie = 'mode=light; path=/; max-age=31536000'
    const value = getCookie()
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if the cookie does not contain a value for the name parameter', function () {
    document.cookie = 'mode=light; path=/; max-age=31536000'
    const value = getCookie('foo')
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return the value for the specified name parameter', function () {
    document.cookie = 'mode=light; path=/; max-age=31536000'
    const value = getCookie('mode')
    expect(value).to.be.a('string')
    expect(value).to.have.equal('light')
  })
})
