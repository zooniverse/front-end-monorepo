import nock from 'nock'

import fetchTeam from './fetchTeam.js'

describe('Helpers > fetchTeam', function () {
  const projectRoles = [
    {
      project_roles: [
        {
          roles: ['owner'],
          links: {
            owner: {
              id: '1'
            }
          }
        },
        {
          roles: ['scientist'],
          links: {
            owner: {
              id: '2'
            }
          }
        }
      ],
      meta: {
        project_roles: {
          next_page: 2
        }
      }
    },
    {
      project_roles: [
        {
          roles: ['moderator'],
          links: {
            owner: {
              id: '3'
            }
          }
        }
      ],
      meta: {}
    }
  ]

  const projectUsers = [
    {
      users: [{
        id: '1',
        login: 'aramis'
      }, {
        id: '2',
        login: 'porthos'
      }],
      meta: {
        users: {
          next_page: 2
        }
      }
    },
    {
      users: [{
        id: '3',
        login: 'athos'
      }],
      meta: {}
    }
  ]
  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/project_roles')
    .query(query => query.page === '1' && query.project_id === '1')
    .reply(200, projectRoles[0])
    .get('/project_roles')
    .query(query => query.page === '2' && query.project_id === '1')
    .reply(200, projectRoles[1])
    .get('/users')
    .query(query => query.page === '1' && query.id === '1,2,3')
    .reply(200, projectUsers[0])
    .get('/users')
    .query(query => query.page === '2' && query.id === '1,2,3')
    .reply(200, projectUsers[1])
  })

  it('should fetch the project team with roles', async function () {
    const team = await fetchTeam({ id : '1' })
    expect(team).to.deep.equal([
      {
        id: '1',
        login: 'aramis',
        roles: ['owner']
      },
      {
        id: '2',
        login: 'porthos',
        roles: ['scientist']
      },
      {
        id: '3',
        login: 'athos',
        roles: ['moderator']
      }
    ])
  })
})