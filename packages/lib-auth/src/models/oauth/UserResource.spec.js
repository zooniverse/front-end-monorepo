import UserResource from './UserResource'

const user = {
  admin: false,
  avatar_src: null,
  banned: false,
  beta_email_communication: false,
  created_at: '',
  credited_name: '',
  display_name: '',
  email: '',
  global_email_communication: false,
  href: '',
  id: '1',
  intervention_notifications: false,
  languages: [],
  login: '',
  login_prompt: false,
  private_profile: false,
  project_email_communication: false,
  subject_limit: 100,
  type: 'users',
  updated_at: '',
  upload_whitelist: false,
  uploaded_subjects_count: 100,
  ux_testing_email_communication: false,
  valid_email: false,
  zooniverse_id: ''
}

let userResource

describe('Model > UserResource', function () {
  beforeEach(function () {
    userResource = UserResource.create(user)
  })

  it('should exist', function () {
    expect(userResource).to.be.an('object')
  })
})
