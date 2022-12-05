import { shallow } from 'enzyme'

import DefaultLayout from './DefaultLayout'

describe('Component > DefaultLayout', function () {
  it('should render without crashing', function () {
    shallow(<DefaultLayout />)
  })
})
