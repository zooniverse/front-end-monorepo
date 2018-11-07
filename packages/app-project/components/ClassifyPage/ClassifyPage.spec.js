import { shallow } from 'enzyme'
import React from 'react'

import ClassifyPage from './ClassifyPage'

let wrapper

describe('Component > ClassifyPage', function () {
  before(function () {
    wrapper = shallow(<ClassifyPage />)
  })

  it('should render without crashing', function () {})

  it('should render the `FinishedForTheDay` component', function () {
    // `FinishedForTheDay` is wrapped in a HOC, so we're just asserting on the
    // text to include the component name.
    expect(wrapper.text()).to.contain('FinishedForTheDay')
  })
})
