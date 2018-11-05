import sinon from 'sinon'
import hash from 'hash.js'
import sessionUtils from './session'

describe('Store utils > sessionUtils', function () {
  describe('fiveMinutesFromNow', function () {
    it('should return a Date object', function () {
      const time = sessionUtils.fiveMinutesFromNow()
      expect(time).to.be.an.instanceof(Date)
    })

    it('should call the Date object getMinutes method', function () {
      const getMinutesSpy = sinon.spy(Date.prototype, 'getMinutes')
      sessionUtils.fiveMinutesFromNow()
      expect(getMinutesSpy.called).to.be.true
      getMinutesSpy.restore()
    })

    it('should call the Date object setMinutes method', function () {
      const setMinutesSpy = sinon.spy(Date.prototype, 'setMinutes')
      sessionUtils.fiveMinutesFromNow()
      expect(setMinutesSpy.called).to.be.true
      setMinutesSpy.restore()
    })
  })

  describe('getSessionID', function () {
    let generateSessionIDSpy
    let fiveMinutesFromNowSpy
    beforeEach(function () {
      generateSessionIDSpy = sinon.spy(sessionUtils, 'generateSessionID')
      fiveMinutesFromNowSpy = sinon.spy(sessionUtils, 'fiveMinutesFromNow')
    })

    afterEach(function () {
      generateSessionIDSpy.restore()
      fiveMinutesFromNowSpy.restore()
      sessionStorage.removeItem('session_id')
    })

    it('should return the generated id', function () {
      const id = sessionUtils.getSessionID()
      expect(id).to.a('string')
    })

    it('it should call generateSessionID if there is not a stored id in session or local storage', function () {
      sessionUtils.getSessionID()
      expect(generateSessionIDSpy.called).to.be.true
    })

    it('it should retrieve id from session or local storage if it exists', function () {
      sessionUtils.generateSessionID() // just setting up for test
      generateSessionIDSpy.resetHistory()
      sessionUtils.getSessionID()
      expect(generateSessionIDSpy.notCalled).to.be.true
    })

    it('should call fiveMinutesFromNow if the ttl property is greater than Date.now()', function () {
      sessionUtils.getSessionID()
      expect(fiveMinutesFromNowSpy.called).to.be.true
    })

    it('should update sessionStorage', function () {
      sessionUtils.getSessionID()
      const stored = JSON.parse(sessionStorage.getItem('session_id'))

      // Dates are a second off from each other in ISO format,
      // but equal when starting as Date objects and converted to Date strings
      // Unsure of the minor discrepency
      expect(new Date(stored.ttl).toString()).to.equal(fiveMinutesFromNowSpy.returnValues[0].toString())
    })
  })

  describe('getSessionID > when the ttl property is less than Date.now()', function () {
    // Can't wrap the same method in a spy and a stub in the same describe block
    // So this test is isolated here.
    let generateSessionIDStub
    before(function () {
      generateSessionIDStub = sinon.stub(sessionUtils, 'generateSessionID')
        .callsFake(() => { return { id: 'foobar', ttl: (Date.now() - 1) } })
    })

    after(function () {
      generateSessionIDStub.restore()
      sessionStorage.removeItem('session_id')
    })

    it('should call generateSessionID', function () {
      sessionUtils.getSessionID()
      expect(generateSessionIDStub.calledTwice).to.be.true
    })
  })

  describe('generateSessionID', function () {
    after(function () {
      sessionStorage.removeItem('session_id')
    })

    it('should use the hash.js module\'s sha256 utility for id generation', function () {
      const hashSpy = sinon.spy(hash, 'sha256')
      sessionUtils.generateSessionID()
      expect(hashSpy.called).to.be.true
      hashSpy.restore()
    })

    it('should call Math.random() when generating the id', function () {
      const mathSpy = sinon.spy(Math, 'random')
      sessionUtils.generateSessionID()
      expect(mathSpy.called).to.be.true
      mathSpy.restore()
    })

    it('should call Date.now() when generating the id', function () {
      const dateSpy = sinon.spy(Date, 'now')
      sessionUtils.generateSessionID()
      expect(dateSpy.called).to.be.true
      dateSpy.restore()
    })

    it('should call fiveMinutesFromNow', function () {
      const fiveMinutesFromNowSpy = sinon.spy(sessionUtils, 'fiveMinutesFromNow')
      sessionUtils.generateSessionID()
      expect(fiveMinutesFromNowSpy.called).to.be.true
      fiveMinutesFromNowSpy.restore()
    })

    it('should return an object with the generated id and the result of calling fiveMinutesFromNow', function () {
      const result = sessionUtils.generateSessionID()
      expect(result).to.be.an('object')
      expect(result).to.have.property('id')
      expect(result.id).to.be.a('string')
      expect(result).to.have.property('ttl')
      expect(result.ttl).to.be.an.instanceof(Date)
    })

    it('should store the stringified generated id and Date object in session storage', function () {
      const result = JSON.stringify(sessionUtils.generateSessionID())
      const stored = sessionStorage.getItem('session_id')
      expect(result).to.equal(stored)
    })
  })
})
