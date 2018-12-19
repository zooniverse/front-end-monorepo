import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import Classifier from '@zooniverse/classifier'


export default function ClassifierWrapper (props) {
  const { project } = props

  return (
    <Classifier
      project={project}
    />
  )
}
