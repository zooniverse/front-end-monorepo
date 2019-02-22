import { shallow, mount } from 'enzyme'
import React from 'react'
import { Image } from 'grommet'
import ProgressiveImage from 'react-progressive-image'

import ThumbnailImage, { Placeholder } from './ThumbnailImage'

const image = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'

describe('Image', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ThumbnailImage src={image} />)
    expect(wrapper).to.be.ok
  })

  it('should render a Grommet Image', function () {
    const wrapper = mount(<ThumbnailImage src={image} />)
    const progressiveImageInstance = wrapper.find(ProgressiveImage).instance()
    progressiveImageInstance.onLoad()
    wrapper.update()
    expect(wrapper.find(Image)).to.have.lengthOf(1)
  })

  it('should set the alt attribute using the alt prop', function () {
    const alt = "A galaxy"
    const wrapper = mount(<ThumbnailImage alt={alt} src={image} />)
    const progressiveImageInstance = wrapper.find(ProgressiveImage).instance()
    progressiveImageInstance.onLoad()
    wrapper.update()
    expect(wrapper.find(Image).props().alt).to.equal(alt)
  })

  it('should be wrapped by ProgressiveImage', function () {
    const wrapper = mount(<ThumbnailImage src={image} />)
    expect(wrapper.find(ProgressiveImage)).to.have.lengthOf(1)
  })

  it('should render the Placeholder component if loading', function () {
    const wrapper = mount(<ThumbnailImage src={image} />)

    expect(wrapper.find(Placeholder)).to.have.lengthOf(1)
    expect(wrapper.find(Image)).to.have.lengthOf(0)
  })

  it('should delay loading the image the given time in props.delay', function (done) {
    const delay = 1000
    const wrapper = mount(<ThumbnailImage delay={delay} src={image} />)
    const progressiveImageInstance = wrapper.find(ProgressiveImage).instance()
    progressiveImageInstance.onLoad()
    setTimeout(function () {
      wrapper.update()
      expect(wrapper.find(Placeholder)).to.have.lengthOf(0)
      expect(wrapper.find(Image)).to.have.lengthOf(1)
      done()
    }, delay + 1)
  })

  it('should have a `<noscript />` image for SSR', function () {
    const wrapper = mount(<ThumbnailImage src={image} />)
    const noscriptWrapper = wrapper.find('noscript')
    expect(noscriptWrapper).to.have.lengthOf(1)
    expect(noscriptWrapper.find('div')).to.have.lengthOf(1)
  })

})
