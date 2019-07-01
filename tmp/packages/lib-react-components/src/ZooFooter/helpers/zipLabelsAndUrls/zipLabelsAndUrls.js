import { zipWith } from 'lodash'

export default function zipLabelsAndUrls (labels, urls) {
  return zipWith(labels, urls, zipFunction)
}

function zipFunction (label, url) {
  return {
    label,
    url
  }
}
