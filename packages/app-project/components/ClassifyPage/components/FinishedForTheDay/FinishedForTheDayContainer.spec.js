import { shallow } from 'enzyme'
import React from 'react'

import FinishedForTheDay from './FinishedForTheDay'
import FinishedForTheDayContainer from './FinishedForTheDayContainer'

const mockStore = {
  project: {
    backgrounds: [
      {
        src: 'foobar.jpg'
      }
    ],
    displayName: 'Foobar'
  }
}

describe('Component > FinishedForTheDayContainer', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<FinishedForTheDayContainer.wrappedComponent store={mockStore} />)
  })

  it('should render without crashing', function () {})

  it('should render the `FinishedForTheDay` component', function () {
    expect(wrapper.find(FinishedForTheDay).length).to.equal(1)
  })

  it('should pass the correct props to the `FinishedForTheDay` component', function () {
    expect(wrapper.prop('imageSrc')).to.equal(mockStore.project.backgrounds[0].src)
    expect(wrapper.prop('projectName')).to.equal(mockStore.project.displayName)
  })
})
