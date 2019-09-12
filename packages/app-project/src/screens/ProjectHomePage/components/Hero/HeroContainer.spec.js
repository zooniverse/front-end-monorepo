import { shallow } from 'enzyme'
import nock from 'nock'
import React from 'react'

import { HeroContainer } from './HeroContainer'
import Hero from './Hero'

const WORKFLOWS = [
  {
    id: '1',
    completeness: 0.4
  }
]

// `translated_id` is a number because of a bug in the translations API :(
const TRANSLATIONS = [
  {
    translated_id: 1,
    strings: {
      display_name: 'Foo'
    }
  }
]

describe.only('Component > HeroContainer', function () {
  xdescribe('general behaviour', function () {
    let scope
    let wrapper
    let componentWrapper

    before(function () {
      scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
      componentWrapper = wrapper.find(Hero)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `Hero` component', function () {
      expect(componentWrapper).to.have.lengthOf(1)
    })
  })

  xdescribe('loading state', function () {
    let scope
    let wrapper
    let componentWrapper

    before(function () {
      scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should pass down the correct props', function () {
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
      componentWrapper = wrapper.find(Hero)
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'loading',
        data: []
      })
    })
  })

  describe('success state', function () {
    let scope
    let wrapper
    let componentWrapper

    before(function () {
      scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should pass down the correct props', function () {
      // how to make sure we're that the `fetchWorkflows` method has finished?
    })
  })
})
