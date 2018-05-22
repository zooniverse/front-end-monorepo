const superagent = require('superagent');
const { config } = require('./config');

function handleErrors(error) {
  if (console) console.error(error);

  return error;
}

function handleMissingParameter(message) {
  return Promise.reject(message);
}

// TODO: Write auth client
// TODO: Consider how to integrate a GraphQL option
function get(endpoint, query, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint');
  const apiHost = host || config.host;
  const request = superagent.get(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')
  // .set('Authorization', apiClient.headers.Authorization);
  if (query && Object.keys(query).length > 0) {
    if (typeof query !== 'object') return Promise.reject('Query must be an object');
    request.query(query);
  }
  return request.then(response => response).catch(handleErrors);
}

function post(endpoint, data, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint');
  const apiHost = host || config.host;

  return superagent.post(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')
    // .set('Authorization', apiClient.headers.Authorization)
    .send(data)
    .then(response => response).catch(handleErrors);
}

function put(endpoint, data, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint');
  if (!data) return handleMissingParameter('Request needs a defined data for update');  
  const apiHost = host || config.host;

  return superagent.put(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')    
    // .set('Authorization', apiClient.headers.Authorization)
    .send(data)
    .then(response => response).catch(handleErrors);
}

function del(endpoint, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint');
  const apiHost = host || config.host;

  return superagent.delete(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')    
    // .set('Authorization', apiClient.headers.Authorization)
    .then(response => response).catch(handleErrors);
}

const requests = {
  get,
  put,
  post,
  del
}

module.exports = requests;
