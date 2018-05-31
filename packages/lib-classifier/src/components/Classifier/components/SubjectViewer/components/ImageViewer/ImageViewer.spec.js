import { shallow } from 'enzyme'
import React from 'react'
import ImageViewer from './ImageViewer'

describe('Component > ImageViewer', function () {
  it('should render without crashing', function () {
    shallow(<ImageViewer />)
  })

  it('should render nothing if there is no url prop', function () {
    const wrapper = shallow(<ImageViewer />)
    expect(wrapper.get(0)).to.equal(null)
  })

  it('should render an image if passed a url', function () {
    const wrapper = shallow(<ImageViewer url='http://foo.bar/baz' />)
    const viewers = wrapper.find('image')
    viewers.length.should.equal(1)
  })
})
