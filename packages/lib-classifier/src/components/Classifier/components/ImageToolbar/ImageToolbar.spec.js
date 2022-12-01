import { shallow } from 'enzyme'

import ImageToolbar from './ImageToolbar'

describe('Component > ImageToolbar', function () {
  it('should render without crashing', function () {
    shallow(<ImageToolbar />)
  })
})
