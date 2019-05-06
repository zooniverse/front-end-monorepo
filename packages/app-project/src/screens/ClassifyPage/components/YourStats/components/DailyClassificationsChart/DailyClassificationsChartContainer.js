import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import DailyClassificationsChart from './DailyClassificationsChart'

@inject('store')
@observer
class DailyClassificationsChartContainer extends Component {
  render () {
    return (
      <DailyClassificationsChart />
    )
  }
}

DailyClassificationsChartContainer.propTypes = {
}

DailyClassificationsChartContainer.defaultProps = {
}

export default DailyClassificationsChartContainer
