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
    const { subjects, workflows } = classifierStore
    if (!workflows.active?.prioritized) {
      /*
      In this case, we delete the saved queue so that
      refreshing the classifier will load a new, randomised
      subject queue.
      */
      subjects.reset()
    }
    if (subjects.active) {
      /*
        This is a hack to start a new classification from a snapshot.
      */
      subjects.setActiveSubject(subjects.active.id)
    }
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