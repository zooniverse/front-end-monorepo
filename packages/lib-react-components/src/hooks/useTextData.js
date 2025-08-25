import { useEffect, useState } from 'react'

async function requestData(src) {
  const response = await fetch(src)
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  const responseData = await response.text()
  return responseData
}

export default function useTextData(src) {
  const [error, setError] = useState(null)
  const [data, setData] = useState('')

  useEffect(function onSrcChange() {
    async function handleData() {
      try {
        const rawData = await requestData(src)
        if (rawData) setData(rawData)
      } catch (error) {
        setError(error)
      }
    }

    if (src) {
      handleData()
    }
  }, [src])

  const loading = !data && !error
  return { data, error, loading }
}
