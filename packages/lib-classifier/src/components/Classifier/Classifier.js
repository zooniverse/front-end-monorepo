import { Grommet } from 'grommet'
import makeInspectable from 'mobx-devtools-mst';
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import theme from '@zooniverse/grommet-theme'
import { panoptes } from '@zooniverse/panoptes-js'

import SubjectViewer from './components/SubjectViewer'
import RootStore from '../../store'

class Classifier extends React.Component {
  constructor (props) {
    super(props)
    this.classifierStore = RootStore.create({ project: props.project }, { client: panoptes })
    makeInspectable(this.classifierStore);
  }

  render () {
    return (
      <Provider classifierStore={this.classifierStore}>
        <Grommet theme={theme}>
          <SubjectViewer />
        </Grommet>
      </Provider>
    )
  }
}

Classifier.propTypes = {
  project: PropTypes.object
}

export default Classifier
