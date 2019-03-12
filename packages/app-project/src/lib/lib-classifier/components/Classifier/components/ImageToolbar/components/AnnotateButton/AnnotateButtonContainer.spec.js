import { shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'mobx-react'
import AnnotateButtonContainer from './AnnotateButtonContainer'

describe('Component > AnnotateButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<AnnotateButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok
  })
})
