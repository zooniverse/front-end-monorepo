function filterSelf (record1, record2) {
  return record1.id !== record2.id
}

module.exports = filterSelf
