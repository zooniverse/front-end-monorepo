import { shallow } from 'enzyme'

import mockStore from '@test/mockStore'
import Layout from './Layout'

describe('Component > Layout', function () {
  it('should render without crashing', function () {
    shallow(<Layout store={mockStore()} />)
  })
})
