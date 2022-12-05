import { shallow } from 'enzyme'

import TooltipText from './TooltipText'

let wrapper

describe('Component > TooltipText', function () {
  before(function () {
    wrapper = shallow(<TooltipText />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
