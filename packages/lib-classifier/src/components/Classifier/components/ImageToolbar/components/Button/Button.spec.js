import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Button from './Button'

describe('ImageToolbar > Component > Button', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Button />, { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } })
    expect(wrapper).to.be.ok()
  })

  it('should call the onBlur prop function on blur', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button onBlur={spy} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )

    wrapper.find('button').simulate('blur')
    expect(spy).to.have.been.called()
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button onClick={spy} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )

    wrapper.find('button').simulate('click')
    expect(spy).to.have.been.called()
  })

  it('should call the onFocus prop function on focus', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button onFocus={spy} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )

    wrapper.find('button').simulate('focus')
    expect(spy).to.have.been.called()
  })

  it('should call the onMouseOver prop function on mouse over', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button onMouseOver={spy} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )

    wrapper.find('button').simulate('mouseover')
    expect(spy).to.have.been.called()
  })

  it('should call the onMouseOut prop function on mouse out', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button onMouseOut={spy} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )

    wrapper.find('button').simulate('mouseout')
    expect(spy).to.have.been.called()
  })

  it('should add an `aria-label` from the `a11yTitle` prop', function () {
    const A11Y_TITLE = 'Foobar'
    const wrapper = mount(
      <Button a11yTitle={A11Y_TITLE} />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
    )
    expect(wrapper.find('button').prop('aria-label')).to.equal(A11Y_TITLE)
  })
})
