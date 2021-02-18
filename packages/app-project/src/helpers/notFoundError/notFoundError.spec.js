import notFoundError from './'

describe('Helpers > notFoundError', function () {
const ERROR = 'That page does not exist'

  describe('with an error message', function () {
    let props

    before(function () {
      const response = notFoundError(ERROR)
      props = response.props
    })

    it('should set a 404 status code', function () {
      expect(props.statusCode).to.equal(404)
    })

    it('should set a title for the error page', function () {
      expect(props.title).to.equal(ERROR)
    })
  })

  describe('without an error message', function () {
    let props

    before(function () {
      const response = notFoundError()
      props = response.props
    })

    it('should set a 404 status code', function () {
      expect(props.statusCode).to.equal(404)
    })

    it('should not set a title for the error page', function () {
      expect(props.title).to.be.undefined()
    })
  })
})