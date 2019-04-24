import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import CollectionsModalContainer from './CollectionsModalContainer'
import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

let wrapper
let componentWrapper

describe('Component > CollectionsModalContainer', function () {
  let addSubjects = sinon.stub()
  let createCollection = sinon.stub()
  let searchCollections = sinon.stub()
  const subjectId = '123'

  before(function () {
    wrapper = shallow(
      <CollectionsModalContainer.wrappedComponent
        addSubjects={addSubjects}
        createCollection={createCollection}
        searchCollections={searchCollections}
      />
    )
    componentWrapper = wrapper.find(CollectionsModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `CollectionsModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('select a collection form', function () {
    let select

    before(function () {
      wrapper.instance().open(subjectId)
      select = wrapper.find(SelectCollection)
    })

    after(function () {
      wrapper.instance().close()
    })

    it('should exist', function () {
      expect(select).to.have.lengthOf(1)
    })

    it('should be disabled by default', function () {
      expect(select.prop('disabled')).to.be.true()
    })

    describe('with a partial collection name', function () {
      const query = { favorite: false, search: 'Hello' }

      before(function () {
        select.simulate('search', query)
      })

      it('should fetch a list of collections filtered by name', function () {
        expect(searchCollections).to.have.been.calledOnceWith(query)
      })
    })

    describe('with a selected collection', function () {
      let collection = { id: '1', display_name: 'Test One' }

      before(function () {
        const fakeEvent = {
          value: collection
        }
        select.simulate('select', fakeEvent)
        select = wrapper.find(SelectCollection)
      })

      it('should not be disabled', function () {
        expect(select.prop('disabled')).to.be.false()
      })

      describe('on submit', function () {
        before(function () {
          const fakeEvent = {
            preventDefault: sinon.stub()
          }
          select.simulate('submit', fakeEvent)
        })

        it('should add subjects to the selected collection', function () {
          expect(addSubjects).to.have.been.calledOnceWith('1', [subjectId])
        })

        it('should close the modal', function () {
          expect(wrapper.state().active).to.be.false()
        })
      })
    })
  })

  describe('create a collection form', function () {
    let create

    before(function () {
      wrapper.instance().open(subjectId)
      create = wrapper.find(CreateCollection)
    })

    after(function () {
      wrapper.instance().close()
    })

    it('should exist', function () {
      expect(create).to.have.lengthOf(1)
    })

    it('should be disabled by default', function () {
      expect(create.prop('disabled')).to.be.true()
    })

    describe('on change', function () {
      const query = { private: false, display_name: 'Hello' }

      before(function () {
        create.simulate('change', query)
      })

      it('should update collection details', function () {
        expect(wrapper.state().newCollection).to.eql(query)
      })
    })

    describe('with a collection name', function () {
      const query = { private: false, display_name: 'Hello' }

      before(function () {
        create.simulate('change', query)
        create = wrapper.find(CreateCollection)
      })

      it('should not be disabled', function () {
        expect(create.prop('disabled')).to.be.false()
      })

      describe('on submit', function () {
        before(function () {
          const fakeEvent = {
            preventDefault: sinon.stub()
          }
          create.simulate('submit', fakeEvent)
        })

        it('should create a new collection with that name', function () {
          expect(createCollection).to.have.been.calledOnceWith(query, [
            subjectId
          ])
        })

        it('should close the modal', function () {
          expect(wrapper.state().active).to.be.false()
        })
      })
    })
  })
})
