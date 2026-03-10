import { destroy, getSnapshot, getType, isStateTreeNode } from 'mobx-state-tree'
import { useEffect, useState } from 'react'

import JSONData from '../types/JSONData'

// NOTE: this hook is similar to the useSubjectJSON hook in lib-classifier.
// Please consider whether changes to one hook should be mirrored in the other,
// until a shared useJSONData hook can be implemented.

async function requestData(src) {
  const response = await fetch(src)
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  const responseData = await response.json()

  return responseData
}

export default function useJSONData(src) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(function onSrcChange() {

    async function handleSubject() {
      try {
        const rawData = await requestData(src)
        if (rawData) {
          let jsonData
          try {
            // Try to match against known types
            jsonData = JSONData.create(rawData)
          } catch (typeError) {
            // If no type matches, use the raw data
            console.warn('JSONData validation failed, using raw JSON:', typeError.message)
            jsonData = rawData
          }
          setData(jsonData)
        }
      } catch (error) {
        setError(error)
      }
    }

    if (src) {
      handleSubject()
    }
    return () => {
      if (data && isStateTreeNode(data)) {
        destroy(data)
      }
    }
  }, [src])

  const loading = !data && !error
  return {
    loading,
    data: data ? (isStateTreeNode(data) ? getSnapshot(data) : data) : null,
    type: data && isStateTreeNode(data) ? getType(data).name : null,
    error
  }
}
