import { mount, shallow } from 'enzyme'
import React from 'react'
import { Modal } from '@zooniverse/react-components'
import AuthModal from './AuthModal'
import LoginForm from './components/LoginForm'

const CLOSE_MODAL = Function.prototype
const ON_ACTIVE = Function.prototype

describe('Component > AuthModal', function () {
  let wrapper

  before(function () {
    wrapper = mount(<AuthModal
      activeIndex={-1}
      closeModal={CLOSE_MODAL}
      onActive={ON_ACTIVE}
    />)
  })

  afterEach(function () {
    wrapper.setProps({
      activeIndex: -1
    })
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass through the `activeIndex` and `onActive` props to Tabs', function () {
    // `Tabs` should be the first component
    const tabsWrapper = wrapper.children().first()
    expect(tabsWrapper.prop('activeIndex')).to.equal(-1)
    expect(tabsWrapper.prop('onActive')).to.equal(ON_ACTIVE)
  })

  it('should pass `closeModal` prop to Modal and the child form components', function () {
    expect(wrapper.find(Modal).prop('closeFn')).to.equal(CLOSE_MODAL)
  })
})
