import { shallow } from 'enzyme'
import zooTheme from '@zooniverse/grommet-theme'
import { Triangle, SVG } from './Triangle'

describe('Component > Triangle', function () {
  let wrapper
  beforeEach(function () {
    wrapper = shallow(<Triangle theme={zooTheme} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the wrapper Box with the expected props', function () {
    let props = wrapper.props()
    expect(props.justify).to.equal('center')
    expect(props.pad).to.deep.equal({ horizontal: 'small' })
    wrapper.setProps({ justify: 'end', pad: 'none' })
    props = wrapper.props()
    expect(props.justify).to.equal('end')
    expect(props.pad).to.equal('none')
  })

  it('should render the SVG with a fill color', function () {
    expect(wrapper.find(SVG).props().fill).to.equal(zooTheme.global.colors['dark-2'])
    wrapper.setProps({ theme: Object.assign({}, zooTheme, { dark: true })})
    expect(wrapper.find(SVG).props().fill).equal(zooTheme.global.colors['neutral-6'])
    wrapper.setProps({ color: 'blue' })
    expect(wrapper.find(SVG).props().fill).equal('blue')
  })

  it('should render the SVG at a certain width and height', function () {
    let props = wrapper.find(SVG).props()
    expect(props.width).to.equal(20)
    expect(props.height).to.equal(20)
    wrapper.setProps({ width: 10, height: 10 })
    props = wrapper.find(SVG).props()
    expect(props.width).to.equal(10)
    expect(props.height).to.equal(10)
  })

  it('should set the rotation degrees based on the pointDirection prop', function () {
    let rotation = wrapper.find(SVG).props().rotation
    expect(rotation).to.equal('0deg')
    wrapper.setProps({ pointDirection: 'down' })
    rotation = wrapper.find(SVG).props().rotation
    expect(rotation).to.equal('180deg')
    wrapper.setProps({ pointDirection: 'left' })
    rotation = wrapper.find(SVG).props().rotation
    expect(rotation).to.equal('-90deg')
    wrapper.setProps({ pointDirection: 'right' })
    rotation = wrapper.find(SVG).props().rotation
    expect(rotation).to.equal('90deg')
  })
})
