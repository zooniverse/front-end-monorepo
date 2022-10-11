import zipWith from 'lodash/zipWith'

export default function zipLabelsAndUrls (labels, urls) {
  return zipWith(labels, urls, zipFunction)
}

function zipFunction (label, url) {
  return {
    label,
    url
  }
}
