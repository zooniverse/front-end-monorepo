import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { FieldGuideButton, ButtonLabel, StyledButton } from './FieldGuideButton'
import { FieldGuideFactory, FieldGuideMediumFactory } from '@test/factories'

describe('Component > FieldGuideButton', function () {
  const medium = FieldGuideMediumFactory.build()
  const items = [
    {
      title: 'Cat',
      icon: medium.id,
      content: 'lorem ipsum'
    },
    {
      title: 'Dog',
      content: 'Foo bar'
    },
    { title: 'Iguana', content: 'hello' },
    { title: 'Koala', content: '' },
    { title: 'Dragon', content: 'Why is this here?' }
  ]
  const fieldGuide = FieldGuideFactory.build({ items })
  const fieldGuideWithoutItems = FieldGuideFactory.build()

  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideButton
        fieldGuide={fieldGuide}
        onClick={() => {}}
        theme={zooTheme}
      />)
    expect(wrapper).to.be.ok()
  })

  it('should disable the button if there isn\'t a field guide', function () {
    const wrapper = shallow(
      <FieldGuideButton
        onClick={() => { }}
        theme={zooTheme}
      />)

    expect(wrapper.props().disabled).to.be.true()
  })

  it('should disable the button if the field guide doesn\'t have items', function () {
    const wrapper = shallow(
      <FieldGuideButton
        fieldGuide={fieldGuideWithoutItems}
        onClick={() => { }}
        theme={zooTheme}
      />)
    expect(wrapper.props().disabled).to.be.true()
  })

  it('should enable the button if the field guide has items', function () {
    const wrapper = shallow(
      <FieldGuideButton
        fieldGuide={fieldGuide}
        onClick={() => { }}
        theme={zooTheme}
      />)
    expect(wrapper.props().disabled).to.be.false()
  })

  it('should render a ButtonLabel for the label', function () {
    const wrapper = shallow(
      <FieldGuideButton
        fieldGuide={fieldGuide}
        onClick={() => { }}
        theme={zooTheme}
      />)

    expect(wrapper.props().label.type).to.equal(ButtonLabel)
  })

  it('should call onOpen on click', function () {
    const onClickSpy = sinon.spy()
    const wrapper = mount(
      <FieldGuideButton
        fieldGuide={fieldGuide}
        onClick={onClickSpy}
        theme={zooTheme}
      />)

    wrapper.find(StyledButton).simulate('click')
    expect(onClickSpy).to.have.been.calledOnce()
  })

  describe('Component > ButtonLabel', function () {
    it('should render without crashing', function () {
      const wrapper = shallow(<ButtonLabel />)
      expect(wrapper).to.be.ok()
    })
  })
})
