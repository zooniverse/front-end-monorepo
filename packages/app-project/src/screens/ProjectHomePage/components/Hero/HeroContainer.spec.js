import { shallow } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'

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

describe('Component > HeroContainer', function () {
  describe('general behaviour', function () {
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

  describe('loading state', function () {
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
    let fetchWorkflowsSpy

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
      fetchWorkflowsSpy = sinon.spy(HeroContainer.prototype, 'fetchWorkflows')
    })

    after(function () {
      nock.cleanAll()
      fetchWorkflowsSpy.restore()
    })

    it('should pass down the correct props', async function () {
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
      await fetchWorkflowsSpy.returnValues[0]
      componentWrapper = wrapper.find(Hero)
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'success',
        data: [
          { completeness: 0.4, default: true, id: '1', displayName: 'Foo' },
        ]
      })
    })
  })

  describe('error state', function () {
    let scope
    let wrapper
    let componentWrapper
    let fetchWorkflowsSpy

    before(function () {
      scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .replyWithError('something awful happened')
      fetchWorkflowsSpy = sinon.spy(HeroContainer.prototype, 'fetchWorkflows')
    })

    after(function () {
      nock.cleanAll()
      fetchWorkflowsSpy.restore()
    })

    it('should pass down the correct props', async function () {
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
      await fetchWorkflowsSpy.returnValues[0]
      componentWrapper = wrapper.find(Hero)
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'error',
        data: []
      })
    })
  })
})
