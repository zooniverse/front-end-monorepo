import { shallow } from 'enzyme'

import Classify from './Classify'

describe('Page > Classify', function () {
  it('should render without crashing', function () {
    shallow(<Classify />)
  })
})
