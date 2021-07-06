import { shallow } from 'enzyme'
import MainGrid from './MainGrid'

describe('Component > MainGrid', function () {
  it('should render without crashing', function () {
    shallow(<MainGrid />)
  })
})
