import { shallow } from 'enzyme'

import About from './About'

describe('Page > About', function () {
  it('should render without crashing', function () {
    shallow(<About />)
  })
})
