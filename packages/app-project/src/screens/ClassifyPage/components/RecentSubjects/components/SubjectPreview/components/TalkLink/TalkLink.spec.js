import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MetaToolsButton from '../MetaToolsButton'

import TalkLink from './TalkLink'
import TalkIcon from './TalkIcon'

let wrapper

describe('Component > TalkLink', function () {
  before(function () {
    wrapper = shallow(<TalkLink />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display a Talk icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<TalkIcon color='dark-5' size='1em' />)
  })

  it('should call props.onClick on click', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <TalkLink
        onClick={onClick}
      />
    )

    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClick).to.have.been.calledOnce()
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <TalkLink
        disabled
        onClick={onClick}
      />
    )

    it('should not be clickable', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.not.have.been.called()
    })
  })
})
