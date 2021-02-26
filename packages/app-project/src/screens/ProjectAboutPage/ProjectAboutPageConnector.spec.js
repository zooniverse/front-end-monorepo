import { shallow } from 'enzyme'
import React from 'react'

import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import ProjectAboutPage from './ProjectAboutPage'

describe('Component > ProjectAboutPageConnector', function () {
  let wrapper
  const testStore = {
    store: {
      project: {
        about_pages: [ { id: '1234', title: 'Title', url_key: 'science_case' } ],
        inBeta: false
      }
    }
  }
  before(function () {
    wrapper = shallow(<ProjectAboutPageConnector testStore={testStore} pageType='science_case' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass correct data to ProjectAboutPage depending on pageType', function () {
    const aboutPage = wrapper.find(ProjectAboutPage)
    const aboutProps = aboutPage.prop('aboutPageData')
    expect(aboutProps.url_key).to.equal('science_case')
  })
})
