const { config, env } = require('./config')
const panoptes = require('./panoptes')
const projects = require('./resources/projects')
const media = require('./resources/media')
const users = require('./resources/users')

module.exports = {
  config,
  env,
  media,
  panoptes,
  projects,
  users
}
