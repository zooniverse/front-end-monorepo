import { shallow } from 'enzyme'
import Metadata from './Metadata'
import MetadataButton from './components/MetadataButton'

describe('Metadata', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Metadata />)
    expect(wrapper).to.be.ok()
  })

  describe('when there is no metadata', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<Metadata />)
    })

    it('should not render the MetadataModal', function () {
      expect(wrapper.find('MetadataModal')).to.have.lengthOf(0)
    })

    it('should disable the MetadataButton', function () {
      expect(wrapper.find(MetadataButton).props().disabled).to.be.true()
    })
  })

  describe('when there is metadata', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<Metadata isThereMetadata />)
    })

    it('should render the MetadataModal', function () {
      expect(wrapper.find('MetadataModal')).to.have.lengthOf(1)
    })

    it('should not disable the MetadataButton', function () {
      expect(wrapper.find(MetadataButton).props().disabled).to.be.false()
    })

    it('should set showMetadataModel state when the toggle handler is called', function () {
      expect(wrapper.state().showMetadataModal).to.be.false()
      wrapper.find(MetadataButton).simulate('click')
      expect(wrapper.state().showMetadataModal).to.be.true()
    })
  })
})
