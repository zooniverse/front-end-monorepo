import { shallow } from 'enzyme'
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

  describe('height and width', function () {
    it('should be set if specified', function () {
      const wrapper = shallow(<Video height={200} width={270} src={video} />)
      const { maxHeight, maxWidth } = wrapper.props()
      expect(maxHeight).to.equal(200)
      expect(maxWidth).to.equal(270)
    })

    it('should be ignored if not specified', function () {
      const wrapper = shallow(<Video src={video} />)
      const { maxHeight, maxWidth } = wrapper.props()
      expect(maxHeight).to.be.undefined()
      expect(maxWidth).to.be.undefined()
    })
  })
})