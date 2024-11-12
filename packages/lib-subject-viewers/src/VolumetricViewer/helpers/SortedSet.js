export const BinarySearch = ({ data, left, right, value }) => {
  left = left ?? 0
  right = right ?? data.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (data[mid] === value) {
      return { index: mid, left, right }
    } else if (data[mid] < value) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return { index: -1, left, right }
}

export const SortedSetIntersection = ({ sets }) => {
  const [firstSet, ...restSets] = sets
    .map((s) => s.data)
    .sort((a, b) => a.length - b.length)
  const results = []
  let indexCurrent = 0
  const indexMax = firstSet.length

  while (indexCurrent < indexMax) {
    // search first item, search n item
    // if found, find in next
    // if not found, finish searching and don't add
    const currentValue = firstSet[indexCurrent]
    let isIntersecting = true

    // loop through the rest sets for intersection
    // sets are sorted by length so we're searching the shortest sets first
    for (let n = 0; n < restSets.length; n++) {
      const comparisonSet = restSets[n]

      const searchResults = BinarySearch({
        data: comparisonSet,
        left: 0,
        right: comparisonSet.length - 1,
        value: currentValue
      })

      // not intersecting with current set, so break
      if (searchResults.index === -1) {
        isIntersecting = false
        break
      }
    }

    if (isIntersecting) {
      results.push(currentValue)
    }
    indexCurrent++
  } // endwhile

  return SortedSet({ data: results })
}

export const SortedSetUnion = ({ sets }) => {
  const sortedSets = sets
    .map((s) => s.data)
    .sort((a, b) => a.length - b.length)

  const results = []
  const indexCurrent = []
  const indexMax = []

  // set the indexCurrent to 0 for all sets and
  // set the indexMax to the length of each set
  sortedSets.forEach((set, i) => {
    indexCurrent[i] = 0
    indexMax[i] = set.length - 1
  })

  // we need all index values to be greater than their length to terminate the while
  function isInRange (indexCurrent, indexMax) {
    let inRange = false
    indexCurrent.forEach((val, i) => {
      if (val <= indexMax[i]) {
        inRange = true
      }
    })
    return inRange
  }

  // iteratively removes the smallest value from all sets
  // then, it increments the lowest index values in that set
  let matches = []
  while (isInRange(indexCurrent, indexMax)) {
    matches.length = 0
    let smallest = 16777217 // 256^3+1 (arbitrarily largest number)
    indexCurrent.forEach((val, i) => {
      const value = sortedSets[i][val]

      if (value < smallest) {
        smallest = value
        matches = [i]
      } else if (value === smallest) {
        matches.push(i)
      }
    })

    matches.forEach((index) => {
      indexCurrent[index]++
    })

    results.push(smallest)
  }

  return SortedSet({ data: results })
}

export const SortedSet = ({ data } = { data: [] }) => {
  if (data === null) data = []

  const sortedSet = {
    data,

    // methods
    add: ({ value }) => {
      const { index, left } = BinarySearch({ data, value })
      if (index !== -1) return { index, data }
      data.splice(left, 0, value)
      return { index: left, data }
    },
    has: ({ value }) => {
      const resp = {
        index: BinarySearch({ data, value }).index,
        data
      }

      return resp.index !== -1
    },
    intersection: ({ sets }) => {
      return SortedSetIntersection({ sets: [sortedSet, ...sets] })
    },
    remove: ({ value }) => {
      const { index } = BinarySearch({ data, value })
      if (index !== -1) data.splice(index, 1)
      return { index, data }
    },
    union: ({ sets }) => {
      return SortedSetUnion({ sets: [sortedSet, ...sets] })
    }
  }

  return sortedSet
}
