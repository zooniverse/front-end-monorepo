import nock from 'nock'

import getStaticPageProps from './'

describe('Helpers > getStaticPageProps', function () {
  const PROJECT = {
    id: '1',
    default_workflow: '1',
    primary_language: 'en',
    researcher_quote: null,
    slug: 'test-owner/test-project',
    links: {
      active_workflows: ['1']
    }
  }

  const GROUPED_PROJECT = {
    id: '2',
    default_workflow: '2',
    primary_language: 'en',
    slug: 'test-owner/grouped-project',
    links: {
      active_workflows: ['2']
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
    grouped: false,
    links: {
      subject_sets: ['1', '2', '3']
    }
  }

  const GROUPED_WORKFLOW = {
    id: '2',
    completeness: 0.4,
    grouped: true,
    links: {
      subject_sets: ['1', '2', '3']
    }
  }

  const availableSubjects = {
      1: 4,
      2: 10,
      3: 10
  }

  function subjectSet(id) {
    return {
      id,
      display_name: `test set ${id}`,
      set_member_subjects_count: 10,
      subjects: mockSetSubjects
    }
  }

  const mockSetSubjects = [
    {
      "id":"47696316",
      "metadata":{"Filename":"ultraman-x.png"},
      "locations":[
        {"image/png":"https://panoptes-uploads.zooniverse.org/production/subject_location/78964ce7-72db-4607-b493-63626738cf4e.png"}
      ],
      "zooniverse_id":null,
      "external_id":null,
      "created_at":"2020-07-09T20:47:07.128Z",
      "updated_at":"2020-07-09T20:47:07.128Z",
      "href":"/subjects/47696316",
      "links":{"project":"12754","collections":[],"subject_sets":["85771"],"set_member_subjects":["80512512"]}}
  ]

  function mockAPI(panoptesHost) {
    const cellect = nock('https://cellect.zooniverse.org')
    .persist()
    .get('/workflows/2/status')
    .reply(200, {
      groups: availableSubjects
    })
    const scope = nock(panoptesHost)
      .persist()
      .get('/projects')
      .query(query => query.slug === 'test-owner/test-project')
      .reply(200, {
        projects: [PROJECT]
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
      .get('/subject_sets')
      .query(query => query.id === '1,2,3')
      .reply(200, {
        subject_sets: [
          subjectSet('1'),
          subjectSet('2'),
          subjectSet('3')
        ]
      })
      .get('/set_member_subjects')
      .query(query => query.include === 'subject')
      .reply(200, {
        linked: {
          subjects: mockSetSubjects
        }
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

    describe('with a valid project slug', function () {
      it('should return the project\'s active workflows', async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project'
        }
        const query = {
          env: 'staging'
        }
        const { props } = await getStaticPageProps({ params, query })
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            default: true,
            grouped: false,
            id: '1',
            displayName: 'Foo',
            subjectSets: []
          }
        ])
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

      it('should return a 404 status code', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should return a project error message', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with a grouped workflow', function () {
      it('should return the project\'s active workflows with subject sets', async function () {
        const params = {
          owner: 'test-owner',
          project: 'grouped-project',
          workflowID: '2'
        }
        const query = {
          env: 'staging'
        }
        const req = {
          connection: {
            encrypted: true
          },
          headers: {
            host: 'www.zooniverse.org'
          }
        }
        const res = {}
        const { props } = await getStaticPageProps({ params, query })
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            default: true,
            grouped: true,
            id: '2',
            displayName: 'Bar',
            subjectSets: [
              Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
              Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
              Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
            ]
          }
        ])
      })
    })

    describe('with an invalid workflow ID', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project',
          workflowID: '3'
        }
        const query = {
          env: 'staging'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return a 404 status code', function () {
        expect(props.statusCode).to.equal(404)
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

    describe('with a valid project slug', function () {
      it('should return the project\'s active workflows', async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project'
        }
        const query = {
          env: 'production'
        }
        const { props } = await getStaticPageProps({ params, query })
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            default: true,
            grouped: false,
            id: '1',
            displayName: 'Foo',
            subjectSets: []
          }
        ])
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

      it('should return a 404 status code', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should return a project error message', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with a grouped workflow', function () {
      it('should return the project\'s active workflows with subject sets', async function () {
        const params = {
          owner: 'test-owner',
          project: 'grouped-project',
          workflowID: '2'
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
        const res = {}
        const { props } = await getStaticPageProps({ params, query })
        expect(props.workflows).to.deep.equal([
          {
            completeness: 0.4,
            default: true,
            grouped: true,
            id: '2',
            displayName: 'Bar',
            subjectSets: [
              Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
              Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
              Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
            ]
          }
        ])
      })
    })

    describe('with an invalid workflow ID', function () {
      let props

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project',
          workflowID: '2'
        }
        const query = {
          env: 'production'
        }
        const response = await getStaticPageProps({ params, query })
        props = response.props
      })

      it('should return a 404 status code', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should return a workflow error message', function () {
        expect(props.title).to.equal('Workflow 2 was not found')
      })
    })
  })
})