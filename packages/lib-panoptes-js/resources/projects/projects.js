const panoptes = require('../../panoptes');

const PROJECTS_ENDPOINT = '/projects'

function handleError() {
  return Promise.reject((error) => {
    if (console) console.error(error);

    return error;
  });
}

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
    if (!id) return panoptes.get(PROJECTS_ENDPOINT, queryParams);
    return panoptes.get(`${PROJECTS_ENDPOINT}/${id}`, queryParams);
  },

  update: (id, data) => {
    if (id && data) return panoptes.put(`${PROJECTS_ENDPOINT}/${id}`, data);
    if (!id) return handleError('Projects: Update request missing project id.');
    if (!data) return handleError('Projects: Update request missing data to post.');
    return handleError('Projects: Update request missing required parameters: id and data.')
  },

  delete: (id) => {
    if (id) return panoptes.del(`${PROJECTS_ENDPOINT}/${id}`);
    return handleError('Projects: Delete request missing project id.');
  }
};

module.exports = { projects, PROJECTS_ENDPOINT };
