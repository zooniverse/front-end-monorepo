import { Tab, Tabs } from '@zooniverse/react-components'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import TaskArea from './TaskArea'
import Tasks from './components/Tasks'
import SlideTutorial from '../SlideTutorial'
import { TutorialFactory } from '@test/factories'

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

  it('should activate the first tab by default', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper.find(Tabs).props().activeIndex).to.equal(0)
  })

  it('should disable the tutorial tab if disableTutorialTab is true', function () {
    const wrapper = shallow(<TaskArea disableTutorialTab />)
    expect(wrapper.find(Tab).last().props().disabled).to.be.true()
  })

  describe('on Tab Click', function () {
    let setActiveTutorialSpy
    let wrapper
    let onActive

    before(function () {
      setActiveTutorialSpy = sinon.spy()
      wrapper = shallow(<TaskArea setActiveTutorial={setActiveTutorialSpy} tutorial={tutorial} />)
      onActive = wrapper.find(Tabs).prop('onActive')
    })
    afterEach(function () {
      setActiveTutorialSpy.resetHistory()
    })

    it('should set the active tutorial when the tutorial tab is clicked', function () {
      onActive(1)
      expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
    })

    it('should clear the active tutorial when the tasks Tab is clicked', function () {
      onActive(0)
      expect(setActiveTutorialSpy).to.have.been.calledOnce()
      expect(setActiveTutorialSpy.args[0]).to.have.lengthOf(0)
    })

    it('should set the active tab', function () {
      onActive(1)
      expect(wrapper.find(Tabs).props().activeIndex).to.equal(1)
    })
  })

  describe('when the tutorial closes', function () {
    let setActiveTutorialSpy
    let wrapper
    before(function () {
      setActiveTutorialSpy = sinon.spy()
      wrapper = shallow(<TaskArea setActiveTutorial={setActiveTutorialSpy} tutorial={tutorial} />)
      wrapper.find(SlideTutorial).simulate('click')
    })
    afterEach(function () {
      setActiveTutorialSpy.resetHistory()
    })

    it('should not clear the active tutorial', function () {
      expect(setActiveTutorialSpy).to.not.have.been.called()
    })

    it('should activate the tasks tab', function () {
      expect(wrapper.find(Tabs).props().activeIndex).to.equal(0)
    })
  })
})
