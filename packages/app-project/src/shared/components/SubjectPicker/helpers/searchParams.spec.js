import searchParams from './searchParams'

describe('Components > Subject Picker > helpers > searchParams', function () {
  describe('with data', function () {
    it('should generate Datasette query params', function () {
      const data = {
        creators: 'Smith & Jones',
        date: '',
        title: 'boston'
      }
      const query = searchParams(data)
      expect(query).to.equal('creators__contains=Smith%20%26%20Jones&title__contains=boston')
    })
  })

  describe('without data', function () {
    it('should return an empty string', function () {
      const data = {
        creators: '',
        date: '',
        title: ''
      }
      const query = searchParams(data)
      expect(query).to.equal('')
    })
  })
})
