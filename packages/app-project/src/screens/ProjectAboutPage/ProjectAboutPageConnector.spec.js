import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import ProjectAboutPage from './ProjectAboutPage'

describe('Component > ProjectAboutPageConnector', () => {
  let wrapper
  let useContextStub

  describe('About pages with content', () => {
    before(function () {
      useContextStub = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          store: {
            project: {
              about_pages: [
                {
                  id: '1234',
                  title: 'Title',
                  url_key: 'science_case',
                  content: 'This is some content.'
                }
              ],
              inBeta: false
            }
          }
        }
      })
      wrapper = shallow(<ProjectAboutPageConnector pageType="science_case" />)
    })

    it('should render without crashing', () => {
      expect(wrapper).to.be.ok()
    })

    it('should pass correct data to ProjectAboutPage depending on pageType', () => {
      const aboutPage = wrapper.find(ProjectAboutPage)
      const aboutProps = aboutPage.prop('aboutPageData')
      expect(aboutProps.url_key).to.equal('science_case')
      expect(aboutProps.title).to.equal('Title')
    })

    after(() => {
      useContextStub.restore()
    })
  })

  describe('About pages without content', () => {
    before(function () {
      useContextStub = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          store: {
            project: {
              about_pages: [
                {
                  id: '1234',
                  title: 'Research',
                  url_key: 'science_case',
                  content: 'This is some content'
                },
                {
                  id: '1234',
                  title: 'Results',
                  url_key: 'results',
                  content: 'Some results.'
                }
              ],
              inBeta: false
            }
          }
        }
      })
      wrapper = shallow(<ProjectAboutPageConnector pageType="team" />)
    })

    it('should pass default content if a page doesnt exist yet', () => {
      const aboutPage = wrapper.find(ProjectAboutPage)
      const aboutProps = aboutPage.prop('aboutPageData')
      expect(aboutProps.title).to.equal('team')
      expect(aboutProps.content).to.equal('No content yet.')
    })

    it('should pass a default navLinks array that always includes Research and Team pages', () => {
      const aboutPage = wrapper.find(ProjectAboutPage)
      const aboutNavLinks = aboutPage.prop('aboutNavLinks')
      expect(aboutNavLinks).to.include('research')
      expect(aboutNavLinks).to.include('team')
    })

    it('should pass a navLink if an about page has content', () => {
      const aboutPage = wrapper.find(ProjectAboutPage)
      const aboutNavLinks = aboutPage.prop('aboutNavLinks')
      expect(aboutNavLinks).to.include('results')
    })

    it('should not pass a navLink for a page without content (excluding Research & Team)', () => {
      const aboutPage = wrapper.find(ProjectAboutPage)
      const aboutNavLinks = aboutPage.prop('aboutNavLinks')
      expect(aboutNavLinks).not.to.include('education')
      expect(aboutNavLinks).not.to.include('faq')
    })

    after(() => {
      useContextStub.restore()
    })
  })
})
