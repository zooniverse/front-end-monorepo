import searchParams from './searchParams'

describe('Components > Subject Picker > helpers > searchParams', function () {
  describe('with data', function () {
    it('should generate a filter_field query param', function () {
      const data = {
        creators: 'Smith',
        date: '',
        title: 'boston'
      }
      const query = searchParams(data)
      expect(query).to.equal('filter_field=@creators:Smith*@title:boston*')
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
