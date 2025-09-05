import sinon from 'sinon'
import hash from 'hash.js'
import sessionUtils from './session'

describe('Store utils > sessionUtils', function () {
  describe('getSessionID', function () {
    let generateSessionIDSpy

    beforeEach(function () {
      generateSessionIDSpy = sinon.spy(sessionUtils, 'generateSessionID')
    })

    afterEach(function () {
      generateSessionIDSpy.restore()
      window.sessionStorage.removeItem('session_id')
    })

    it('should return the generated id', function () {
      const id = sessionUtils.getSessionID()
      expect(id).to.be.a('string')
    })

    it('it should call generateSessionID if there is not a stored id in session or local storage', function () {
      sessionUtils.getSessionID()
      expect(generateSessionIDSpy).to.have.been.called
    })

    it('it should retrieve id from session if it exists', function () {
      const stored = { id: 'foobar', ttl: (Date.now() + 50000) }
      window.sessionStorage.setItem('session_id', JSON.stringify(stored))
      sessionUtils.getSessionID()
      expect(generateSessionIDSpy).to.have.not.been.called
    })
  })

  describe('generateSessionID', function () {
    after(function () {
      window.sessionStorage.removeItem('session_id')
    })

    it('should use the hash.js module\'s sha256 utility for id generation', function () {
      const hashSpy = sinon.spy(hash, 'sha256')
      sessionUtils.generateSessionID()
      expect(hashSpy).to.have.been.called
      hashSpy.restore()
    })

    it('should call Math.random() when generating the id', function () {
      const mathSpy = sinon.spy(Math, 'random')
      sessionUtils.generateSessionID()
      expect(mathSpy).to.have.been.called
      mathSpy.restore()
    })

    it('should call Date.now() when generating the id', function () {
      const dateSpy = sinon.spy(Date, 'now')
      sessionUtils.generateSessionID()
      expect(dateSpy).to.have.been.called
      dateSpy.restore()
    })

    it('should return an object with the generated id', function () {
      const result = sessionUtils.generateSessionID()
      expect(result).to.be.an('object')
      expect(result).to.have.property('id')
      expect(result.id).to.be.a('string')
    })

    it('should store the stringified generated id and Date object in session storage', function () {
      const result = JSON.stringify(sessionUtils.generateSessionID())
      const stored = window.sessionStorage.getItem('session_id')
      expect(result).to.equal(stored)
    })
  })
})
