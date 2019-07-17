import { Tab, Tabs } from '@zooniverse/react-components'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { TaskArea } from './TaskArea'
import Tasks from './components/Tasks'
import SlideTutorial from '../SlideTutorial'
import { TutorialFactory } from '../../../../../test/factories'

const tutorial = TutorialFactory.build()

describe('TaskArea', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper).to.be.ok()
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

  it('should set the Tabs prop with the activeIndex state', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper.find(Tabs).props().activeIndex).to.equal(wrapper.state().activeIndex)
  })

  it('should disable the tutorial tab if disableTutorialTab is true', function () {
    const wrapper = shallow(<TaskArea disableTutorialTab />)
    expect(wrapper.find(Tab).last().props().disabled).to.be.true()
  })

  describe('#onTabClick', function () {
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
      expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial)
    })

    it('should call setActiveTutorial when activeIndex is 0 with no argument', function () {
      wrapper.instance().onTabClick(0)
      expect(setActiveTutorialSpy).to.have.been.calledOnce()
      expect(setActiveTutorialSpy.args[0]).to.have.lengthOf(0)
    })

    it('should set the active index state', function () {
      const activeIndex = 1
      wrapper.instance().onTabClick(activeIndex)
      expect(wrapper.state().activeIndex).to.equal(activeIndex)
    })
  })

  describe('#onClose', function () {
    let setActiveTutorialSpy
    let wrapper
    before(function () {
      setActiveTutorialSpy = sinon.spy()
      wrapper = shallow(<TaskArea setActiveTutorial={setActiveTutorialSpy} tutorial={tutorial} />)
    })
    afterEach(function () {
      setActiveTutorialSpy.resetHistory()
    })

    it('should call setActiveTutorial with no argument', function () {
      wrapper.instance().onClose()
      expect(setActiveTutorialSpy).to.have.been.calledOnce()
      expect(setActiveTutorialSpy.args[0]).to.have.lengthOf(0)
    })

    it('should set the active index state to 0', function () {
      wrapper.instance().onClose()
      expect(wrapper.state().activeIndex).to.equal(0)
    })
  })
})
