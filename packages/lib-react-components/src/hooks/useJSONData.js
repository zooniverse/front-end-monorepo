import { destroy, getSnapshot, getType } from 'mobx-state-tree'
import { useEffect, useState } from 'react'

import JSONData from '../types/JSONData'

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
  const [jsonData, setJsonData] = useState(null)

  useEffect(function onSrcChange() {

    async function handleSubject() {
      try {
        const rawData = await requestData(src)
        if (rawData) {
          const jsonData = JSONData.create(rawData)
          setJsonData(jsonData)
        }
      } catch (error) {
        setError(error)
      }
    }

    if (src) {
      handleSubject()
    }
    return () => {
      if (jsonData) {
        destroy(jsonData)
      }
    }
  }, [src])

  const type = jsonData ? getType(jsonData).name : null
  const data = jsonData ? getSnapshot(jsonData) : null
  const loading = !data && !error
  return { loading, data, type, error }
}
