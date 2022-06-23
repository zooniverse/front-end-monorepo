const deployEnvironment = process.env.APP_ENV

const APIHosts = {
  production: 'http://panoptes-production-app',
  staging: 'http://panoptes-staging-app'
}

/**
  Return the internal service name for our API hosts when the app is deployed in our kubernetes cluster.
  Return undefined to use the default hostname in local development.
*/
export default function getServerSideAPIHost(env) {
  let host

  if (deployEnvironment === 'staging' || deployEnvironment === 'production') {
    host = APIHosts[env]
  }
  return host
}