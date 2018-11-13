import { shallow } from 'enzyme'
import React from 'react'

import Tutorial from './Tutorial'
import TutorialContainer from './TutorialContainer'

let wrapper

describe('Component > Tutorial', function () {
  before(function () {
    wrapper = shallow(<TutorialContainer />)
  })

  it('should render without crashing', function () {})

  it('should render the `Tutorial` component', function () {
    expect(wrapper.find(Tutorial)).to.have.lengthOf(1)
  })
})
