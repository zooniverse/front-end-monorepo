import { collections } from '@zooniverse/panoptes-js'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

/**
 * Removes subjects from a collection, then revalidates the cached subjects and collection.
 * `removeSubjects` resolves to true on success and false on failure.
 */
export default function useRemoveCollectionSubjects({ collectionId, slug }) {
  const token = usePanoptesAuthToken()
  const { mutate } = useSWRConfig()
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState(null)

  async function removeSubjects(subjectIds) {
    if (!collectionId || !token || !subjectIds?.length) return false
    setIsRemoving(true)
    setError(null)
    try {
      const authorization = `Bearer ${token}`
      const response = await collections.removeSubjects({
        authorization,
        id: collectionId,
        subjects: subjectIds
      })
      if (response?.status !== 204) {
        throw new Error('Unexpected response from removeSubjects')
      }
      return true
    } catch (removeError) {
      console.error(removeError)
      setError(removeError)
      return false
    } finally {
      await mutate(key => key?.collectionId === collectionId || (!!slug && key?.slug === slug))
      setIsRemoving(false)
    }
  }

  return { error, isRemoving, removeSubjects }
}
