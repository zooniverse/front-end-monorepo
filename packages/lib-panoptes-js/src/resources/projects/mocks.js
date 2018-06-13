const projectOne = {
  activity: 0,
  available_languages: ['en'],
  beta_approved: false,
  beta_requested: false,
  classifications_count: 0,
  classifiers_count: 0,
  completeness: 0,
  configuration: {},
  created_at: '2018-05-10T16:53:33.328Z',
  description: 'A short description of the project',
  display_name: 'Untitled project',
  experimental_tools: [],
  featured: false,
  href: '/projects/1',
  id: '1',
  introduction: 'A more in-depth introduction to your science...',
  launch_approved: false,
  launch_date: null,
  launch_requested: false,
  links: {},
  live: false,
  migrated: false,
  mobile_friendly: false,
  primary_language: 'en',
  private: true,
  redirect: '',
  researcher_quote: '',
  retired_subjects_count: 0,
  slug: 'user/untitled-project',
  state: 'development',
  subjects_count: 0,
  tags: [],
  title: 'Untitled project',
  updated_at: '2018-05-10T16:53:33.328Z',
  urls: [],
  workflow_description: ''
}

const projectTwo = {
  activity: 100000,
  available_languages: ['en'],
  beta_approved: true,
  beta_requested: true,
  classifications_count: 10000,
  classifiers_count: 100,
  completeness: 0.5,
  configuration: {},
  created_at: '2018-05-11T16:53:33.328Z',
  description: 'A short description of the project',
  display_name: 'Untitled project 2',
  experimental_tools: [],
  featured: false,
  href: '/projects/2',
  id: '2',
  introduction: 'A more in-depth introduction to your science...',
  launch_approved: true,
  launch_date: '2018-05-11T16:53:33.328Z',
  launch_requested: true,
  links: {},
  live: true,
  migrated: false,
  mobile_friendly: false,
  primary_language: 'en',
  private: false,
  redirect: '',
  researcher_quote: '',
  retired_subjects_count: 10,
  slug: 'user/untitled-project-2',
  state: 'development',
  subjects_count: 1000000,
  tags: [],
  title: 'Untitled project 2',
  updated_at: '2018-05-10T16:53:33.328Z',
  urls: [],
  workflow_description: ''
}

const newProjectResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [projectOne]
}

const getProjectsResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [projectOne, projectTwo]
}

const getSingleProjectResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [projectTwo]
}

const putProjectResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [Object.assign({}, projectTwo, { researcher_quote: 'Try my project!' })]
}

const notFound = {
  links: {},
  meta: {},
  projects: []
}

projectRoleOwner = {
  href: "/project_roles/1",
  id: "1",
  links: { project: "2", owner: {} },
  roles: ["owner"]
}

projectRoleMultiple = {
  href: "/project_roles/2",
  id: "2",
  links: { project: "2", owner: {} },
  roles: ["expert", "scientist"]
}

projectPage = {
  content: "",
  created_at: "2016-12-08T20:34:38.300Z",
  href: "/projects/2/pages/1",
  id: "1",
  language: "en",
  links: { project: "1" },
  title: "Team",
  type: "project_pages",
  updated_at: "2018-05-17T19:09:11.209Z",
  url_key: "team"
}

projectPageTwo = {
  content: "",
  created_at: "2016-12-08T20:34:47.085Z",
  href: "/projects/2/pages/2",
  id: "2",
  language: "en",
  links: { project: "2" },
  title: "Results",
  type: "project_pages",
  updated_at: "2018-05-17T19:16:57.618Z",
  url_key: "results"
}

module.exports = {
  projectOne,
  projectTwo,
  newProjectResponse,
  getProjectsResponse,
  getSingleProjectResponse,
  putProjectResponse,
  notFound,
  projectPage,
  projectPages: [projectPage, projectPageTwo],
  projectRoleOwner,
  projectRoleMultiple,
  projectRoles: [projectRoleOwner, projectRoleMultiple]
}
