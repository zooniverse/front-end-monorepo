import { shallow } from 'enzyme'
import React from 'react'
import RasterViewer from './RasterViewer'

describe('Component > RasterViewer', function () {
  it('should render without crashing', function () {
    shallow(<RasterViewer />)
  })

  it('should render nothing if there is no url prop', function () {
    const wrapper = shallow(<RasterViewer />)
    expect(wrapper.get(0)).to.equal(null)
  })

  it('should render an img if passed a url', function () {
    const wrapper = shallow(<RasterViewer url="http://foo.bar/baz" />)
    const viewers = wrapper.find('img')
    viewers.length.should.equal(1)
  })
})
