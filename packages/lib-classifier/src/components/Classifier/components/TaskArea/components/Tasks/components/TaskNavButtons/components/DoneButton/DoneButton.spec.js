import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { DoneButton } from './DoneButton'

describe('DoneButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneButton />)
    expect(wrapper).to.be.ok()
  })

  describe('when props.completed is true', function () {
    it('should render null', function () {
      const wrapper = shallow(<DoneButton completed />)
      expect(wrapper.html()).to.be.null()
    })
  })

  it('should call props.onClick for the onClick event', function () {
    const onClickSpy = sinon.spy()
    const wrapper = shallow(<DoneButton onClick={onClickSpy} />)
    wrapper.simulate('click')
    expect(onClickSpy.calledOnce).to.be.true()
  })

  xdescribe('props.goldStandardMode', function () {
    it('should not render a star icon if props.goldStandardMode is false', function () {
      const wrapper = shallow(<DoneButton />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(0)
    })

    it('should render a star icon if props.goldStandardMode is true', function () {
      const wrapper = shallow(<DoneButton goldStandardMode />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(1)
    })
  })

  xdescribe('props.demoMode', function () {
    it('should not render a trash icon if props.demoMode is false', function () {
      const wrapper = shallow(<DoneButton />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(0)
    })

    it('should render a trash icon if props.demoMode is true', function () {
      const wrapper = shallow(<DoneButton demoMode />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(1)
    })
  })
})
