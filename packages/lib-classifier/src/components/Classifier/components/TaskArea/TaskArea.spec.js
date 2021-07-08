import { Tab, Tabs } from '@zooniverse/react-components'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import TaskArea from './TaskArea'
import { DisabledTaskPopup, Tasks } from './components'
import SlideTutorial from '../SlideTutorial'
import { SubjectFactory, TutorialFactory, WorkflowFactory } from '@test/factories'

describe.only('TaskArea', function () {
  const tutorial = TutorialFactory.build()

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
      expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial)
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

    it('should clear the active tutorial', function () {
      expect(setActiveTutorialSpy).to.have.been.calledOnce()
      expect(setActiveTutorialSpy.args[0]).to.have.lengthOf(0)
    })

    it('should activate the tasks tab', function () {
      expect(wrapper.find(Tabs).props().activeIndex).to.equal(0)
    })
  })

  describe('with an indexed workflow', function () {
    const workflow = WorkflowFactory.build({
      hasIndexedSubjects: true
    })
    let wrapper

    before(function () {
      wrapper = mount(
        <TaskArea
          tutorial={tutorial}
          workflow={workflow}
        />
      )
    })

    describe('with a retired subject', function () {
      const subject = SubjectFactory.build({
        retired: true
      })

      before(function () {
        wrapper.setProps({ subject })
        wrapper.update()
      })

      it('should disable the task area', function () {
        const tasks = wrapper.find(Tasks)
        expect(tasks.prop('disabled')).to.be.true()
      })

      it('should open a popup', function () {
        const popup = wrapper.find(DisabledTaskPopup)
        expect(popup.prop('isOpen')).to.be.true()
      })
    })

    describe('with an unclassified subject', function () {
      const subject = SubjectFactory.build()

      before(function () {
        wrapper.setProps({ subject })
        wrapper.update()
      })

      it('should enable the task area', function () {
        const tasks = wrapper.find(Tasks)
        expect(tasks.prop('disabled')).to.be.false()
      })

      it('should not open a popup', function () {
        const popup = wrapper.find(DisabledTaskPopup)
        expect(popup.prop('isOpen')).to.be.false()
      })
    })
  })
})
