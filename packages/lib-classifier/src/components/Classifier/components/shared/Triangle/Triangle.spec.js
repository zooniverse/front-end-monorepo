import { shallow } from 'enzyme'

import Triangle from './Triangle'

let wrapper

describe('Component > Triangle', function () {
  before(function () {
    wrapper = shallow(<Triangle />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
