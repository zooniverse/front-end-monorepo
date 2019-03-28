import { shallow } from 'enzyme'
import React from 'react'

import RetiredBannerContainer from './RetiredBannerContainer'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe.only('Component > RetiredBannerContainer', function () {
  before(function () {
    wrapper = shallow(<RetiredBannerContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(componentWrapper.prop('background')).to.equal('#E45950')
  })

  it('should pass a `bannerText` prop to <Banner />', function () {
    expect(componentWrapper.prop('bannerText')).to.equal('Finished: This subject has been retired')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'This subject already has enough classifications, so yours won\'t be used in its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(componentWrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  it('should show the banner if the subject has been retired', function () {
    wrapper.setProps({ subject: { retired: true } })
    expect(wrapper.find(Banner).prop('show')).to.be.true
  })

  it('shouldn\'t show the banner when subject hasn\'t been retired', function () {
    wrapper.setProps({ subject: { retired: false } })
    expect(wrapper.find(Banner).prop('show')).to.be.false
  })
})
