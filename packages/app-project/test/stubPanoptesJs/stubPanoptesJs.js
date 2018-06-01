import projectFixture from '../fixtures/project'

const stubPanoptesJs = {
  projects: {
    get: function () {
      return Promise.resolve(projectFixture)
    }
  }
}

export default stubPanoptesJs
