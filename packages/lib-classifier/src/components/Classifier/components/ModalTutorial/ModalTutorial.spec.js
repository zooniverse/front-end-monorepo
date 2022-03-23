import React from 'react'
import { shallow, mount } from 'enzyme'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import { ModalTutorial } from './ModalTutorial'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { TutorialFactory, UPPFactory } from '@test/factories'
import mockStore  from '@test/mockStore'

const tutorial = TutorialFactory.build()

describe('ModalTutorial', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ModalTutorial setModalVisibility={() => {}} />)
    expect(wrapper).to.be.ok()
  })

  it('should render null if a tutorial has not been successfully loaded', function () {
    const wrapper = shallow(<ModalTutorial setModalVisibility={() => { }} />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render a Modal when a tutorial is successfully loaded', function () {
    const wrapper = shallow(
      <ModalTutorial
        tutorial={tutorial}
      />
    )

    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  describe('on close', function () {
    let store

    beforeEach(async function () {
      store = mockStore()
      const tutorialSnapshot = TutorialFactory.build()
      store.tutorials.setTutorials([tutorialSnapshot])
      await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
    })

    it('should record the active tutorial as complete', function () {
      const clock = sinon.useFakeTimers({ now: new Date('2022-03-01T12:00:00Z'), toFake: ['Date'] })
      const tutorial = store.tutorials.active
      const seen = new Date().toISOString()
      const wrapper = mount(
        <ModalTutorial
          tutorial={tutorial}
        />,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: { classifierStore: store }
        }
      )
      // open a tutorial
      wrapper.setProps({ hasNotSeenTutorialBefore: true })
      wrapper.update()
      const closeFn = wrapper.find(Modal).prop('closeFn')
      closeFn()
      wrapper.update()
      const upp = store.userProjectPreferences.active
      expect(upp?.preferences.tutorials_completed_at[tutorial.id]).to.equal(seen)
      clock.restore()
    })

    it('should close the tutorial', function () {
      const tutorial = store.tutorials.active
      const wrapper = mount(
        <ModalTutorial
          tutorial={tutorial}
        />,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: { classifierStore: store }
        }
      )
      // open a tutorial
      wrapper.setProps({ hasNotSeenTutorialBefore: true })
      wrapper.update()
      let active = wrapper.find(Modal).prop('active')
      expect(active).to.be.true()
      const closeFn = wrapper.find(Modal).prop('closeFn')
      closeFn()
      wrapper.update()
      active = wrapper.find(Modal).prop('active')
      expect(active).to.be.false()
    })
  })

  // TODO: Enzyme doesn't support React `createContext` yet which Grommet uses
  // So these tests will be broken until they support that.
  // it('should render a SlideTutorial as the child of the Modal', function () {
  //   const wrapper = shallow(
  //     <ModalTutorial
  //       loadingState={asyncStates.success}
  //       setModalVisibility={() => { }}
  //       tutorial={tutorial}
  //     />
  //   )

  //   expect(wrapper.find(SlideTutorial)).to.have.lengthOf(1)
  // })
})
