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
    let wrapper
    let onActive

    before(function () {
      wrapper = shallow(<TaskArea tutorial={tutorial} />)
      onActive = wrapper.find(Tabs).prop('onActive')
    })

    it('should set the active tab', function () {
      onActive(1)
      expect(wrapper.find(Tabs).props().activeIndex).to.equal(1)
    })
  })

  describe('when the tutorial closes', function () {
    let setSeenTimeSpy
    let wrapper
    before(function () {
      setSeenTimeSpy = sinon.spy()
      wrapper = shallow(<TaskArea setSeenTime={setSeenTimeSpy} tutorial={tutorial} />)
      wrapper.find(SlideTutorial).simulate('click')
    })
    afterEach(function () {
      setSeenTimeSpy.resetHistory()
    })

    it('should set the tutorial seen time', function () {
      expect(setSeenTimeSpy.withArgs(tutorial)).to.have.been.calledOnce()
    })

    it('should activate the tasks tab', function () {
      expect(wrapper.find(Tabs).props().activeIndex).to.equal(0)
    })
  })
})
