import { shallow } from 'enzyme'
import React from 'react'
import { Video as GrommetVideo } from 'grommet'

import Video from './Video'

const video = 'https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4'

describe('Video', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Video src={video} />)
    expect(wrapper).to.be.ok
  })

  it('should render a Grommet Video', function () {
    const wrapper = shallow(<Video src={video} />)
    expect(wrapper.find(GrommetVideo)).to.have.lengthOf(1)
  })

  it('should set the a11yTitle using the alt prop', function () {
    const alt = "A video about Zooniverse"
    const wrapper = shallow(<Video alt={alt} src={video} />)
    expect(wrapper.find(GrommetVideo).props().a11yTitle).to.equal(alt)
  })

  it('should set the controls to render below', function () {
    const wrapper = shallow(<Video src={video} />)
    expect(wrapper.find(GrommetVideo).props().controls).to.equal('below')
  })
})