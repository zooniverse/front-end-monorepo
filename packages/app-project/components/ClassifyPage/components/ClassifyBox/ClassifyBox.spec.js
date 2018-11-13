import { shallow } from 'enzyme'
import React from 'react'

import ClassifyBox from './ClassifyBox'

let wrapper
const Foobar = () => <div>Foobar</div>

describe('Component > ClassifyBox', function () {
  before(function () {
    wrapper = shallow(
      <ClassifyBox>
        <Foobar />
      </ClassifyBox>
    )
  })

  it('should render without crashing', function () {})

  it('should render its children', function () {
    expect(wrapper.find(Foobar)).to.have.lengthOf(1)
  })
})
