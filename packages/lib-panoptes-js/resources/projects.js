const panoptes = require('../panoptes');

const PROJECTS_ENDPOINT = '/projects'

function handleError() {
  return Promise.reject((error) => {
    if (console) console.error(error);

    return error;
  });
}

const projects = {
  create: () => {
    return panoptes.put(`${PROJECTS_ENDPOINT}/`)
  },

  get: (id, query) => {
    const query = query || [];
    if (!id) return panoptes.get(PROJECTS_ENDPOINT, query);
    return panoptes.get(`${PROJECTS_ENDPOINT}/${id}`, query);
  },

  update: (id, data) => {
    if (id && data) return panoptes.post(`${PROJECTS_ENDPOINT}/${id}`, data);
    if (!id) return handleError('Update request missing project id.');
    if (!data) return handleError('Update request missing data to post.');
    return handleError('Update request missing required parameters: id and data.')
  },

  delete: (id) => {
    if (id) return panoptes.del(`${PROJECTS_ENDPOINT}/${id}`);
    return handleError('Delete request missing project id.');
  }
};

module.exports({ projects });
