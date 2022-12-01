import { shallow } from 'enzyme'
import Triangle from '../Triangle'
import { Label } from './Label'

describe('Tooltip > Component > Label', function () {
  let wrapper
  beforeEach(function () {
    wrapper = shallow(<Label label='helpful tip' />)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    expect(wrapper.contains('helpful tip')).to.be.true()
  })

  it('should set the animation of the wrapper Box', function () {
    expect(wrapper.props().animation).to.equal('fadeIn')
    wrapper.setProps({ animation: 'zoomIn' })
    expect(wrapper.props().animation).to.equal('zoomIn')
  })

  describe('arrow', function () {
    beforeEach(function () {
      wrapper = shallow(<Label data-position='top' label='helpful tip' />)
    })

    it('should render an arrow based on the prop', function () {
      expect(wrapper.find(Triangle)).to.have.lengthOf(1)
      wrapper.setProps({ arrow: false })
      expect(wrapper.find(Triangle)).to.have.lengthOf(0)
    })

    it('should position the arrow based on the data-position prop', function () {
      let arrow = wrapper.find('Box').first().childAt(1)
      expect(arrow).to.have.lengthOf(1)
      expect(arrow.props().pointDirection).to.equal('down')
      wrapper.setProps({ 'data-placement': 'bottom' })
      arrow = wrapper.find('Box').first().childAt(0)
      expect(arrow).to.have.lengthOf(1)
      expect(arrow.props().pointDirection).to.equal('up')

    })
  })
})
