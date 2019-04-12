import { shallow } from 'enzyme'
import React from 'react'

import ClassifyPage from './ClassifyPage'
import FinishedForTheDay from './components/FinishedForTheDay'
import ProjectStatistics from '../../shared/components/ProjectStatistics'

let wrapper

describe('Component > ClassifyPage', function () {
  before(function () {
    wrapper = shallow(<ClassifyPage />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `FinishedForTheDay` component', function () {
    expect(wrapper.find(FinishedForTheDay)).to.have.lengthOf(1)
  })

  it('should render the `ProjectStatistics` component', function () {
    expect(wrapper.find(ProjectStatistics)).to.have.lengthOf(1)
  })
})
