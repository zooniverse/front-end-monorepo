const panoptes = require('../../panoptes');

const PROJECTS_ENDPOINT = '/projects'

function handleError() {
  return Promise.reject((error) => {
    if (console) console.error(error);

    return error;
  });
}

// TODO: Could add helper functions to request project with expected included resources
// like project avatar and background
const projects = {
  create: (projectData) => {
    const newProjectData = projectData || {};

    const allProjectData = Object.assign({
      private: true
    }, newProjectData);

    return panoptes.post(`${PROJECTS_ENDPOINT}/`, allProjectData);
  },

  get: (id, query) => {
    const queryParams = query || [];
    const projectId = id || null;
    if (!projectId) return panoptes.get(PROJECTS_ENDPOINT, queryParams);
    if (projectId && typeof projectId !== 'string') return handleError('Projects: Get request id must be a string.');
    return panoptes.get(`${PROJECTS_ENDPOINT}/${projectId}`, queryParams);
  },

  update: (id, data) => {
    if (id && typeof id !== 'string') return handleError('Projects: Update request id must be a string.');
    if (id && data) return panoptes.put(`${PROJECTS_ENDPOINT}/${id}`, data);
    if (!id) return handleError('Projects: Update request missing project id.');
    if (!data) return handleError('Projects: Update request missing data to post.');

    return handleError('Projects: Update request missing required parameters: id and data.')
  },

  delete: (id) => {
    if (id && typeof id !== 'string') return handleError('Projects: Delete request id must be a string.');
    if (id) return panoptes.del(`${PROJECTS_ENDPOINT}/${id}`);
    return handleError('Projects: Delete request missing project id.');
  }
};

module.exports = { projects, PROJECTS_ENDPOINT };
