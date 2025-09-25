import { useEffect } from 'react'
// panoptes-client / sugarClient requires engine.io-client 
// see https://github.com/zooniverse/Panoptes-Front-End/pull/4712#issuecomment-400752308 for additional discussion

const isBrowser = typeof window !== 'undefined'
let sugarClient

/*
An immediately-invoked async function is a workaround
when top-level await is not supported.
  https://v8.dev/features/top-level-await
*/
(async function initSugarClient() {
  if (isBrowser) {
    const sugarModule = await import('panoptes-client/lib/sugar')
    sugarClient = sugarModule.sugarClient
  }
})()

export default function useSugarProject(project) {
  const projectID = project?.id

  useEffect(function onProjectChange() {
    let cleanup
    if (sugarClient && projectID) {
      const channel = `project-${projectID}`
      sugarClient.subscribeTo(channel)
      cleanup = () => {
        sugarClient.unsubscribeFrom(channel)
      }
    }
    return cleanup
  }, [projectID])
}