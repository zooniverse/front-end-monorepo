import { shallow } from 'enzyme'

import Public from './Public'

describe('Page > Public', function () {
  it('should render without crashing', function () {
    shallow(<Public />)
  })
})
