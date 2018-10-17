export default function getHost () {
  return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') ? window.location.origin : 'https://www.zooniverse.org'
}
