import { shallow } from 'enzyme'
import React from 'react'

import MessageFromResearcher from './MessageFromResearcher'
import { MessageFromResearcherContainer } from './MessageFromResearcherContainer'

const PROJECT = {
  avatar: {
    src: '/images/foo.jpg',
  },
  display_name: 'Test project',
  researcher_quote: 'This is a quote'
}

const PROJECT_WITH_NAMED_RESEARCHER = {
  ...PROJECT,
  configuration: {
    researcherID: '1'
  },
  owners: [{
    avatar_src: '/images/bar.jpg',
    id: '1',
    display_name: 'Researcher 1'
  }],
}

const PROJECT_WITHOUT_NAMED_RESEARCHER = {
  ...PROJECT,
  configuration: {
    researcherID: 'Test project'
  }
}

describe('Component > CompletionBarContainer', function () {
  it('should render without crashing', function () {
    const wrapper = (<MessageFromResearcherContainer project={PROJECT} />)
    expect(wrapper).to.be.ok()
  })

  describe('behaviour with named researcher', function () {
    let wrapper
    let wrappedComponent

    before(function () {
      wrapper = shallow(<MessageFromResearcherContainer project={PROJECT_WITH_NAMED_RESEARCHER} />)
      wrappedComponent = wrapper.find(MessageFromResearcher)
    })

    after(function () {
      wrapper = null
      wrappedComponent = null
    })

    it('should pass the correct props to the child component', function () {
      const passedProps = wrappedComponent.props()
      expect(passedProps.avatar).to.equal(PROJECT_WITH_NAMED_RESEARCHER.owners[0].avatar_src)
      expect(passedProps.researcher).to.equal(PROJECT_WITH_NAMED_RESEARCHER.owners[0].display_name)
      expect(passedProps.message).to.equal(PROJECT_WITH_NAMED_RESEARCHER.researcher_quote)
    })
  })

  describe('behaviour without a named researcher', function () {
    let wrapper
    let wrappedComponent

    before(function () {
      wrapper = shallow(<MessageFromResearcherContainer project={PROJECT_WITHOUT_NAMED_RESEARCHER} />)
      wrappedComponent = wrapper.find(MessageFromResearcher)
    })

    after(function () {
      wrapper = null
      wrappedComponent = null
    })

    it('should pass the correct props to the child component', function () {
      const passedProps = wrappedComponent.props()
      expect(passedProps.avatar).to.equal(PROJECT_WITHOUT_NAMED_RESEARCHER.avatar.src)
      expect(passedProps.researcher).to.equal(PROJECT_WITHOUT_NAMED_RESEARCHER.display_name)
      expect(passedProps.message).to.equal(PROJECT_WITHOUT_NAMED_RESEARCHER.researcher_quote)
    })
  })
})
