import { shallow } from 'enzyme'
import React from 'react'

import ContentBox from './ContentBox'

let wrapper
const Foobar = () => <div>Foobar</div>

describe('Component > ContentBox', function () {
  before(function () {
    wrapper = shallow(
      <ContentBox>
        <Foobar />
      </ContentBox>
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render its children', function () {
    expect(wrapper.find(Foobar)).to.have.lengthOf(1)
  })
})
