import { shallow } from 'enzyme'
import HidePreviousMarksContainer from './HidePreviousMarksContainer'
import HidePreviousMarksButton from './HidePreviousMarksButton'
import HidePreviousTranscriptionsButton from './HidePreviousTranscriptionsButton'

describe('Component > HidePreviousMarksContainer', function () {
  describe('by default', function () {
    it('should render a HidePreviousMarksButton', function () {
      const wrapper = shallow(<HidePreviousMarksContainer />)
      expect(wrapper.find(HidePreviousMarksButton).length).to.equal(1)
    })
  })

  describe('Props > transcription type', function () {
    it('should render a HidePreviousTranscriptionsButton', function () {
      const wrapper = shallow(<HidePreviousMarksContainer type='transcription' />)
      expect(wrapper.find(HidePreviousTranscriptionsButton).length).to.equal(1)
    })
  })
})
