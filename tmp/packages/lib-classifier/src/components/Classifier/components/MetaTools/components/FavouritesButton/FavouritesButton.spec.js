import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MetaToolsButton from '../MetaToolsButton'

import FavouritesButton, { Favourite } from './FavouritesButton'

let wrapper

describe('Component > FavouritesButton', function () {
  before(function () {
    wrapper = shallow(<FavouritesButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should display an empty icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<Favourite className='' color='dark-5' filled={undefined} size='1em' />)
  })

  it('should not be checked', function () {
    const checked = wrapper.prop('aria-checked')
    expect(checked).to.be.false
  })

  describe('on click', function () {
    const onClickSpy = sinon.spy()
    before(function () {
      wrapper = shallow(<FavouritesButton checked={false} onClick={onClickSpy} />)
    })

    it('should call props.onClick', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClickSpy).to.have.been.calledOnce
    })
  })

  describe('when checked', function () {
    before(function () {
      wrapper = shallow(<FavouritesButton checked />)
    })

    it('should display a filled icon', function () {
      const button = wrapper.find(MetaToolsButton)
      const { icon } = button.props()
      expect(icon).to.deep.equal(<Favourite className='' color='dark-5' filled='true' size='1em' />)
    })

    it('should be checked', function () {
      const checked = wrapper.find(MetaToolsButton).prop('aria-checked')
      expect(checked).to.be.true
    })
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <FavouritesButton
        disabled
        onClick={onClick}
      />
    )

    it('should not be clickable', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.not.have.been.called
    })
  })
})
