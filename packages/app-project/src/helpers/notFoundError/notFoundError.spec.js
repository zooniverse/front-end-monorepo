import notFoundError from './'

describe('Helpers > notFoundError', function () {
const ERROR = 'That page does not exist'

  describe('with an error message', function () {
    let notFound
    let props

    before(function () {
      const response = notFoundError(ERROR)
      props = response.props
      notFound = response.notFound
    })

    it('should set notFound', function () {
      expect(notFound).to.equal(true)
    })

    it('should set a title for the error page', function () {
      expect(props.title).to.equal(ERROR)
    })
  })

  describe('without an error message', function () {
    let notFound
    let props

    before(function () {
      const response = notFoundError()
      props = response.props
      notFound = response.notFound
    })

    it('should set notFound', function () {
      expect(notFound).to.equal(true)
    })

    it('should not set a title for the error page', function () {
      expect(props.title).toBeUndefined()
    })
  })
})
