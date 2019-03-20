import { shallow } from 'enzyme'
import React from 'react'

import ApprovedIcon from './ApprovedIcon'

let wrapper

describe('Component > ApprovedIcon', function () {
  before(function () {
    wrapper = shallow(<ApprovedIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('for non-approved projects', function () {
    it('should render null if the `approved` prop is `false`', function () {
      expect(wrapper.isEmptyRender()).to.be.ok()
    })
  })

  describe('for approved projects', function () {
    before(function () {
      wrapper = shallow(<ApprovedIcon approved={true} />)
    })

    it('should render an icon if `approved` is true', function () {
      expect(wrapper.find('FormCheckmark')).to.have.lengthOf(1)
    })

    it('should have a text equivalent for screen readers', function () {
      expect(wrapper.prop('title')).to.equal('Zooniverse Approved')
      expect(wrapper.prop('aria-label')).to.equal('Zooniverse Approved')
    })
  })


})
