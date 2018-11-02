import { get } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import FinishedForTheDay from './FinishedForTheDay'

@inject('store')
@observer
class FinishedForTheDayContainer extends Component {
  getComponentProps () {
    const { props } = this
    const projectName = get(props, 'store.project.displayName', '')
    const imageSrc = get(props, 'store.project.backgrounds[0].src', '')
    return {
      imageSrc,
      projectName
    }
  }

  render () {
    const componentProps = this.getComponentProps()
    return (
      <FinishedForTheDay {...componentProps} />
    )
  }
}

FinishedForTheDayContainer.propTypes = {
  store: PropTypes.shape({
    project: PropTypes.shape({
      backgrounds: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string
      })),
      displayName: PropTypes.string
    })
  })
}

export default FinishedForTheDayContainer
