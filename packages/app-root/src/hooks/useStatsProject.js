import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

let initialProject = 'AllProjects'
if (isBrowser) {
  initialProject = localStorage?.getItem('selectedProject') || initialProject
}

export default function useStatsProject() {
  const [selectedProject, setSelectedProject] = useState(initialProject)

  useEffect(function onProjectChange() {
    localStorage?.setItem('selectedProject', selectedProject)
  }, [selectedProject])

  return { selectedProject, setSelectedProject }
}
