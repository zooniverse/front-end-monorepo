import nock from 'nock'

import getDefaultPageProps from './'

describe('Components > ProjectHomePage > getDefaultPageProps', function () {
  const PROJECT = {
    id: '1',
    default_workflow: '1',
    primary_language: 'en',
    slug: 'test-owner/test-project',
    links: {
      active_workflows: ['1']
    }
  }

  const TRANSLATION = {
    translated_id: 1,
    strings: {
      display_name: 'Foo'
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

  function subjectSet(id) {
    return {
      id,
      display_name: `test set ${id}`,
      set_member_subjects_count: 10
    }
  }

  describe('with the staging API', function () {
    before(function () {
      const slug = 'test-owner/test-project'
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .persist()
        .get('/projects')
        .query(query => query.slug === slug)
        .reply(200, {
          projects: [PROJECT]
        })
        .get('/projects')
        .query(query => query.slug !== slug)
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
        .get('/workflows')
        .query(query => query.id === '1')
        .reply(200, {
          workflows: [WORKFLOW],
          linked: {
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })
        .get('/workflows')
        .query(query => query.id !== '1')
        .reply(200, {
          workflows: []
        })
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
        const req = {
          connection: {
            encrypted: true
          },
          headers: {
            host: 'www.zooniverse.org'
          }
        }
        const res = {}
        const { props } = await getDefaultPageProps({ params, query, req, res })
        expect(props.workflows).to.deep.equal([
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
        ])
      })
    })

    describe('with an invalid project slug', function () {
      let props
      let res = {}

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-wrong-project'
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
        const response = await getDefaultPageProps({ params, query, req, res })
        props = response.props
      })

      it('should return a 404 response', function () {
        expect(res.statusCode).to.equal(404)
      })

      it('should pass the status code to the error page', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should pass an error message to the error page', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let props
      let res = {}

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project',
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
        const response = await getDefaultPageProps({ params, query, req, res })
        props = response.props
      })

      it('should return a 404 response', function () {
        expect(res.statusCode).to.equal(404)
      })

      it('should pass the status code to the error page', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should pass an error message to the error page', function () {
        expect(props.title).to.equal('Workflow 2 was not found')
      })
    })
  })

  describe('with the production API', function () {
    before(function () {
      const slug = 'test-owner/test-project'
      const scope = nock('https://www.zooniverse.org/api')
        .persist()
        .get('/projects')
        .query(query => query.slug === slug)
        .reply(200, {
          projects: [PROJECT]
        })
        .get('/projects')
        .query(query => query.slug !== slug)
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
        .get('/workflows')
        .query(query => query.id === '1')
        .reply(200, {
          workflows: [WORKFLOW],
          linked: {
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })
        .get('/workflows')
        .query(query => query.id !== '1')
        .reply(200, {
          workflows: []
        })
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
        const req = {
          connection: {
            encrypted: true
          },
          headers: {
            host: 'www.zooniverse.org'
          }
        }
        const res = {}
        const { props } = await getDefaultPageProps({ params, query, req, res })
        expect(props.workflows).to.deep.equal([
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
        ])
      })
    })

    describe('with an invalid project slug', function () {
      let props
      let res = {}

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
        const response = await getDefaultPageProps({ params, query, req, res })
        props = response.props
      })

      it('should return a 404 response', function () {
        expect(res.statusCode).to.equal(404)
      })

      it('should pass the status code to the error page', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should pass an error message to the error page', function () {
        expect(props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let props
      let res = {}

      before(async function () {
        const params = {
          owner: 'test-owner',
          project: 'test-project',
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
        const response = await getDefaultPageProps({ params, query, req, res })
        props = response.props
      })

      it('should return a 404 response', function () {
        expect(res.statusCode).to.equal(404)
      })

      it('should pass the status code to the error page', function () {
        expect(props.statusCode).to.equal(404)
      })

      it('should pass an error message to the error page', function () {
        expect(props.title).to.equal('Workflow 2 was not found')
      })
    })
  })
})