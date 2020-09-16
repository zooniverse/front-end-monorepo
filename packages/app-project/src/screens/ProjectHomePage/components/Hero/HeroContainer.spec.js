import { shallow } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'

import { HeroContainer } from './HeroContainer'
import NarrowLayout from './components/NarrowLayout'
import WideLayout from './components/WideLayout'

const WORKFLOWS = [
  {
    id: '1',
    completeness: 0.4,
    grouped: false,
    links: {
      subject_sets: ['1', '2', '3']
    }
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

function subjectSet(id) {
  return {
    id,
    display_name: `test set ${id}`,
    set_member_subjects_count: 10
  }
}

describe('Component > HeroContainer', function () {
  describe('general behaviour', function () {
    let scope
    let wrapper

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
          workflows: WORKFLOWS,
          linked: { 
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `NarrowLayout` by default', function () {
      expect(wrapper.find(NarrowLayout)).to.have.lengthOf(1)
    })

    it('should render the `WideLayout` with the appropriate prop', function () {
      wrapper.setProps({ isWide: true })
      expect(wrapper.find(WideLayout)).to.have.lengthOf(1)
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
          workflows: WORKFLOWS,
          linked: { 
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should pass down the correct props', function () {
      wrapper = shallow(<HeroContainer activeWorkflows={['1']} />)
      componentWrapper = wrapper.first()
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
          workflows: WORKFLOWS,
          linked: { 
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
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
      componentWrapper = wrapper.first()
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'success',
        data: [
          {
            completeness: 0.4,
            default: true,
            grouped: false,
            id: '1',
            displayName: 'Foo',
            subjectSets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
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
      componentWrapper = wrapper.first()
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'error',
        data: []
      })
    })
  })
})
