import { shallow } from 'enzyme'
import CompletionBar from './CompletionBar'

describe('Component > CompletionBar', function () {
  it('should render without crashing', function () {
    shallow(<CompletionBar />)
  })
})
