import { expect } from 'chai'
import { getCookie } from './cookie'

describe('Helper > getCookie', function () {
  it('should return an empty string if the name matches', function () {
    const value = getCookie('mode')
    expect(value).to.be.a('string')
    expect(value).to.have.lengthOf(0)
  })

  it('should return the value if the name matches', function () {
    const mode = 'light'
    document.cookie = `mode=${mode}; another=pair; path=/; max-age=31536000`
    const value = getCookie('mode')
    expect(value).to.equal(mode)
    document.cookie = 'mode=; max-age=-99999999;'
  })
})