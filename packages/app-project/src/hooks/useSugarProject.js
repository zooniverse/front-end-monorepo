import { useEffect } from 'react'
import { sugarClient } from 'panoptes-client/lib/sugar'

const isBrowser = typeof window !== 'undefined'

export default function useSugarProject(project) {
  const projectID = project?.id

  useEffect(function onProjectChange() {
    if (isBrowser && projectID) {
      const channel = `project-${projectID}`
      sugarClient.subscribeTo(channel)
      return () => {
        sugarClient.unsubscribeFrom(channel)
      }
    }
  }, [projectID])
}