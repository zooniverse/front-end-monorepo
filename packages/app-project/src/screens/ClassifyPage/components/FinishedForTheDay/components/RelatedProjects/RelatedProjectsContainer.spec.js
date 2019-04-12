import { shallow } from 'enzyme'
import React from 'react'

import RelatedProjectsContainer from './RelatedProjectsContainer'
import RelatedProjectsButton from './components/RelatedProjectsButton'
import RelatedProjectsModal from './components/RelatedProjectsModal'

let wrapper

describe('Component > RelatedProjectsContainer', function () {
  before(function () {
    wrapper = shallow(<RelatedProjectsContainer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `RelatedProjectsButton` component', function () {
    expect(wrapper.find(RelatedProjectsButton)).to.have.lengthOf(1)
  })

  it('should render the `RelatedProjectsModal` component', function () {
    expect(wrapper.find(RelatedProjectsModal)).to.have.lengthOf(1)
  })

  it('should pass an `active` prop to `RelatedProjectsModal` when the `RelatedProjectsButton` is clicked', function () {
    expect(wrapper.find(RelatedProjectsModal).prop('active')).to.be.false()
    wrapper.find(RelatedProjectsButton).simulate('click')
    expect(wrapper.find(RelatedProjectsModal).prop('active')).to.be.true()
  })
})
