import { types } from 'mobx-state-tree'

const UserResource = types
  .model('UserResource', {
    admin: types.maybeNull(types.boolean),
    avatar_src: types.maybeNull(types.string),
    banned: types.maybeNull(types.boolean),
    beta_email_communication: types.maybeNull(types.boolean),
    created_at: types.string,
    credited_name: types.maybeNull(types.string),
    display_name: types.maybeNull(types.string),
    email: types.string,
    global_email_communication: types.maybeNull(types.boolean),
    href: types.string,
    id: types.identifier,
    intervention_notifications: types.maybeNull(types.boolean),
    languages: types.array(types.string),
    login: types.string,
    login_prompt: types.maybeNull(types.boolean),
    private_profile: types.maybeNull(types.boolean),
    project_email_communication: types.maybeNull(types.boolean),
    subject_limit: types.number,
    type: types.literal('users'),
    updated_at: types.string,
    upload_whitelist: types.maybeNull(types.boolean),
    uploaded_subjects_count: types.number,
    ux_testing_email_communication: types.maybeNull(types.boolean),
    valid_email: types.maybeNull(types.boolean),
    zooniverse_id: types.maybeNull(types.string)
  })

export default UserResource
