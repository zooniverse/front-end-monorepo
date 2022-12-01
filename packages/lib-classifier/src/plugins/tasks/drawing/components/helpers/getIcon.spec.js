import { shallow } from 'enzyme'
import { Point, Line } from '../icons'

describe('Drawing Task > getIcon ', function () {
  it('should render an icon without crashing', function () {
    const PointIcon = Point
    shallow(<PointIcon />)
  })

  it('should render the requested drawing task icon', function () {
    const LineIcon = Line
    const wrapper = shallow(<LineIcon />)
    expect(wrapper.containsMatchingElement(
      <line x1='25' y1='90' x2='75' y2='10' />
    )).to.be.true()
  })
})
