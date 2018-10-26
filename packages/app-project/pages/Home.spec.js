import { shallow } from 'enzyme'

import Home from './Home'

describe('Page > Home', function () {
  it('should render without crashing', function () {
    shallow(<Home />)
  })
})
