import { shallow } from 'enzyme'
import Media from './Media'
import ThumbnailImage from './components/ThumbnailImage'
import Video from './components/Video'
import Audio from './components/Audio'

const image = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
const video = 'https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4'
const audio = 'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'

describe('Media', function () {
  let wrapper
  it('should render without crashing', function () {
    wrapper = shallow(<Media src={image} />)
    expect(wrapper).to.be.ok()
  })

  it('should render ThumbnailImage if the source mimetype is an image', function () {
    wrapper = shallow(<Media src={image} />)
    expect(wrapper.find(ThumbnailImage)).to.have.lengthOf(1)
  })

  it('should render Video if the source mimetype is a video', function () {
    wrapper = shallow(<Media src={video} />)
    expect(wrapper.find(Video)).to.have.lengthOf(1)
  })

  it('should render Audio if the source mimetype is audio', function () {
    wrapper = shallow(<Media src={audio} />)
    expect(wrapper.find(Audio)).to.have.lengthOf(1)
  })
})
