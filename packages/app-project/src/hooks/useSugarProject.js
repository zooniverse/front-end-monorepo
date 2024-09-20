import { useEffect } from 'react'
// panoptes-client / sugarClient requires engine.io-client 
// see https://github.com/zooniverse/Panoptes-Front-End/pull/4712#issuecomment-400752308 for additional discussion
import { sugarClient } from 'panoptes-client/lib/sugar'

const isBrowser = typeof window !== 'undefined'

export default function useSugarProject(project) {
  const projectID = project?.id

  useEffect(function onProjectChange() {
    let cleanup
    if (isBrowser && projectID) {
      const channel = `project-${projectID}`
      sugarClient.subscribeTo(channel)
      cleanup = () => {
        sugarClient.unsubscribeFrom(channel)
      }
    }
    return cleanup
  }, [projectID])
}