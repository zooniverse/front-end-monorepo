import { persist } from 'mst-persist'
import  { useEffect, useState } from 'react'

import { asyncSessionStorage } from '@helpers'

async function hydrateStore(storageKey, classifierStore) {
  try {
    await persist(storageKey, classifierStore, {
      storage: asyncSessionStorage,
      whitelist: ['fieldGuide', 'projects', 'subjects', 'subjectSets', 'tutorials', 'workflows', 'workflowSteps']
    })
    console.log('store hydrated from local storage')
  } catch (error) {
    console.log('store snapshot error.')
    console.error(error)
  }
}

export default function useHydratedStore(classifierStore, cachePanoptesData = false, storageKey) {
  const [loaded, setLoaded] = useState(false)
  
  async function onMount() {
    if (cachePanoptesData) {
      await hydrateStore(storageKey, classifierStore)
    }
    setLoaded(true)
  }

  useEffect(() => {
    onMount()
  }, [])
  return loaded
}