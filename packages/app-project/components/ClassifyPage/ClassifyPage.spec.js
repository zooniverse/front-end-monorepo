import { shallow } from 'enzyme'
import React from 'react'

import ClassifyPage from './ClassifyPage'
import FinishedForTheDay from './components/FinishedForTheDay'

let wrapper

describe('Component > ClassifyPage', function () {
  before(function () {
    wrapper = shallow(<ClassifyPage />)
  })

  it('should render without crashing', function () {})

  it('should render the `FinishedForTheDay` component', function () {
    expect(wrapper.find(FinishedForTheDay)).to.have.lengthOf(1)
  })
})
