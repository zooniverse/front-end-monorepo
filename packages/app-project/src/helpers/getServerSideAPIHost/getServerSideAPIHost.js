const APIHosts = {
  production: 'http://panoptes-production-app/api',
  staging: 'http://panoptes-staging-app/api'
}

const deploymentEnvironments = ['staging', 'production', 'static']
/**
  Return the internal service name for our API hosts when the app is deployed in our kubernetes cluster.
  Return undefined to use the default hostname in local development.
*/
export default function getServerSideAPIHost(env) {
  let host
  const headers = {}
  const deployEnvironment = process.env.APP_ENV

  if (deploymentEnvironments.includes(deployEnvironment)) {
    host = APIHosts[env]
  }
  if (host) {
    headers['X-Forwarded-Proto'] = 'https'
  }
  return { headers, host }
}
