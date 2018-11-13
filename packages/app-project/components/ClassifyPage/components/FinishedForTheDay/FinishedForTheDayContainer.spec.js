import { shallow } from 'enzyme'
import React from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import FinishedForTheDayContainer from './FinishedForTheDayContainer'

let wrapper
let finishedForTheDayWrapper
const mockStore = {
  project: {
    background: {
      src: 'foobar.jpg'
    },
    displayName: 'Foobar'
  }
}

describe('Component > FinishedForTheDayContainer', function () {

  before(function () {
    wrapper = shallow(<FinishedForTheDayContainer.wrappedComponent store={mockStore} />)
    finishedForTheDayWrapper = wrapper.find(FinishedForTheDay)
  })

  it('should render without crashing', function () {})

  it('should render the `FinishedForTheDay` component', function () {
    expect(finishedForTheDayWrapper).to.have.lengthOf(1)
  })

  it('should pass the correct props to the `FinishedForTheDay` component', function () {
    expect(finishedForTheDayWrapper.prop('imageSrc')).to.equal(mockStore.project.background.src)
    expect(finishedForTheDayWrapper.prop('projectName')).to.equal(mockStore.project.displayName)
  })
})
