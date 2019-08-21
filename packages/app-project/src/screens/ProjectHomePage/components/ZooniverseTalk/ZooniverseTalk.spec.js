import { shallow, render } from 'enzyme'
import React from 'react'

import { ZooniverseTalk } from './ZooniverseTalk'
import translations from './locales/en'
import ContentBox from '../../../../shared/components/ContentBox'

describe('Component > ZooniverseTalk', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ZooniverseTalk />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the title', function () {
    const { title } = translations.ZooniverseTalk
    const titleWrapper = wrapper.find(`[children="${title}"]`)
    expect(titleWrapper).to.have.lengthOf(1)
  })

  it('should show a message', function () {
    const { message } = translations.ZooniverseTalk
    const messageWrapper = wrapper.find(`[children="${message}"]`)
    expect(messageWrapper).to.have.lengthOf(1)
  })

  it('should use a row layout', function () {
    const contentBox = wrapper.find(ContentBox)
    expect(contentBox.prop('direction')).to.equal('row')
  })

  describe('on small screens', function () {
    before(function () {
      wrapper.setProps({ screenSize: 'small' })
    })

    after(function () {
      wrapper.setProps({ screenSize: undefined })
    })

    it('should use a column layout', function () {
      const contentBox = wrapper.find(ContentBox)
      expect(contentBox.prop('direction')).to.equal('column')
    })
  })
})
