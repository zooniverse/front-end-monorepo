import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { PlainButton } from '@zooniverse/react-components'

import CollectionsButton, { Collect } from './CollectionsButton'

let wrapper

describe('Component > CollectionsButton', function () {
  before(function () {
    wrapper = shallow(<CollectionsButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should display a Collect icon', function () {
    const button = wrapper.find(PlainButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<Collect />)
  })

  it('should call props.onClick on click', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <CollectionsButton
        onClick={onClick}
      />
    )

    wrapper.find(PlainButton).simulate('click')
    expect(onClick).to.have.been.calledOnce
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <CollectionsButton
        disabled
        onClick={onClick}
      />
    )

    it('should not be clickable', function () {
      wrapper.find(PlainButton).simulate('click')
      expect(onClick).to.not.have.been.called
    })
  })
})
