const timestamp = Date.now()

module.exports = {
  baseUrl: 'https://panoptes-staging.zooniverse.org',
  clientAppID: '535759b966935c297be11913acee7a9ca17c025f9f15520e7504728e71110a27',
  newUser: {
    email: `testuser_${timestamp}@example.com`,
    login: `testuser_${timestamp}`,
    password: `${timestamp}_abcdefgh`
  }
}
