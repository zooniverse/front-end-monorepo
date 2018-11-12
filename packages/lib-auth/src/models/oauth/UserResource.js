import { types } from 'mobx-state-tree'

const UserResource = types
  .model('UserResource', {
    admin: types.boolean,
    avatar_src: types.maybeNull(types.string),
    banned: types.boolean,
    beta_email_communication: types.boolean,
    created_at: types.string,
    credited_name: types.string,
    display_name: types.string,
    email: types.string,
    global_email_communication: types.boolean,
    href: types.string,
    id: types.identifier,
    intervention_notifications: types.boolean,
    languages: types.array(types.string),
    login: types.string,
    login_prompt: types.boolean,
    private_profile: types.boolean,
    project_email_communication: types.boolean,
    subject_limit: types.number,
    type: types.literal('users'),
    updated_at: types.string,
    upload_whitelist: types.boolean,
    uploaded_subjects_count: types.number,
    ux_testing_email_communication: types.boolean,
    valid_email: types.boolean,
    zooniverse_id: types.string
  })

export default UserResource
