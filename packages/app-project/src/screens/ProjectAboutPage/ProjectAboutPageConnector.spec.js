import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import ProjectAboutPage from './ProjectAboutPage'

describe('Component > ProjectAboutPageConnector', function () {
  let wrapper
  let useContextStub
  before(function () {
    useContextStub = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        store: {
          project: {
            about_pages: [
              { id: '1234', title: 'Title', url_key: 'science_case' }
            ],
            inBeta: false
          }
        }
      }
    })
    wrapper = shallow(<ProjectAboutPageConnector pageType='science_case' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass correct data to ProjectAboutPage depending on pageType', function () {
    const aboutPage = wrapper.find(ProjectAboutPage)
    const aboutProps = aboutPage.prop('aboutPageData')
    expect(aboutProps.url_key).to.equal('science_case')
  })

  after(function () {
    useContextStub.restore()
  })
})
