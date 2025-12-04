import { config, env } from './config.js'
import auth from './auth.js'
import panoptes from './panoptes.js'
import talkAPI from './talkAPI.js'

import collections from './resources/collections/index.js'
import media from './resources/media/index.js'
import projects from './resources/projects/index.js'
import subjects from './resources/subjects/index.js'
import tutorials from './resources/tutorials/index.js'
import users from './resources/users/index.js'

export default {
  auth,
  collections,
  config,
  env,
  media,
  panoptes,
  projects,
  subjects,
  talkAPI,
  tutorials,
  users
}
