const { expect } = require('chai');
const superagent = require('superagent');
const mockSuperagent = require('superagent-mock');
const { projects, PROJECTS_ENDPOINT } = require('./projects');
const config = require('../../config');

const NEW_PROJECT_RESPONSE = {
  linked: {},
  links: {},
  meta: {},
  projects: [{
    activity: 0,
    available_languages: ["en"],
    beta_approved: false,
    beta_requested: false,
    classifications_count: 0,
    classifiers_count: 0,
    completeness: 0,
    configuration: {},
    created_at: "2018-05-10T16:53:33.328Z",
    description: "A short description of the project",
    display_name: "Untitled project",
    experimental_tools: [],
    featured: false,
    href: "/projects/1844",
    id: "1",
    introduction: "A more in-depth introduction to your science...",
    launch_approved: false,
    launch_date: null,
    launch_requested: false,
    links: {},
    live: false,
    migrated: false,
    mobile_friendly: false,
    primary_language: "en",
    private: true,
    redirect: "",
    researcher_quote: "",
    retired_subjects_count: 0,
    slug: "user/untitled-project",
    state: "development",
    subjects_count: 0,
    tags: [],
    title: "Untitled project",
    updated_at: "2018-05-10T16:53:33.328Z",
    urls: [],
    workflow_description: ""
  }]
};

describe('Projects resource requests', function() {
  describe('create', function() {
    let superagentMock;
    let actualParams;
    const expectedResponse = NEW_PROJECT_RESPONSE;
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
  });
});
