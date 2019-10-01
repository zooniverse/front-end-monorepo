import { shallow, render } from 'enzyme'
import React from 'react'
import { Grid } from 'grommet'

import { ZooniverseTalk } from './ZooniverseTalk'
import translations from './locales/en'
import ContentBox from '@shared/components/ContentBox'

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

  it('should use a two-column layout', function () {
    const layout = wrapper.find(Grid)
    expect(layout.prop('columns')).to.deep.equal(['1fr', '3fr'])
  })

  describe('on small screens', function () {
    before(function () {
      wrapper.setProps({ screenSize: 'small' })
    })

    after(function () {
      wrapper.setProps({ screenSize: undefined })
    })

    it('should use a one-column layout', function () {
      const layout = wrapper.find(Grid)
      expect(layout.prop('columns')).to.deep.equal(['1fr'])
    })
  })
})
