import { buildResponse, raiseError } from './index'

describe('Global Utility Functions', function () {
  describe('buildResponse', function () {
    const resourceType = 'projects'
    const resources = [{}]
    it('returns a basic resource mock', function () {
      const expectedReturnValue = {
        links: {},
        meta: {},
        [resourceType]: resources
      }
      expect(buildResponse('get', resourceType, resources)).to.eql(expectedReturnValue)
    })

    it('returns a resource with the new params for a mocked put response', function () {
      const params = { foo: 'bar' }
      const expectedReturnValue = {
        links: {},
        meta: {},
        [resourceType]: [params]
      }
      expect(buildResponse('put', resourceType, resources, null, params)).to.eql(expectedReturnValue)
    })

    it('returns a resource with the linked property if defined', function () {
      const linked = { foo: 'bar' }
      const expectedReturnValue = {
        links: {},
        meta: {},
        [resourceType]: resources
      }

      expectedReturnValue.linked = linked
      expect(buildResponse('get', resourceType, resources, linked)).to.eql(expectedReturnValue)
    })
  })

  describe('raiseError', function () {
    it('should return a rejected promise with the error message', function () {
      return raiseError('oops', 'error').catch((error) => {
        expect(error.message).to.equal('oops')
      })
    })

    it('should return an error of the Error class', function () {
      return raiseError('oops', 'error').catch((error) => {
        expect(error).to.be.an.instanceof(Error)
      })
    })

    it('should return an error of the TypeError class', function () {
      return raiseError('oops', 'typeError').catch((error) => {
        expect(error).to.be.an.instanceof(TypeError)
      })
    })
  })
})
