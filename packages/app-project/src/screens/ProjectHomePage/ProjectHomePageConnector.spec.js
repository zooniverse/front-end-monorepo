import { shallow } from 'enzyme'

import ProjectHomePageConnector from './ProjectHomePageConnector'
import ProjectHomePage from './ProjectHomePage'

describe('Component > ProjectHomePageConnector', function () {
  describe('with a project not in beta', function () {
    let wrapper
    const mockStore = {
      project: {
        inBeta: false
      }
    }

    before(function () {
      wrapper = shallow(<ProjectHomePageConnector mockStore={mockStore} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should pass beta status to the home page', function () {
      const homePage = wrapper.find(ProjectHomePage)
      expect(homePage.prop('inBeta')).to.be.false()
    })
  })

  describe('with a project in beta', function () {
    let wrapper
    const store = {
      project: {
        inBeta: true
      }
    }

    before(function () {
      wrapper = shallow(<ProjectHomePageConnector store={store} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should pass beta status to the home page', function () {
      const homePage = wrapper.find(ProjectHomePage)
      expect(homePage.prop('inBeta')).to.be.true()
    })
  })
})