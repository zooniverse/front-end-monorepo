import { shallow } from 'enzyme'

import WidgetHeading from './WidgetHeading'

let wrapper
const LEVEL = '2'
const TEXT = 'Foobar'

describe('Component > WidgetHeading', function () {
  before(function () {
    wrapper = shallow(<WidgetHeading level={LEVEL}>{TEXT}</WidgetHeading>)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should include the text from the `text` prop', function () {
    expect(wrapper.render().html()).to.include(TEXT)
  })

  it('should pass down the `level` prop to the `Heading` component', function () {
    expect(wrapper.prop('level')).to.equal(LEVEL)
  })
})
