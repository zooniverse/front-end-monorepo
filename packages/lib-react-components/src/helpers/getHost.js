export default function getHost () {
  return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') ? 'https://frontend.preview.zooniverse.org' : 'https://www.zooniverse.org'
}
