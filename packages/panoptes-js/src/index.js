const { config, env } = require('./config')
const panoptes = require('./panoptes')

const media = require('./resources/media')
const projects = require('./resources/projects')
const subjects = require('./resources/subjects')
const tutorials = require('./resources/tutorials')
const users = require('./resources/users')

module.exports = {
  config,
  env,
  media,
  panoptes,
  projects,
  subjects,
  tutorials,
  users
}
