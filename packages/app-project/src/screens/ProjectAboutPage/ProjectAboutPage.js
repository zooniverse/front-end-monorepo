import React from 'react'

function ProjectAboutPage ({ aboutPageData }) {

  const { title = '' } = aboutPageData

  return (
    <div>This is the {title} Page</div>
  )
}

export default ProjectAboutPage
