import { shallow, mount } from 'enzyme'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@test/i18n/i18n-for-tests'
import sinon from 'sinon'

import { Banner, Tooltip } from './Banner'

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
    show
    theme={THEME}
    tooltipText={TOOLTIP_TEXT}
  />
)

describe('Component > Banner', function () {
  before(function () {
    wrapper = shallow(COMPONENT)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the banner text', function () {
    expect(wrapper.render().html()).to.include(BANNER_TEXT)
  })

  describe('`Why am I seeing this?` button', function () {
    let useTranslationStub

    before(function () {
      useTranslationStub = sinon.stub(i18n, 't')
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          {COMPONENT}
        </I18nextProvider>
      )
    })

    after(function () {
      useTranslationStub.restore()
    })

    it('should exist', function () {
      const button = wrapper.childAt(0).find('button')
      expect(button).to.exist()
    })
    
    it('should use a translation function for its label', function () {
      expect(useTranslationStub).to.have.been.calledWith('Banners.Banner.whyAmISeeingThis')
    })

    describe('behaviour on click', function () {
      before(function () {
        wrapper = mount(COMPONENT)
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
      wrapper = shallow(
        <Tooltip
          mode='light'
          tooltipText={TOOLTIP_TEXT}
        />
      )
    })

    it('should pass the `tooltipText` prop to `<TooltipText />`', function () {
      const tooltipTextWrapper = wrapper.find('TooltipText')
      expect(tooltipTextWrapper.prop('text')).to.equal(TOOLTIP_TEXT)
    })
  })
})
