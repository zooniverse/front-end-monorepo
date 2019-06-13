import { shallow } from 'enzyme'
import { Button, Select } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import SelectCollection from './SelectCollection'

let wrapper

describe('Component > SelectCollection', function () {
  const collections = [
    { id: '1', display_name: 'Test One' },
    { id: '2', display_name: 'Test Two' }
  ]
  const onSearch = sinon.stub()
  const onSubmit = sinon.stub()

  before(function () {
    wrapper = shallow(
      <SelectCollection
        collections={collections}
        onSearch={onSearch}
        onSubmit={onSubmit}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should call the onSubmit callback on submit', function () {
    wrapper.find('Grid').simulate('submit')
    expect(onSubmit).to.have.been.calledOnce()
  })

  describe('collections search input', function () {
    let select

    before(function () {
      select = wrapper.find(Select)
    })

    it('should exist', function () {
      expect(select).to.have.lengthOf(1)
    })

    it('should be empty by default', function () {
      expect(select.prop('value')).to.eql({})
    })

    it('should list collections', function () {
      expect(select.prop('options')).to.equal(collections)
    })

    it('should call the onSearch callback', function () {
      const searchText = 'Hello'
      const searchSpy = onSearch.withArgs({
        favorite: false,
        current_user_roles: 'owner,collaborator,contributor',
        search: searchText
      })
      select.simulate('search', searchText)
      expect(searchSpy).to.have.been.calledOnce()
    })
    it('should display the selected collection', function () {
      const collection = { id: '1', display_name: 'Selected collection' }
      wrapper.setProps({ selected: collection })
      select = wrapper.find(Select)
      expect(select.prop('value')).to.eql(collection)
    })
  })

  describe('Add button', function () {
    let button

    before(function () {
      button = wrapper.find(Button)
    })

    it('should contain a button', function () {
      expect(button).to.have.lengthOf(1)
    })

    it('should submit the form', function () {
      expect(button.props().type).to.equal('submit')
    })

    it('can be disabled', function () {
      wrapper.setProps({ disabled: true })
      button = wrapper.find(Button)
      expect(button.prop('disabled')).to.be.true()
    })
  })
})
