const { expect } = require('chai');
const superagent = require('superagent');
const mockSuperagent = require('superagent-mock');
const { projects, PROJECTS_ENDPOINT } = require('./projects');
const config = require('../../config');
const projectMocks = require('./mocks');

describe('Projects resource requests', function() {
  describe('create', function() {
    let superagentMock;
    let actualParams;
    const expectedResponse = projectMocks.newProjectResponse;
    before(function() {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}`,
        fixtures: (match, params) => {
          actualParams = params;
          return expectedResponse;
        },
        post: (match, data) => ({ body: data })
      }]);
    });

    after(function() {
      superagentMock.unset();
    });

    it('should return the expected response', function() {
      return projects.create().then(response => {
        expect(response).to.eql({ body: expectedResponse }); // deep equality
      });
    });

    it('should have sent the expected data params with an added { private: true }', function() {
      const projectDisplayName = { display_name: 'My project' };
      return projects.create(projectDisplayName).then(response => {
        expect(actualParams).to.eql(Object.assign({}, { private: true }, projectDisplayName));
      });
    });
  });

  describe('get', function() {
    let superagentMock;
    let actualParams;
    const expectedGetAllResponse = projectMocks.getProjectsResponse;
    const expectedGetSingleResponse = projectMocks.getSingleProjectResponse;

    after(function () {
      superagentMock.unset();
    });

    it('should return the expected response without a defined id argument', function() {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}`,
        fixtures: (match, params) => {
          actualParams = params;
          return expectedGetAllResponse;
        },
        get: (match, data) => ({ body: data })
      }]);

      return projects.get().then(response => {
        expect(response).to.eql({ body: expectedGetAllResponse });
      });
    });

    it('should return the expected response with a defined id argument', function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}/(\\d+)`, // this is a weird way of doing regex
        fixtures: (match, params) => {
          actualParams = params;
          return expectedGetSingleResponse;
        },
        get: (match, data) => ({ body: data })
      }]);

      return projects.get('2').then(response => {
        expect(response).to.eql({ body: expectedGetSingleResponse });
      });
    });

    it.only('should error if id arugment is not a string', function() {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}/(\\d+)`, // this is a weird way of doing regex
        fixtures: (match, params) => {
          actualParams = params;
          return expectedGetSingleResponse;
        },
        get: (match, data) => ({ body: data })
      }]);

      return projects.get(2).catch(error => {
        console.log(error)
        expect(error).to.equal('Projects: Get request id must be a string.');
      });
    });
  });

  // describe('update')
});
