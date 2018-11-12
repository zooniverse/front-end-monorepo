import UserStore from './UserStore'

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

let userStore

describe('Model > UserStore', function () {
  beforeEach(function () {
    userStore = UserStore.create()
  })

  it('should exist', function () {
    expect(userStore).to.be.an('object')
  })

  it('should have a `setUser` method', function () {
    expect(userStore.setUser).to.be.a('function')
    userStore = UserStore.create()
    expect(userStore.active).to.be.undefined
    expect(userStore.resources.has(user.id)).to.be.false

    userStore.setUser(user)
    expect(userStore.active).to.eql(user)
    expect(userStore.resources.has(user.id)).to.be.true
  })

  it('should have a `reset` method', function () {
    expect(userStore.reset).to.be.a('function')
    userStore = UserStore.create()
    userStore.setUser(user)
    userStore.reset()
    expect(userStore.active).to.be.undefined
    expect(userStore.resources.has(user.id)).to.be.false
  })
})
