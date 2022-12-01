import { shallow } from 'enzyme'
import sinon from 'sinon'
import withLayer from './withLayer'
import { Modal } from '../../Modal'

const title = 'Modal Heading'

const content = (
  <p>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </p>
)

describe('HOC > withLayer', function () {
  it('should render without crashing', function () {
    const WithLayer = withLayer(Modal)
    const wrapper = shallow(
      <WithLayer title={title}>{content}</WithLayer>
    )
    expect(wrapper).to.be.ok()
  })

  it('should render null if active is false', function () {
    const WithLayer = withLayer(Modal)
    const wrapper = shallow(
      <WithLayer title={title}>{content}</WithLayer>
    )
    expect(wrapper.html()).to.be.null()
  })

  it('should render the wrapped component if active if true', function () {
    const WithLayer = withLayer(Modal)
    const wrapper = shallow(
      <WithLayer active title={title}>{content}</WithLayer>
    )
    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  it('should set the Layer props', function () {
    const closeFn = sinon.spy()
    const WithLayer = withLayer(Modal)
    const wrapper = shallow(
      <WithLayer active title={title}>{content}</WithLayer>
    )
    let layerProps = wrapper.props()
    expect(layerProps.animate).to.be.false()
    expect(layerProps.modal).to.be.true()
    expect(layerProps.plain).to.be.false()
    expect(layerProps.position).to.equal('center')
    expect(layerProps.onClickOutside).to.be.undefined()
    expect(layerProps.onEsc).to.be.undefined()
    expect(layerProps.className).to.be.empty()
    wrapper.setProps({ animate: true, className: 'class', modal: false, plain: true, position: 'top-left', closeFn })
    layerProps = wrapper.props()
    expect(layerProps.animate).to.be.true()
    expect(layerProps.modal).to.be.false()
    expect(layerProps.plain).to.be.true()
    expect(layerProps.position).to.equal('top-left')
    expect(layerProps.onClickOutside).to.equal(closeFn)
    expect(layerProps.onEsc).to.equal(closeFn)
    expect(layerProps.className).to.equal('class')
  })

  it('should pass along other props to the wrapped component', function () {
    const closeFn = sinon.spy()
    const WithLayer = withLayer(Modal)
    const wrapper = shallow(
      <WithLayer active foo='bar' title={title}>{content}</WithLayer>
    )
    expect(wrapper.find(Modal).props().foo).to.equal('bar')
  })
})