module.exports = {
  baseUrl: 'http://www.example.com',
  clientAppID: 'foobar',
  mockAccessToken: 'mockAccessToken_abcdefgh',
  mockAccessTokenExpiresIn: 7200,
  // Unix timestamp is in milliseconds; the API returns it in seconds
  mockCreatedAt: Math.round((new Date()).getTime() / 1000),
  mockCSRFToken: 'mockCSRFToken_abcdefgh',
  mockJWT: 'mockJWT_abcdefgh',
  mockRefreshToken: 'mockRefreshToken_abcdefgh',
  mockScope: 'mockScope_abcdefgh',
  newUser: {
    email: 'testuser@example.com',
    login: 'testuser',
    password: 'abcdefgh',
  },
  existingUser: {
    login: 'testuser@example.com',
    password: 'abcdefgh',
  }
}
