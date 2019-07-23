const intersection = require('lodash/intersection')

function sortByMatchingTags (record1, record2, testRecord) {
  const matches1 = intersection(record1.tags, testRecord.tags).length
  const matches2 = intersection(record2.tags, testRecord.tags).length

  if (matches1 === matches2) return 0
  if (matches1 < matches2) return 1
  if (matches1 > matches2) return -1
}

module.exports = sortByMatchingTags
