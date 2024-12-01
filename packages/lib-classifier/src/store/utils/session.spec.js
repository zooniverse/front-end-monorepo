import sinon from 'sinon'
import hash from 'hash.js'
import * as sessionUtils from './session'

describe('Store utils > sessionUtils', function () {
  describe('fiveMinutesFromNow', function () {
    it('should return a Date object', function () {
      const time = sessionUtils.fiveMinutesFromNow()
      expect(time).to.be.an.instanceof(Date)
    })

    it('should call the Date object getMinutes method', function () {
      const getMinutesSpy = sinon.spy(Date.prototype, 'getMinutes')
      sessionUtils.fiveMinutesFromNow()
      expect(getMinutesSpy).to.have.been.called()
      getMinutesSpy.restore()
    })

    it('should call the Date object setMinutes method', function () {
      const setMinutesSpy = sinon.spy(Date.prototype, 'setMinutes')
      sessionUtils.fiveMinutesFromNow()
      expect(setMinutesSpy).to.have.been.called()
      setMinutesSpy.restore()
    })
  })

  describe('getSessionID', function () {
    afterEach(function () {
      sessionStorage.removeItem('session_id')
    })

    it('should return the generated id', function () {
      const id = sessionUtils.getSessionID()
      expect(id).to.a('string')
      expect(id).to.have.lengthOf(64)
    })

    it('it should retrieve id from session or local storage if it exists', function () {
      const ttl = new Date()
      ttl.setMinutes(ttl.getMinutes() + 5)
      const stored = { id: 'foobar', ttl }
      sessionStorage.setItem('session_id', JSON.stringify(stored))
      const id = sessionUtils.getSessionID()
      expect(id).to.equal('foobar')
    })

    it('should update sessionStorage', function () {
      const fiveMinutesFromNow = new Date()
      sessionUtils.getSessionID()
      const stored = JSON.parse(sessionStorage.getItem('session_id'))

      // Dates are a second off from each other in ISO format,
      // but equal when starting as Date objects and converted to Date strings
      // Unsure of the minor discrepency
      fiveMinutesFromNow.setMinutes(fiveMinutesFromNow.getMinutes() + 5)
      expect(new Date(stored.ttl).toString()).to.equal(fiveMinutesFromNow.toString())
    })

    describe('when the stored token has expired', function () {
      before(function () {
        const ttl = new Date()
        ttl.setMinutes(ttl.getMinutes() - 10)
        const stored = { id: 'foobar', ttl }
        sessionStorage.setItem('session_id', JSON.stringify(stored))
      })

      after(function () {
        sessionStorage.removeItem('session_id')
      })

      it('should generate a new session ID', function () {
        const id = sessionUtils.getSessionID()
        expect(id).to.not.equal('foobar')
        expect(id).to.have.lengthOf(64)
      })
    })
  })

  describe('generateSessionID', function () {
    after(function () {
      sessionStorage.removeItem('session_id')
    })

    it('should use the hash.js module\'s sha256 utility for id generation', function () {
      const hashSpy = sinon.spy(hash, 'sha256')
      sessionUtils.generateSessionID()
      expect(hashSpy).to.have.been.called()
      hashSpy.restore()
    })

    it('should call Math.random() when generating the id', function () {
      const mathSpy = sinon.spy(Math, 'random')
      sessionUtils.generateSessionID()
      expect(mathSpy).to.have.been.called()
      mathSpy.restore()
    })

    it('should call Date.now() when generating the id', function () {
      const dateSpy = sinon.spy(Date, 'now')
      sessionUtils.generateSessionID()
      expect(dateSpy).to.have.been.called()
      dateSpy.restore()
    })

    it('should return the generated id', function () {
      const result = sessionUtils.generateSessionID()
      expect(result).to.be.a('string')
      expect(result).to.have.lengthOf(64)
    })
  })
})
