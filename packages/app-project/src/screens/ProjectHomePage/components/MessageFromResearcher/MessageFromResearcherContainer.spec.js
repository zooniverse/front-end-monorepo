import { shallow } from 'enzyme'
import React from 'react'

import MessageFromResearcher from './MessageFromResearcher'
import { MessageFromResearcherContainer } from './MessageFromResearcherContainer'

const PROJECT_WITH_NAMED_RESEARCHER = {
  avatar: {
    src: '/images/foo.jpg',
  },
  configuration: {
    researcherID: '1'
  },
  display_name: 'Test project',
  owners: [{
    avatar_src: '/images/bar.jpg',
    id: '1',
    display_name: 'Researcher 1'
  }],
  researcher_quote: 'This is a quote',
  slug: 'owner/slug'
}

const PROJECT_WITHOUT_NAMED_RESEARCHER = {
  ...PROJECT_WITH_NAMED_RESEARCHER,
  configuration: {
    researcherID: 'Test project'
  }
}

let wrapper
let wrappedComponent

describe('Component > CompletionBarContainer', function () {
  before(function () {
    wrapper = shallow(<MessageFromResearcherContainer project={PROJECT_WITH_NAMED_RESEARCHER} />)
    wrappedComponent = wrapper.find(MessageFromResearcher)
  })

  after(function () {
    wrapper = null
    wrappedComponent = null
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('behaviour without a quote', function () {
    it('should pass a link to the project talk board', function () {
      const passedProps = wrappedComponent.props()
      expect(passedProps.talkLink).to.equal(`/projects/${PROJECT_WITH_NAMED_RESEARCHER.slug}/talk`)
    })
  })

  describe('behaviour with named researcher', function () {
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
