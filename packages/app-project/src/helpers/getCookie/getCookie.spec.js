import { expect } from 'chai'

import getCookie from './getCookie'

describe('Helper > getCookie', function () {
  it('should return an empty string if there is not a next.js context', function () {
    const value = getCookie()
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if the response does not have a cookie', function () {
    const value = getCookie({ req: { headers: { foo: 'bar' } } })
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if a name parameter is not defined', function () {
    const cookie = 'mode=light; path=/; max-age=31536000'
    const context = {
      req: { headers: { cookie } }
    }
    const value = getCookie(context)
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return an empty string if the cookie does not contain a value for the name parameter', function () {
    const cookie = 'mode=light; path=/; max-age=31536000'
    const context = {
      req: { headers: { cookie } }
    }
    const value = getCookie(context, 'foo')
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return the value for the specified name parameter', function () {
    const cookie = 'mode=light; path=/; max-age=31536000'
    const context = {
      req: { headers: { cookie } }
    }
    const value = getCookie(context, 'mode')
    expect(value).to.be.a('string')
    expect(value).to.have.equal('light')
  })
})
