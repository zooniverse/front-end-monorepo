const { expect } = require('chai');
const superagent = require('superagent');
const mockSuperagent = require('superagent-mock');
const { config } = require('./config');
const panoptes = require('./panoptes');

describe('panoptes.js', function() {
  describe('get', function() {
    let superagentMock;
    let actualMatch;
    let actualParams;
    let actualHeader;
    const endpoint = '/projects';
    const expectedResponse = { id: '2' };
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match;
          actualParams = params;
          actualHeader = header;
          return expectedResponse;
        },
        get: (match, data) => ({ body: data })
      }]);
    });

    after(function() {
      superagentMock.unset();
    });

    it('should return the expected response', function() {
      return panoptes.get(endpoint).then((response) => {
        expect(response).to.eql({ body: expectedResponse });
      });
    });

    it('should use the host from the function call if defined', function() {
      const mockAPIHost = 'https://my-api.com';
      return panoptes.get(endpoint, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true;
      });
    });

    it('should use the host defined in the config if a host parameter isn\'t defined', function() {
      return panoptes.get(endpoint).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true;
      });
    });

    it('should add Content-Type header to the request', function() {
      return panoptes.get(endpoint).then((response) => {
        expect(actualHeader["Content-Type"]).to.exist;
        expect(actualHeader["Content-Type"]).to.equal('application/json');
      });
    });

    it('should add Accept header to the request', function() {
      return panoptes.get(endpoint).then((response) => {
        expect(actualHeader["Accept"]).to.exist;
        expect(actualHeader["Accept"]).to.equal('application/vnd.api+json; version=1');        
      });
    });

    it('should add the query object to the URL if defined', function() {
      return panoptes.get(endpoint, { page: '2', page_size: '30' }).then((response) => {
        expect(actualMatch.input.includes('?page=2&page_size=30')).to.be.true;
      });
    });

    it('should error if query params are defined but are not an object', function() {
      return panoptes.get(endpoint, '?foo=bar').catch((error) => {
        expect(error).to.equal('Query must be an object');
      });
    });

    it('should error if request is called without a defined resource endpoint', function() {
      return panoptes.get().catch((error) => {
        expect(error).to.equal('Request needs a defined resource endpoint');
      });
    });
  });

  describe('post', function () {
    let superagentMock;
    let actualMatch;
    let actualParams;
    let actualHeader;
    const endpoint = '/projects';
    const expectedResponse = { id: '3' };
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match;
          actualParams = params;
          actualHeader = header;
          return expectedResponse;
        },
        post: (match, data) => ({ body: data })
      }]);
    });

    after(function () {
      superagentMock.unset();
    });

    it('should return the expected response', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(response).to.eql({ body: expectedResponse });
      });
    });

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com';
      return panoptes.post(endpoint, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true;
      });
    });

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true;
      });
    });

    it('should add Content-Type header to the request', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualHeader["Content-Type"]).to.exist;
        expect(actualHeader["Content-Type"]).to.equal('application/json');
      });
    });

    it('should add Accept header to the request', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualHeader["Accept"]).to.exist;
        expect(actualHeader["Accept"]).to.equal('application/vnd.api+json; version=1');
      });
    });

    it('should send any data params if defined', function () {
      const params = { display_name: 'My project' };
      return panoptes.post(endpoint, params).then((response) => {
        expect(actualParams).to.eql(params);
      });
    });

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.post().catch((error) => {
        expect(error).to.equal('Request needs a defined resource endpoint');
      });
    });
  });

  describe('put', function () {
    let superagentMock;
    let actualMatch;
    let actualParams;
    let actualHeader;
    const endpoint = '/projects/2';
    const update = { display_name: 'My project' };
    const expectedResponse = { id: '3', display_name: 'My project' };
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: '/projects/(\\d+)',
        fixtures: (match, params, header, context) => {
          actualMatch = match;
          actualParams = params;
          actualHeader = header;
          return expectedResponse;
        },
        put: (match, data) => ({ body: data })
      }]);
    });

    after(function () {
      superagentMock.unset();
    });

    it('should return the expected response', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(response).to.eql({ body: expectedResponse });
      });
    });

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com';
      return panoptes.put(endpoint, update, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true;
      });
    });

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true;
      });
    });

    it('should add Content-Type header to the request', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualHeader["Content-Type"]).to.exist;
        expect(actualHeader["Content-Type"]).to.equal('application/json');
      });
    });

    it('should add Accept header to the request', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualHeader["Accept"]).to.exist;
        expect(actualHeader["Accept"]).to.equal('application/vnd.api+json; version=1');
      });
    });

    it('should send any data params if defined', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualParams).to.eql(update);
      });
    });

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.put().catch((error) => {
        expect(error).to.equal('Request needs a defined resource endpoint');
      });
    });
  });
});