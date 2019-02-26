const { config, endpoints, env } = require('./config')
const panoptes = require('./panoptes')

const collections = require('./resources/collections')
const media = require('./resources/media')
const projects = require('./resources/projects')
const subjects = require('./resources/subjects')
const tutorials = require('./resources/tutorials')
const users = require('./resources/users')

module.exports = {
  collections,
  config,
  endpoints,
  env,
  media,
  panoptes,
  projects,
  subjects,
  tutorials,
  users
}
