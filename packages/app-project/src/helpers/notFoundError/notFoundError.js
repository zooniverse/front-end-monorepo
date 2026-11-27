const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

const host = HOSTS[environment] || 'https://localhost:3000'

export default function notFoundError(title) {
  return {
    notFound: true,
    props: {
      host,
      title
    }
  }
}
