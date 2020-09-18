import { inject, observer } from 'mobx-react'
import { arrayOf, string } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'

import WideLayout from './components/WideLayout'
import NarrowLayout from './components/NarrowLayout'

class HeroContainer extends Component {

  render () {
    const { isWide, workflows } = this.props
    const workflowData = {
        loading: asyncStates.success,
        data: workflows
    }
    return isWide
      ? <WideLayout workflows={workflowData} />
      : <NarrowLayout workflows={workflowData} />

  }
}

export default HeroContainer
