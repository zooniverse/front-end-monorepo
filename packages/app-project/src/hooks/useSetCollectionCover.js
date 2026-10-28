import { collections } from '@zooniverse/panoptes-js'
import { useState } from 'react'

import useCollection from '@hooks/useCollection'
import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

/**
 * Sets a collection's cover by mutating the collection
 * cached by useCollection().
 */
export default function useSetCollectionCover({ slug }) {
  const token = usePanoptesAuthToken()
  const { data: collection, mutate } = useCollection({ slug })
  const [isSettingCover, setIsSettingCover] = useState(false)
  const [error, setError] = useState(null)

  async function setCover(subjectId) {
    if (!collection?.id || !subjectId || !token) return
    setIsSettingCover(true)
    setError(null)
    try {
      await mutate(
        async () => {
          const response = await collections.update({
            authorization: `Bearer ${token}`,
            data: { links: { default_subject: subjectId } },
            id: collection.id
          })
          return response?.body?.collections?.[0]
        },
        {
          // the update response replaces the cached collection, then SWR revalidates it
          populateCache: (updatedCollection, prevData) => updatedCollection ?? prevData,
          rollbackOnError(err) {
            console.error(err)
            return true
          }
        }
      )
    } catch (error) {
      setError(error)
    } finally {
      setIsSettingCover(false)
    }
  }

  return { error, isSettingCover, setCover }
}
