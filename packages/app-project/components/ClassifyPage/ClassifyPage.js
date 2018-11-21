import { Grid } from 'grommet'
import React, { Component } from 'react'

import Classifier from '@zooniverse/classifier'

import FinishedForTheDay from './components/FinishedForTheDay'
import ProjectStatistics from './components/ProjectStatistics'

import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'


function storeMapper (stores) {
  const { project } = stores.store
  return {
    project
  }
}

@inject(storeMapper)
@observer
class ClassifyPage extends Component {
  render () {
    return (
      <Grid gap='medium' margin='medium'>
        <Classifier project={this.props.project.toJSON()} />
        <FinishedForTheDay />
        <ProjectStatistics />
      </Grid>
    )
  }
}

export default ClassifyPage
