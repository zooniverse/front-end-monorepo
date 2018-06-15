const { buildResponse } = require('./index')

describe('Global Helpers', function () {
  describe('buildResponse', function () {
    const resourceType = 'projects'
    const resources = [{}]
    it('returns a basic resource mock', function() {
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
      linked = { foo: 'bar' }
      expectedReturnValue = {
        links: {},
        meta: {},
        [resourceType]: resources
      }

      expectedReturnValue.linked = linked
      expect(buildResponse('get', resourceType, resources, linked)).to.eql(expectedReturnValue)
    })
  })
})