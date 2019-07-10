import { shallow } from 'enzyme'
import React from 'react'

import { ClassifyPage } from './ClassifyPage'
import FinishedForTheDay from './components/FinishedForTheDay'
import ThemeModeToggle from '../../components/ThemeModeToggle'
import ProjectName from '../../components/ProjectName'
import YourStats from './components/YourStats'
import ConnectWithProject from '../../shared/components/ConnectWithProject'
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

  it('should render the `ThemeModeToggle` component', function () {
    expect(wrapper.find(ThemeModeToggle)).to.have.lengthOf(1)
  })

  it('should render the `ProjectName` component', function () {
    expect(wrapper.find(ProjectName)).to.have.lengthOf(1)
  })

  xit('should render the `YourStats` component', function () {
    expect(wrapper.find(YourStats)).to.have.lengthOf(1)
  })

  it('should render the `ConnectWithProject` component', function () {
    expect(wrapper.find(ConnectWithProject)).to.have.lengthOf(1)
  })
})
