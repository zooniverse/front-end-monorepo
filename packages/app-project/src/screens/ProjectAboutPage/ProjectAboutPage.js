import React from 'react'

function ProjectAboutPage ({ aboutPageData, inBeta, teamArray }) {
  // console.log(teamArray)

  const { title = '' } = aboutPageData

  return (
    <div>This is the {title} Page</div>
  )
}

export default ProjectAboutPage
