import { shallow } from 'enzyme'
import sinon from 'sinon'
import CloseButton from '../../../CloseButton'
import ModalHeading, { StyledHeading } from './ModalHeading'

const title = 'Modal Heading'

describe('Modal > ModalHeading', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ModalHeading />)
    expect(wrapper).to.be.ok()
  })

  it('should set the background color of the wrapper flex box by prop', function () {
    const wrapper = shallow(<ModalHeading />)
    expect(wrapper.props().background).to.equal('brand')
    wrapper.setProps({ background: 'light-1'})
    expect(wrapper.props().background).to.equal('light-1')
  })

  it('should not render a CloseButton', function () {
    const wrapper = shallow(<ModalHeading />)
    expect(wrapper.find(CloseButton)).to.have.lengthOf(0)
  })

  describe('with a close function', function () {
    let closeButton
    let closeFnSpy

    before(function () {
      closeFnSpy = sinon.spy()
      const wrapper = shallow(<ModalHeading closeFn={closeFnSpy} />)
      closeButton = wrapper.find(CloseButton)
    })

    it('should render a CloseButton', function () {
      
      expect(closeButton).to.have.lengthOf(1)
    })

    it('should pass the closeFn callback to the close button', function () {
      expect(closeButton.prop('closeFn')).to.equal(closeFnSpy)
    })
  })

  describe('when there is a title', function () {
    let wrapper
    beforeEach(function () {
      wrapper = shallow(<ModalHeading closeFn={() => { }} title={title} />)
    })

    it('should render the title prop', function () {
      expect(wrapper.render().text()).to.equal(title)
    })

    it('should have no margins', function () {
      expect(wrapper.find(StyledHeading).props().margin).to.equal('none')
    })

    it('should render the title as an h2', function () {
      expect(wrapper.render().children().eq(0).is('h2')).to.be.true()
    })

    describe('with a color prop', function () {
      it('should set the heading text colour', function () {
        expect(wrapper.find(StyledHeading).props().color).to.equal('neutral-6')
        wrapper.setProps({ color: 'accent-1' })
        expect(wrapper.find(StyledHeading).props().color).to.equal('accent-1')
      })
      
      it('should set the close button colour', function () {
        expect(wrapper.find(CloseButton).props().color).to.equal('neutral-6')
        wrapper.setProps({ color: 'accent-1' })
        expect(wrapper.find(CloseButton).props().color).to.equal('accent-1')
      })
    })

    it('should justify the wrapper flex box by between', function () {
      expect(wrapper.props().justify).to.equal('between')
    })

    it('should set the wrapper flex box padding', function () {
      expect(wrapper.props().pad).to.deep.equal({ horizontal: 'medium', vertical: 'none' })
    })
  })

  describe('when there is not a title', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<ModalHeading closeFn={() => { }} />)
    })

    it('should not render an h2', function () {
      expect(wrapper.find(StyledHeading)).to.have.lengthOf(0)
    })

    it('should justify the wrapper flex box by end', function () {
      expect(wrapper.props().justify).to.equal('end')
    })

    it('should set the wrapper flex box padding', function () {
      expect(wrapper.props().pad).to.deep.equal({ horizontal: 'xsmall', vertical: 'none' })
    })
  })
})
