import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { PlainButton } from '@zooniverse/react-components'

import FavouritesButton, { Favourite, IsFavourite } from './FavouritesButton'

let wrapper

describe('Component > FavouritesButton', function () {
  before(function () {
    wrapper = shallow(<FavouritesButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should display an empty icon', function () {
    const button = wrapper.find(PlainButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<Favourite filled={false} />)
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
      wrapper.simulate('click')
      expect(onClickSpy).to.have.been.calledOnce
    })
  })
  describe('when checked', function () {
    before(function () {
      wrapper = shallow(<FavouritesButton checked={true} />)
    })

    it('should display a filled icon', function () {
      const button = wrapper.find(PlainButton)
      const { icon } = button.props()
      expect(icon).to.deep.equal(<Favourite filled={true} />)
    })

    it('should be checked', function () {
      const checked = wrapper.prop('aria-checked')
      expect(checked).to.be.true
    })
  })
})
