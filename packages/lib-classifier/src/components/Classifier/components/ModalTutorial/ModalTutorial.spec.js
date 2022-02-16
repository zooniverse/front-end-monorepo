import React from 'react'
import { shallow } from 'enzyme'
import ModalTutorial from './ModalTutorial'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { TutorialFactory } from '@test/factories'

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
        loadingState={asyncStates.success}
        setModalVisibility={() => { }}
        tutorial={tutorial}
      />
    )

    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  // TODO: Enzyme doesn't support React `createContext` yet which Grommet uses
  // So these tests will be broken until they support that.
  // it('should render a SlideTutorial as the child of the Modal', function () {
  //   const wrapper = shallow(
  //     <ModalTutorial.wrappedComponent
  //       loadingState={asyncStates.success}
  //       setModalVisibility={() => { }}
  //       tutorial={tutorial}
  //     />
  //   )

  //   expect(wrapper.find(SlideTutorial)).to.have.lengthOf(1)
  // })
})
