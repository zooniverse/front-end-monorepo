export const USER = {
  admin: false,
  avatar_src: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/e638f5a3-7ffb-4d23-bb08-f296377a2e74.jpeg',
  display_name: 'Test User',
  id: '12345',
  login: 'TestUser'
}

export const ADMIN_USER = {
  admin: true,
  avatar_src: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
  display_name: 'Admin User',
  id: '54321',
  login: 'AdminUser'
}

export const GROUP_MEMBER_USER = {
  admin: false,
  avatar_src: '',
  display_name: 'Student User',
  id: '67890',
  login: 'StudentUser'
}

export const GROUP_ADMIN_USER = {
  admin: false,
  avatar_src: '',
  display_name: 'Teacher User',
  id: '99876',
  login: 'TeacherUser'
}

export const USERS = [
  USER,
  ADMIN_USER,
  GROUP_MEMBER_USER,
  GROUP_ADMIN_USER,
  {
    ...USER,
    id: '23456',
  },
  {
    ...GROUP_MEMBER_USER,
    id: '34567',
  },
  {
    ...ADMIN_USER,
    id: '45678',
  },
  {
    ...USER,
    id: '56789',
  }
]
