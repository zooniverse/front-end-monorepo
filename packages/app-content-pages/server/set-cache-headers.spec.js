import setCacheHeaders from './set-cache-headers'

const assert = require('assert')
const sinon = require('sinon')
let sandbox = sinon.createSandbox()

const mockRes = {
  setHeader: Function.prototype
}
const mockSetHeader = sinon.spy(mockRes, 'setHeader')

describe.only('setCacheHeaders', function () {
  describe('default behaviour', function () {
    it('should set the max-age to 1 minute by default', function () {
      setCacheHeaders({ path: '/foo.html' }, mockRes)
      expect(mockSetHeader.calledWith('Cache-Control', `max-age=60`)).to.be.true()
    })

    it('should set the max-age to 1 year for `.js` files', function () {
      setCacheHeaders({ path: '/foo.js' }, mockRes)
      expect(mockSetHeader.calledWith('Cache-Control', `max-age=31536000`)).to.be.true()
    })
  })

  describe('configured behaviour', function () {

  })
})
