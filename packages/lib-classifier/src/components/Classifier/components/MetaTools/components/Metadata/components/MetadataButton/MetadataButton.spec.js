import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MetaToolsButton from '../../../MetaToolsButton'
import MetadataButton, { StyledInfoIcon } from './MetadataButton'

describe('MetadataButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetadataButton />)
    expect(wrapper).to.be.ok
  })

  it('should display an info icon', function () {
    const wrapper = shallow(<MetadataButton />)
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<StyledInfoIcon className='' color='dark-5' />)
  })

  it('should call props.onClick when button is clicked', function () {
    const onClickSpy = sinon.spy()
    const wrapper = shallow(<MetadataButton onClick={onClickSpy} />)
    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const onClickSpy = sinon.spy()
      const wrapper = mount(
        <MetadataButton
          disabled
          onClick={onClickSpy}
        />
      )
      wrapper.find('button').simulate('click')
      expect(onClickSpy).to.not.have.been.called
    })
  })
})
