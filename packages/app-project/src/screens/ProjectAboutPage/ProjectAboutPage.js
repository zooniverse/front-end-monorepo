import React from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

function ProjectAboutPage ({ aboutPageData, inBeta, teamArray }) {

  const { title = '' } = aboutPageData

  return (
    <div>This is the {title} Page</div>
  )
}

ProjectAboutPage.defaultProps = {
  aboutPageData: {},
  inBeta: false,
  teamArray: []
}

ProjectAboutPage.propTypes = {
  aboutPageData: object,
  inBeta: bool,
  teamArray: arrayOf(shape({
    avatar_src: string,
    display_name: string,
    id: string.isRequired,
    login: string,
    role: string
  }))
}

export default ProjectAboutPage
