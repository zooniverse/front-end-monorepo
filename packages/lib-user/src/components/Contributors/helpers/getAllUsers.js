import { arrayOf, func, string } from 'prop-types'

import { fetchPanoptesUsers } from '../../../utils'

// maximum number of IDs per request, see GitHub issue front-end-monorepo/issues/6363
// to keep request less than 2084 characters, with IDs ~6 characters long plus %2C2 (encoded comma), use chunk size of 200
const CHUNK_SIZE = 200

export async function getAllUsers({
  memberIdsPerStats,
  setExportProgress
}) {
  let allUsers = []

  if (memberIdsPerStats && memberIdsPerStats.length > 0) {
    // If there are more than CHUNK_SIZE users, make multiple requests
    if (memberIdsPerStats.length > CHUNK_SIZE) {
      const userPromises = []
      const totalChunks = Math.ceil(memberIdsPerStats.length / CHUNK_SIZE)

      for (let i = 0; i < memberIdsPerStats.length; i += CHUNK_SIZE) {
        const chunk = memberIdsPerStats.slice(i, i + CHUNK_SIZE)
        const chunkQuery = {
          id: chunk.join(','),
          page_size: 100 // per panoptes, maximum page_size is 100
        }

        const wrappedPromise = fetchPanoptesUsers(chunkQuery).then(result => {
          setExportProgress(prevProgress => prevProgress + ((1 / totalChunks) * 100))
          return result
        })

        userPromises.push(wrappedPromise)
      }
      
      const userResults = await Promise.all(userPromises)
      allUsers = userResults.flat()
    } else {
      // If there are fewer users than CHUNK_SIZE, make a single request
      const allUsersQuery = {
        id: memberIdsPerStats.join(','),
        page_size: 100 // per panoptes, maximum page_size is 100
      }
      allUsers = await fetchPanoptesUsers(allUsersQuery)
      setExportProgress(100)
    }
  }

  return allUsers
}

getAllUsers.propTypes = {
  memberIdsPerStats: arrayOf(string),
  setExportProgress: func
}
