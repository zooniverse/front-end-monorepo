import { shallow } from 'enzyme'
import React from 'react'

import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import ProjectAboutPage from './ProjectAboutPage'

describe('Component > ProjectAboutPageConnector', function () {
  let wrapper
  const stores = {
    store: {
      project: {
        about_pages: [ { title: 'Title', url_key: 'science_case' } ]
      }
    }
  }
  before(function () {
    wrapper = shallow(<ProjectAboutPageConnector stores={stores} pageType='science_case' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  xit('should pass correct page data to ProjectAboutPage depending on url_key', function () {
    const aboutPage = wrapper.find(ProjectAboutPage)
    console.log(aboutPage.prop('aboutPageData'))
  })
})
