import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { TaskArea } from './TaskArea'
import { Tab, Tabs } from './components/Tabs'
import Tasks from './components/Tasks'
import SlideTutorial from '../SlideTutorial'

describe('TaskArea', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper).to.be.ok
  })

  it('should render a Tabs wrapper component and two Tab components', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper.find(Tabs)).to.have.lengthOf(1)
    expect(wrapper.find(Tab)).to.have.lengthOf(2)
  })

  it('should render Tasks', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper.find(Tasks)).to.have.lengthOf(1)
  })

  it('should render SlideTutorial', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper.find(SlideTutorial)).to.have.lengthOf(1)
  })

  describe('#onTabClick', function () {
    const tutorial = { id: '10' }
    let setActiveTutorialSpy
    let wrapper
    before(function () {
      setActiveTutorialSpy = sinon.spy()
      wrapper = shallow(<TaskArea setActiveTutorial={setActiveTutorialSpy} tutorial={tutorial} />)
    })
    afterEach(function () {
      setActiveTutorialSpy.resetHistory()
    })

    it('should call setActiveTutorial when activeIndex is 1 with the tutorial', function () {
      wrapper.instance().onTabClick(1)
      expect(setActiveTutorialSpy).to.have.been.calledOnce
      expect(setActiveTutorialSpy).to.have.been.calledWith(tutorial)
    })

    it('should call setActiveTutorial when activeIndex is 0 with no argument', function () {
      wrapper.instance().onTabClick(0)
      expect(setActiveTutorialSpy).to.have.been.calledOnce
      expect(setActiveTutorialSpy.args[0]).to.have.lengthOf(0)
    })
  })
})
