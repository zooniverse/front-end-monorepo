export const MessageFromResearcherMock = {
  message: `There are some pretty cool suggestions about what this is. I'm not sure what it is, but I'm sure it's not a cat.`,
  talkLink: '/projects/owner/project-slug/talk',
  researcherId: '1',
  researcherName: 'John J. Johnson',
  researcherAvatar: 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg',
  projectAvatar: 'https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
}

const ProjectMock = {
  avatar: {
    src: MessageFromResearcherMock.projectAvatar
  },
  configuration: {
    researcherID: MessageFromResearcherMock.researcherId,
  },
  display_name: 'Test project',
  owners: [{
    avatar_src: MessageFromResearcherMock.researcherAvatar,
    id: MessageFromResearcherMock.researcherId,
    display_name: MessageFromResearcherMock.researcherName
  }],
  researcher_quote: MessageFromResearcherMock.message,
  slug: 'owner/slug'
}

export const MessageFromResearcherProjectNamedMock = {
  project: {
    ...ProjectMock
  }
}

export const MessageFromResearcherProjectNoMessageMock = {
  project: {
    ...ProjectMock,
    researcher_quote: null
  }
}

export const MessageFromResearcherProjectNoResearcherMock = {
  project: {
    ...ProjectMock,
    configuration: {
      researcherID: 'Fake Id'
    }
  }
}
