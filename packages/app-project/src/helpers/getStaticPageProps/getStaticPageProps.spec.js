import { expect } from 'chai'
import nock from 'nock'

import getStaticPageProps from './'

describe('Helpers > getStaticPageProps', function () {
  const PROJECT_SINGLE_ACTIVE_WORKFLOW = {
    id: '1',
    primary_language: 'en',
    researcher_quote: null,
    slug: 'test-owner/test-project-single-active-workflow',
    links: {
      active_workflows: ['1'],
      workflows: ['1', '2']
    }
  }

  const PROJECT_MULTIPLE_ACTIVE_WORKFLOWS = {
    id: '1',
    primary_language: 'en',
    researcher_quote: null,
    slug: 'test-owner/test-project-multiple-active-workflows',
    links: {
      active_workflows: ['1', '2'],
      workflows: ['1', '2']
    }
  }

  const GROUPED_PROJECT = {
    id: '2',
    primary_language: 'en',
    slug: 'test-owner/grouped-project',
    links: {
      active_workflows: ['2'],
      workflows: ['1', '2']
    }
  }

  const TRANSLATION = {
    translated_id: 1,
    strings: {
      display_name: 'Foo'
    }
  }

  const GROUPED_TRANSLATION = {
    translated_id: 2,
    strings: {
      display_name: 'Bar'
    }
  }

  const WORKFLOW = {
    id: '1',
    completeness: 0.4,
    configuration: {},
    grouped: false,
    prioritized: false,
    links: {
      subject_sets: ['1', '2', '3']
    }
  }

  const GROUPED_WORKFLOW = {
    id: '2',
    completeness: 0.4,
    configuration: {},
    grouped: true,
    prioritized: false,
    links: {
      subject_sets: ['1', '2', '3']
    }
  }

  function mockAPI(panoptesHost) {
    const scope = nock(panoptesHost)
      .persist()
      .get('/projects')
      .query(query => query.slug === 'test-owner/test-project-single-active-workflow')
      .reply(200, {
        projects: [PROJECT_SINGLE_ACTIVE_WORKFLOW]
      })
      .get('/projects')
      .query(query => query.slug === 'test-owner/test-project-multiple-active-workflows')
      .reply(200, {
        projects: [PROJECT_MULTIPLE_ACTIVE_WORKFLOWS]
      })
      .get('/projects')
      .query(query => query.slug === 'test-owner/grouped-project')
      .reply(200, {
        projects: [GROUPED_PROJECT]
      })
      .get('/projects')
      .query(query => query.slug === 'test-owner/test-wrong-project')
      .reply(200, {
        projects: []
      })
      .get('/translations')
      .query(query => {
        return query.translated_type === 'project'
        && query.translated_id === '1'
        && query.language === 'en'
      })
      .reply(200, {
        translations: [TRANSLATION]
      })
      .get('/translations')
      .query(query => {
        return query.translated_type === 'workflow'
        && query.translated_id === '1'
        && query.language === 'en'
      })
      .reply(200, {
        translations: [TRANSLATION]
      })
      .get('/translations')
      .query(query => {
        return query.translated_type === 'workflow'
        && query.translated_id === '2'
        && query.language === 'en'
      })
      .reply(200, {
        translations: [GROUPED_TRANSLATION]
      })
      .get('/translations')
      .query(query => {
        return query.translated_type === 'workflow'
        && query.translated_id === '1,2'
        && query.language === 'en'
      })
      .reply(200, {
        translations: [TRANSLATION, GROUPED_TRANSLATION]
      })
      .get('/workflows')
      .query(query => query.id === '1')
      .reply(200, {
        workflows: [WORKFLOW]
      })
      .get('/workflows')
      .query(query => query.id === '2')
      .reply(200, {
        workflows: [GROUPED_WORKFLOW]
      })
      .get('/workflows')
      .query(query => query.id === '1,2')
      .reply(200, {
        workflows: [WORKFLOW, GROUPED_WORKFLOW]
      })
      .get('/workflows')
      .query(query => parseInt(query.id) > 2)
      .reply(200, {
        workflows: []
      })
  }

  describe('with the staging API', function () {
    before(function () {
      mockAPI('https://panoptes-staging.zooniverse.org/api')
    })

    after(function () {
      nock.cleanAll()
    })

    describe('with a valid project slug, single active workflow', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-single-active-workflow'
        }
        const query = {
          env: 'staging'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return the project\'s active workflows', async function () {
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            configuration: {},
            grouped: false,
            prioritized: false,
            id: '1',
            displayName: 'Foo',
            links: {
              subject_sets: ['1', '2', '3']
            },
            subjectSets: []
          }
        ])
      })

      it('should return the workflowID as the single active workflow ID', function () {
        expect(props.workflowID).to.equal('1')
      })
    })

    describe('with a valid project slug, multiple active workflows', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-multiple-active-workflows'
        }
        const query = {
          env: 'staging'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return the project\'s active workflows', async function () {
        expect(props.workflows).to.have.lengthOf(2)
      })

      it('should return workflowID undefined', function () {
        expect(props.workflowID).to.be.undefined()
      })
    })

    describe('with an invalid project slug', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-wrong-project'
        }
        const query = {
          env: 'staging'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return notFound', function () {
        expect(props.notFound).to.be.true()
      })

      it('should return a project error message', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-single-active-workflow',
          workflowID: '3'
        }
        const query = {
          env: 'staging'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return notFound', function () {
        expect(props.notFound).to.be.true()
      })

      it('should return a workflow error message', function () {
        expect(props.title).to.equal('Workflow 3 was not found')
      })
    })
  })

  describe('with the production API', function () {
    before(function () {
      mockAPI('https://www.zooniverse.org/api')
    })

    after(function () {
      nock.cleanAll()
    })

    describe('with a valid project slug, single active workflow', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-single-active-workflow'
        }
        const query = {
          env: 'production'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return the project\'s active workflows', async function () {
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            configuration: {},
            grouped: false,
            prioritized: false,
            id: '1',
            displayName: 'Foo',
            links: {
              subject_sets: ['1', '2', '3']
            },
            subjectSets: []
          }
        ])
      })

      it('should return the workflowID as the single active workflow ID', function () {
        expect(props.workflowID).to.equal('1')
      })
    })

    describe('with a valid project slug, multiple active workflows', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-multiple-active-workflows'
        }
        const query = {
          env: 'production'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return the project\'s active workflows', async function () {
        expect(props.workflows).to.have.lengthOf(2)
      })

      it('should return workflowID undefined', function () {
        expect(props.workflowID).to.be.undefined()
      })
    })

    describe('with an invalid project slug', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-wrong-project'
        }
        const query = {
          env: 'production'
        }
        const req = {
          connection: {
            encrypted: true
          },
          headers: {
            host: 'www.zooniverse.org'
          }
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return notFound', function () {
        expect(props.notFound).to.be.true()
      })

      it('should return a project error message', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project-single-active-workflow',
          workflowID: '3'
        }
        const query = {
          env: 'production'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return notFound', function () {
        expect(props.notFound).to.be.true()
      })

      it('should return a workflow error message', function () {
        expect(props.title).to.equal('Workflow 3 was not found')
      })
    })
  })
})
