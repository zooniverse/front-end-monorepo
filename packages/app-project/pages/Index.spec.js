import { shallow } from 'enzyme'

import Index from './Index'

describe('Page > Index', function () {
  it('should render without crashing', function () {
    shallow(<Index />)
  })
})
