import { shallow } from 'enzyme'
import { Blank } from 'grommet-icons'
import TooltipIcon from './TooltipIcon'

describe('TranscribedLines > Component > TooltipIcon', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <TooltipIcon
        fill='blue'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the svg circle icon with the fill color', function () {
    expect(wrapper.find(Blank).props().color).to.equal('blue')
  })
})
