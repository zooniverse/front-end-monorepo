import { shallow, mount } from 'enzyme'
import React from 'react'

import { Banner } from './Banner'

let wrapper

const BANNER_TEXT = 'Foobar'
const TOOLTIP_TEXT = 'Baz'
const THEME = {
  mode: 'light'
}

const COMPONENT = (
  <Banner
    background='red'
    bannerText={BANNER_TEXT}
    theme={THEME}
    tooltipText={TOOLTIP_TEXT}
  />
)

describe('Component > Banner', function () {
  before(function () {
    wrapper = shallow(COMPONENT)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should show the banner text', function () {
    expect(wrapper.render().html()).to.include(BANNER_TEXT)
  })

  describe('`Why am I seeing this?` button', function () {
    before(function () {
      wrapper = mount(COMPONENT)
    })

    it('should exist', function () {
      const button = wrapper.find('button')
      expect(button.html()).to.include('Why am I seeing this?')
    })

    describe('behaviour when mouseover is available', function () {
      before(function () {
        wrapper = mount(COMPONENT)
        wrapper.setState({
          userCanHover: true
        })
      })

      after(function () {
        wrapper.setState({
          userCanHover: false
        })
      })

      beforeEach(function () {
        wrapper.setState({
          tooltipOpen: false
        })
      })

      afterEach(function () {
        wrapper.setState({
          tooltipOpen: false
        })
      })

      it('should toggle the tooltip on hover', function () {
        const button = wrapper.find('button')
        button.simulate('mouseover')
        expect(wrapper.find('Drop')).to.have.lengthOf(1)
        button.simulate('mouseout')
        expect(wrapper.find('Drop')).to.have.lengthOf(0)
      })

      it('shouldn\'t toggle the tooltip on tap', function () {
        const button = wrapper.find('button')
        button.simulate('click')
        expect(wrapper.find('Drop')).to.have.lengthOf(0)
      })
    })

    describe('behaviour when mouseover isn\'t available', function () {
      before(function () {
        wrapper = mount(COMPONENT)
        wrapper.setState({
          userCanHover: false
        })
      })

      beforeEach(function () {
        wrapper.setState({
          tooltipOpen: false
        })
      })

      afterEach(function () {
        wrapper.setState({
          tooltipOpen: false
        })
      })

      it('should toggle the tooltip on tap', function () {
        const button = wrapper.find('button')
        button.simulate('click')
        expect(wrapper.find('Drop')).to.have.lengthOf(1)
        button.simulate('click')
        expect(wrapper.find('Drop')).to.have.lengthOf(0)
      })
    })
  })

  describe('Tooltip', function () {
    before(function () {
      wrapper = mount(COMPONENT)
      wrapper.setState({
        tooltipOpen: true
      })
    })

    after(function () {
      wrapper.setState({
        tooltipOpen: false
      })
    })

    it('should pass the `tooltipText` prop to `<TooltipText />`', function () {
      const tooltipTextWrapper = wrapper.find('TooltipText')
      expect(tooltipTextWrapper.prop('text')).to.equal(TOOLTIP_TEXT)
    })

    it('should dismiss itself on click when hover isn\'t available', function () {
      expect(wrapper.find('Drop')).to.have.lengthOf(1)
      wrapper.setState({
        userCanHover: false
      })
      wrapper.find('Drop').find('[onClick]').first().simulate('click')
      expect(wrapper.find('Drop')).to.have.lengthOf(0)
    })
  })
})
