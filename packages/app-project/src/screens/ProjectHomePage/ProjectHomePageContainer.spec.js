import { shallow } from 'enzyme'
import React from 'react'

import ProjectHomePageContainer from './ProjectHomePageContainer'
import ProjectHomePage from './ProjectHomePage'

describe('Component > ProjectHomePageContainer', function () {
  describe('with a project not in beta', function () {
    let wrapper
    const stores = {
      store: {
        project: {
          inBeta: false
        }
      }
    }

    before(function () {
      wrapper = shallow(<ProjectHomePageContainer stores={stores} />)
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
    const stores = {
      store: {
        project: {
          inBeta: true
        }
      }
    }

    before(function () {
      wrapper = shallow(<ProjectHomePageContainer stores={stores} />)
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