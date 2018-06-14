const { userMocks } = require('../users')
const { buildMockedMediumResource } = require('../media')

const projectAvatarResource = buildMockedMediumResource('avatar', 'project')
const projectBackgroundResource = buildMockedMediumResource('background', 'project')

const projectOneResource = {
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

const projectTwoResource = {
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
  projects: [projectOneResource]
}

const getProjectsResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [projectOneResource, projectTwoResource]
}

const getSingleProjectResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [projectTwoResource]
}

const putProjectResponse = {
  linked: {},
  links: {},
  meta: {},
  projects: [Object.assign({}, projectTwoResource, { researcher_quote: 'Try my project!' })]
}

const notFoundResponse = {
  links: {},
  meta: {},
  projects: []
}

projectRoleOwnerResponse = {
  links: {},
  meta: {},
  project_roles: [
    { href: "/project_roles/1",
      id: "1",
      links: { project: "2", owner: {} },
      roles: ["owner"]
    }
  ]
}

const projectRolesResponse = {
  links: {},
  meta: {},
  project_roles: [
    { href: "/project_roles/1",
      id: "1",
      links: { project: "2", owner: {} },
      roles: ["owner"]
    },
    { href: "/project_roles/2",
      id: "2",
      links: { project: "2", owner: {} },
      roles: ["expert", "scientist"]
    }
  ]
}

const projectRoleMultipleRolesResponse = {
  links: {},
  meta: {},
  project_roles: [
    { href: "/project_roles/2",
      id: "2",
      links: { project: "2", owner: {} },
      roles: ["expert", "scientist"]
    }
  ]
}

const projectPageResource = {
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

const projectPageResponse = {
  links: {},
  meta: {},
  project_pages: [
    { content: "",
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
  ]
}

const projectPagesResponse = {
  links: {},
  meta: {},
  project_pages: [
    { content: "",
      created_at: "2016-12-08T20:34:38.300Z",
      href: "/projects/2/pages/1",
      id: "1",
      language: "en",
      links: { project: "1" },
      title: "Team",
      type: "project_pages",
      updated_at: "2018-05-17T19:09:11.209Z",
      url_key: "team"
    },
    { content: "",
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
  ]
}

const getProjectResponseWithLinkedResources = {
  linked: {
    avatars: [projectAvatarResource],
    backgrounds: [projectBackgroundResource],
    owners: userMocks.user,
    project_pages: [
      projectPageResource
    ]
  },
  links: {},
  meta: {},
  projects: [projectTwoResource]
}

module.exports = {
  projectOneResource,
  projectTwoResource,
  newProjectResponse,
  getProjectsResponse,
  getSingleProjectResponse,
  putProjectResponse,
  notFoundResponse,
  projectPageResource,
  projectPageResponse,
  projectPagesResponse,
  projectRoleOwnerResponse,
  projectRoleMultipleRolesResponse,
  projectRolesResponse,
  projectAvatarResource,
  projectBackgroundResource,
  getProjectResponseWithLinkedResources
}
