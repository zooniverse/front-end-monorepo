import nock from 'nock'

import getDefaultPageProps from './'

describe('Helpers > getDefaultPageProps', function () {
  const PROJECT = {
    id: '1',
    default_workflow: '1',
    primary_language: 'en',
    slug: 'test-owner/test-project',
    links: {
      active_workflows: ['1'],
      workflows: ['1', '2']
    }
  }

  const GROUPED_PROJECT = {
    id: '2',
    default_workflow: '2',
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

  function mockAPI(panoptesHost, options) {
    const scope = nock(panoptesHost, options)
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
          env: 'staging',
          owner: 'test-owner',
          project: 'test-project'
        }
        const { props } = await getDefaultPageProps({ params })
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
    })

    describe('with an invalid project slug', function () {
      let response

      before(async function () {
        const params = {
          env: 'staging',
          owner: 'test-owner',
          project: 'test-wrong-project'
        }
        response = await getDefaultPageProps({ params })
      })

      it('should return notFound', function () {
        expect(response.notFound).to.be.true()
      })

      it('should pass an error message to the error page', function () {
        expect(response.props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let response

      before(async function () {
        const params = {
          env: 'staging',
          owner: 'test-owner',
          project: 'test-project',
          workflowID: '3'
        }
        response = await getDefaultPageProps({ params })
      })

      it('should return notFound', function () {
        expect(response.notFound).to.be.true()
      })

      it('should pass an error message to the error page', function () {
        expect(response.props.title).to.equal('Workflow 3 was not found')
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
          env: 'production',
          owner: 'test-owner',
          project: 'test-project'
        }
        const { props } = await getDefaultPageProps({ params })
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
    })

    describe('with an invalid project slug', function () {
      let response

      before(async function () {
        const params = {
          env: 'production',
          owner: 'test-owner',
          project: 'test-wrong-project'
        }
        response = await getDefaultPageProps({ params })
      })

      it('should return notFound', function () {
        expect(response.notFound).to.be.true()
      })

      it('should pass an error message to the error page', function () {
        expect(response.props.title).to.equal('Project test-owner/test-wrong-project was not found')
      })
    })

    describe('with an invalid workflow ID', function () {
      let response

      before(async function () {
        const params = {
          env: 'production',
          owner: 'test-owner',
          project: 'test-project',
          workflowID: '3'
        }
        response = await getDefaultPageProps({ params })
      })

      it('should return notFound', function () {
        expect(response.notFound).to.be.true()
      })

      it('should pass an error message to the error page', function () {
        expect(response.props.title).to.equal('Workflow 3 was not found')
      })
    })
  })

  describe('deployed to kubernetes (production API)', function () {
    const deployEnvs = ['staging', 'production']
    
    deployEnvs.forEach(function testDeploy(deployEnv) {
      describe(`deployed to ${deployEnv}`, function () {
        before(function () {
          process.env.APP_ENV = deployEnv
          mockAPI(`http://panoptes-production-app/api`, {
            reqheaders: {
              ['X-Forwarded-Proto']: 'https'
            }
          })
        })

        after(function () {
          delete process.env.APP_ENV
          nock.cleanAll()
        })

        describe('with a valid project slug', function () {
          it('should return the project\'s active workflows', async function () {
            const params = {
              env: 'production',
              owner: 'test-owner',
              project: 'test-project'
            }
            const { props } = await getDefaultPageProps({ params })
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
        })

        describe('with an invalid project slug', function () {
          let response

          before(async function () {
            const params = {
              env: 'production',
              owner: 'test-owner',
              project: 'test-wrong-project'
            }
            response = await getDefaultPageProps({ params })
          })

          it('should return notFound', function () {
            expect(response.notFound).to.be.true()
          })

          it('should pass an error message to the error page', function () {
            expect(response.props.title).to.equal('Project test-owner/test-wrong-project was not found')
          })
        })

        describe('with an invalid workflow ID', function () {
          let response

          before(async function () {
            const params = {
              env: 'production',
              owner: 'test-owner',
              project: 'test-project',
              workflowID: '3'
            }
            response = await getDefaultPageProps({ params })
          })

          it('should return notFound', function () {
            expect(response.notFound).to.be.true()
          })

          it('should pass an error message to the error page', function () {
            expect(response.props.title).to.equal('Workflow 3 was not found')
          })
        })
      })
    })
  })

  describe('deployed to kubernetes (staging API)', function () {
    const deployEnvs = ['staging', 'production']
    
    deployEnvs.forEach(function testDeploy(deployEnv) {
      describe(`deployed to ${deployEnv}`, function () {
        before(function () {
          process.env.APP_ENV = deployEnv
          mockAPI(`http://panoptes-staging-app/api`, {
            reqheaders: {
              ['X-Forwarded-Proto']: 'https'
            }
          })
        })

        after(function () {
          delete process.env.APP_ENV
          nock.cleanAll()
        })

        describe('with a valid project slug', function () {
          it('should return the project\'s active workflows', async function () {
            const params = {
              env: 'staging',
              owner: 'test-owner',
              project: 'test-project'
            }
            const { props } = await getDefaultPageProps({ params })
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
        })

        describe('with an invalid project slug', function () {
          let response

          before(async function () {
            const params = {
              rnv: 'staging',
              owner: 'test-owner',
              project: 'test-wrong-project'
            }
            response = await getDefaultPageProps({ params })
          })

          it('should return notFound', function () {
            expect(response.notFound).to.be.true()
          })

          it('should pass an error message to the error page', function () {
            expect(response.props.title).to.equal('Project test-owner/test-wrong-project was not found')
          })
        })

        describe('with an invalid workflow ID', function () {
          let response

          before(async function () {
            const params = {
              env: 'staging',
              owner: 'test-owner',
              project: 'test-project',
              workflowID: '3'
            }
            response = await getDefaultPageProps({ params })
          })

          it('should return notFound', function () {
            expect(response.notFound).to.be.true()
          })

          it('should pass an error message to the error page', function () {
            expect(response.props.title).to.equal('Workflow 3 was not found')
          })
        })
      })
    })
  })
})
