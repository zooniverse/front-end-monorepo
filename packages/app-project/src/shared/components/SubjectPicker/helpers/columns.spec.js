import columns from './columns'

describe('Components > Subject Picker > helpers > columns', function () {
  const customHeadings = ['date', 'creator', 'title']
  const baseUrl = '/projects/owner/project/classify/workflow/123/subject-set/456'

  function testColumn(column) {
    const searchable = customHeadings.includes(column.header)
    const primary = column.header === 'subject_id'
    describe(column.header, function () {
      it(`should ${primary ? '' : 'not '}be the primary key`, function () {
        expect(column.primary).to.equal(primary)
      })

      if (primary) {
        it('should render a link to the subject', function () {
          const linkComponent = column.render({ subject_id: '123' }, baseUrl)
          const { link } = linkComponent.props
          expect(link.text).to.equal('123')
          expect(link.href).to.equal(`${baseUrl}/subject/123`)
        })
      }

      it(`should ${searchable ? '' : 'not '}be searchable`, function () {
        expect(column.search).to.equal(searchable)
      })

      it('should be sortable', function () {
        expect(column.sortable).to.be.true()
      })
    })
  }
  columns(customHeadings, baseUrl).forEach(testColumn)
})