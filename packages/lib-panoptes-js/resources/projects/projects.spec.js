const { expect } = require('chai');
const superagent = require('superagent');
const mockSuperagent = require('superagent-mock');
const { projects, PROJECTS_ENDPOINT } = require('./projects');
const { config } = require('../../config');
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
          console.log('pattern, match, params', `${config.host}${PROJECTS_ENDPOINT}`, match, params)
          actualParams = params;
          return expectedResponse;
        },
        post: (match, data) => ({ body: data })
      }]);
    });

    after(function() {
      superagentMock.unset();
    });

    it.only('should return the expected response', function() {
      return projects.create().then(response => {
        // expect(response).to.eql({ body: expectedResponse }); // deep equality
      }).catch(err => console.error('error', err));
    });

    it('should have sent the expected data params with an added { private: true }', function() {
      const projectDisplayName = { display_name: 'My project' };
      return projects.create({ data: projectDisplayName }).then(response => {
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

      return projects.get({ id: '2' }).then(response => {
        expect(response).to.eql({ body: expectedGetSingleResponse });
      });
    });

    // it('should include query params with the request if defined', function() {
    //   const queryParams = { page: '2' };
    //   superagentMock = mockSuperagent(superagent, [{
    //     pattern: `${config.host}${PROJECTS_ENDPOINT}/(\\d+)`, // this is a weird way of doing regex
    //     fixtures: (match, params) => {
    //       console.log('match, params', match, params)
    //       actualParams = params;
    //       return expectedGetSingleResponse;
    //     },
    //     get: (match, data) => ({ body: data })
    //   }]);

    //   return projects.get({ id: '2', query: queryParams }).then(response => {
    //     console.log(actualParams)
    //     // expect(actualParams).to.eql('');
    //   });
    // });

    it('should error if id arugment is not a string', function() {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}/(\\d+)`, // this is a weird way of doing regex
        fixtures: (match, params) => {
          actualParams = params;
          return expectedGetSingleResponse;
        },
        get: (match, data) => ({ body: data })
      }]);

      return projects.get({ id: 2 }).catch(error => {
        expect(error).to.equal('Projects: Get request id must be a string.');
      });
    });
  });

  describe('update', function() {
    let superagentMock;
    let actualParams;
    const expectedPutResponse = projectMocks.putProjectResponse;
    const update = { researcher_quote: 'Try my project!' };

    before(function() {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${PROJECTS_ENDPOINT}/(\\d+)`, // this is a weird way of doing regex
        fixtures: (match, params) => {
          actualParams = params;
          return expectedPutResponse;
        },
        put: (match, data) => ({ body: data })
      }]);
    });

    after(function() {
      superagentMock.unset();
    });

    it('should error if id argument is not a string', function() {
      return projects.update({ id: 2 }).catch((error) => {
        expect(error).to.equal('Projects: Update request id must be a string.');
      });
    });

    it('should error if data argument is falsy', function () {
      return projects.update({ data: update }).catch((error) => {
        expect(error).to.equal('Projects: Update request missing project id.');
      });
    });

    it('should error if data argument is falsy', function() {
      return projects.update({ id: '2' }).catch((error) => {
        expect(error).to.equal('Projects: Update request missing data to post.');
      });
    });

    it('should return the expected response', function() {
      return projects.update({ id: '2', data: update }).then((response) => {
        expect(response).to.equal(expectedPutResponse);
      });
    });
  })
});
