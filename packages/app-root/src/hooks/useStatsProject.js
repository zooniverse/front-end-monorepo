import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

let initialProject = 'AllProjects'
if (isBrowser) {
  initialProject = localStorage?.getItem('selectedProject') || initialProject
}

export default function useStatsProject({ isLoading, user }) {
  const [selectedProject, setSelectedProject] = useState(initialProject)

  useEffect(function onProjectChange() {
    localStorage?.setItem('selectedProject', selectedProject)
  }, [selectedProject])

  useEffect(function onUserChange() {
    // when a user successfully logs out isLoading is false and user is undefined
    if (!isLoading && !user?.login) {
      setSelectedProject('AllProjects')
    }
  }, [isLoading, user?.login])

  return { selectedProject, setSelectedProject }
}
