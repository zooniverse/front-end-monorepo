import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { PlainButton } from '@zooniverse/react-components'

import ClearFilters from './ClearFilters'

describe('Component > ClearFilters', function () {
  let wrapper, handleFilterSpy

  before(function () {
    handleFilterSpy = sinon.spy()
    wrapper = shallow(
      <ClearFilters
        handleFilter={handleFilterSpy}
        showingChoices={5}
        totalChoices={20}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a Button', function () {
    expect(wrapper.find(PlainButton)).to.have.lengthOf(1)
  })

  it('should call handleFilter on button click', function () {
    expect(handleFilterSpy).to.not.have.been.called()

    wrapper.find(PlainButton).simulate('click')

    expect(handleFilterSpy).to.have.been.calledOnce()
    handleFilterSpy.resetHistory()
  })

  it('should disable the button if showing choices = total choices', function () {
    wrapper.setProps({ showingChoices: 20 })

    expect(wrapper.find(PlainButton).props().disabled).to.be.true()
  })
})
