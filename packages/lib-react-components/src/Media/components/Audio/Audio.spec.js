import { shallow } from 'enzyme'
import React from 'react'

import Audio from './Audio'

const audio = 'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'

describe('Audio', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Audio src={audio} />)
    expect(wrapper).to.be.ok
  })

  it('should render an audio element', function () {
    const wrapper = shallow(<Audio src={audio} />)
    expect(wrapper.find('audio')).to.have.lengthOf(1)
  })

  it('should set the aria-title using the alt prop', function () {
    const alt = "City noise"
    const wrapper = shallow(<Audio alt={alt} src={audio} />)
    expect(wrapper.find('audio').props()['aria-title']).to.equal(alt)
  })
})