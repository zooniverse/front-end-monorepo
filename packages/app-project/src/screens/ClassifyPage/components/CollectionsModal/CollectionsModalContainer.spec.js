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
  let searchCollections = sinon.stub()

  before(function () {
    wrapper = shallow(
      <CollectionsModalContainer.wrappedComponent
        addSubjects={addSubjects}
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
      select = wrapper.find(SelectCollection)
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

      it('should add subjects to the selected collection', function () {
        select.simulate('submit')
        expect(addSubjects).to.have.been.calledOnceWith('1', [])
      })
    })
  })

  it('should contain a form to create a new collection', function () {
    const create = wrapper.find(CreateCollection)
    expect(create).to.have.lengthOf(1)
  })

  describe('with a new collection name', function () {
    it('should create a new collection with that name', function () {

    })

    it('should create a new collection with the supplied subjects', function () {

    })
  })
})
