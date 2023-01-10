import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Tooltip from './Tooltip'
import { Button } from 'grommet'

describe('Component > Tooltip', function () {
  beforeEach(function () {
    render(
      <Tooltip label='Click this button to open the help menu'>
        <Button label='Help Menu' onClick={() => { console.log('BEEP BOOP') }} />
      </Tooltip>
    )
  })

  it('should render without crashing', function () {
    expect(screen).to.be.ok()
  })

  it('should show the button without a tooltip by default', function () {
    expect(screen.queryByText('Help Menu')).to.exist()
    expect(screen.queryByText('Click this button to open the help menu')).to.not.exist()
  })
})

/*
describe('Component > Tooltip', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <Tooltip label='helpful tip'>
        <Button label='Click Me' onClick={() => {}} />
      </Tooltip>
    )
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the child component', function () {
    expect(wrapper.find(Button)).to.have.lengthOf(1)
  })

  it('should pass props to the Tippy component', function () {
    let props = wrapper.props()
    let renderedLabel = wrapper.renderProp('render')()
    expect(renderedLabel.props().label).to.equal('helpful tip')
    expect(renderedLabel.props().arrow).to.be.true()
    expect(renderedLabel.props().animation).to.deep.equal({ type: 'fadeIn', duration: 500 })
    expect(props.placement).to.equal('top')
    expect(props.trigger).to.equal('mouseenter focus')
    wrapper.setProps({ animation: 'zoomIn', arrow: false, label: 'a new label', placement: 'bottom', trigger: 'focus' })
    props = wrapper.props()
    renderedLabel = wrapper.renderProp('render')()
    expect(renderedLabel.props().label).to.equal('a new label')
    expect(renderedLabel.props().arrow).to.be.false()
    expect(renderedLabel.props().animation).to.equal('zoomIn')
    expect(props.placement).to.equal('bottom')
    expect(props.trigger).to.equal('focus')
  })
})
*/
