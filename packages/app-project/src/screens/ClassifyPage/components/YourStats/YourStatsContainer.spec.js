import { shallow } from 'enzyme'
import { YourStatsContainer } from './YourStatsContainer'
import YourStats from './YourStats'

describe('Component > YourStatsContainer', function () {
  let wrapper
  let componentWrapper

  const stores = {
    store: {
      project: {
        display_name: 'Test Project'
      },
      user: {
        personalization: {
          counts: 10
        }
      }
    }
  }

  before(function () {
    wrapper = shallow(<YourStatsContainer stores={stores} />)
    componentWrapper = wrapper.find(YourStats)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `YourStats` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `projectName` prop', function () {
    expect(componentWrapper.prop('projectName')).to.equal('Test Project')
  })

  it('should pass down the `counts` prop', function () {
    expect(componentWrapper.prop('counts')).to.equal(10)
  })
})
