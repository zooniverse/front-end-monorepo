import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MetaToolsButton from '../MetaToolsButton'

import TalkLink from './TalkLink'
import TalkIcon from './TalkIcon'

let wrapper

describe('Component > TalkLink', function () {
  before(function () {
    wrapper = shallow(<TalkLink href='/project/slug/talk/1234' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display a Talk icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<TalkIcon color='dark-5' size='1em' />)
  })

  it('should link to the subject Talk page', function () {
    const button = wrapper.find(MetaToolsButton)
    const { href } = button.props()
    expect(href).to.equal('/project/slug/talk/1234')
  })
})
