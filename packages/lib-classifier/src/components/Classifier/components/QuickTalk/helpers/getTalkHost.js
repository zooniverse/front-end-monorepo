/*
Temporary talk config. This should be moved into @zooniverse/panoptes-js
 */
export default function getTalkHost (env) {
  return (env === 'production')
    ? 'https://talk.zooniverse.org'
    : 'https://talk-staging.zooniverse.org'
}
