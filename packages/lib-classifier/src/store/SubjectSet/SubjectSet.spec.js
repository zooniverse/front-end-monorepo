import SubjectSet from './SubjectSet'

describe('Model > SubjectSet', function () {
  let model

  before(function () {
    model = SubjectSet.create({
      id: '1234',
      display_name: 'Hello there!',
      set_member_subjects_count: 19
    })
  })

  it('should exist', function () {
    expect(model).to.exist
    expect(model).to.be.an('object')
  })

  it('should have a display name', function () {
    expect(model.display_name).to.equal('Hello there!')
  })

  it('should have a subject count', function () {
    expect(model.set_member_subjects_count).to.equal(19)
  })

  describe('isIndexed', function () {
    let isIndexed

    describe('without metadata', function () {
      before(function () {
        const metadataModel = SubjectSet.create({
          id: '1234',
          display_name: 'Hello there!',
          set_member_subjects_count: 19
        })
        isIndexed = metadataModel.isIndexed
      })

      it('should be false', function () {
        expect(isIndexed).to.equal(false)
      })
    })

    describe('with metadata', function () {
      describe('but no indexed fields', function () {
        before(function () {
          const metadataModel = SubjectSet.create({
            id: '1234',
            display_name: 'Hello there!',
            metadata: {
              indexFields: ''
            },
            set_member_subjects_count: 19
          })
          isIndexed = metadataModel.isIndexed
        })

        it('should be false', function () {
          expect(isIndexed).to.equal(false)
        })
      })

      describe('and indexed fields', function () {
        before(function () {
          const metadataModel = SubjectSet.create({
            id: '1234',
            display_name: 'Hello there!',
            metadata: {
              indexFields: 'Date,Creator'
            },
            set_member_subjects_count: 19
          })
          isIndexed = metadataModel.isIndexed
        })

        it('should be true', function () {
          expect(isIndexed).to.equal(true)
        })
      })
    })
  })
})
