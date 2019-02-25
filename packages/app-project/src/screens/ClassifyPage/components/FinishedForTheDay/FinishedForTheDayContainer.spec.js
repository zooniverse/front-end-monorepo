import { shallow } from 'enzyme'
import React from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import FinishedForTheDayContainer from './FinishedForTheDayContainer'

let wrapper
let finishedForTheDayWrapper
const IMAGE_SRC = 'foobar.jpg'
const PROJECT_NAME = 'Foobar'

describe('Component > FinishedForTheDayContainer', function () {
  before(function () {
    wrapper = shallow(<FinishedForTheDayContainer.wrappedComponent
      imageSrc={IMAGE_SRC}
      projectName={PROJECT_NAME}
    />)
    finishedForTheDayWrapper = wrapper.find(FinishedForTheDay)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `FinishedForTheDay` component', function () {
    expect(finishedForTheDayWrapper).to.have.lengthOf(1)
  })

  it('should pass the correct props to the `FinishedForTheDay` component', function () {
    expect(finishedForTheDayWrapper.prop('imageSrc')).to.equal(IMAGE_SRC)
    expect(finishedForTheDayWrapper.prop('projectName')).to.equal(PROJECT_NAME)
  })
})
