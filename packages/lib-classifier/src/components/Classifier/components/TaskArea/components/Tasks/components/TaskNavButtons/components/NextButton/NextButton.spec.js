import { shallow } from 'enzyme'
import { NextButton } from './NextButton'

describe('NextButton', function () {
  describe('rendering', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton hasNextStep />)
    })
  })

  describe('props.autoFocus', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton hasNextStep />)
    })

    it('should not be auto-focused if props.autoFocus is false', function () {
      expect(wrapper.props().autoFocus).to.be.false()
    })

    it('should be auto-focused if props.autoFocus is true', function () {
      wrapper.setProps({ autoFocus: true })
      expect(wrapper.props().autoFocus).to.be.true()
    })
  })
})
