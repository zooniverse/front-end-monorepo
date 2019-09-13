import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { array, string } from 'prop-types'
import React, { Component } from 'react'

import DailyClassificationsChart from './DailyClassificationsChart'

function storeMapper (stores) {
  const { project, yourStats: { thisWeek } } = stores.store
  return {
    thisWeek,
    projectName: project['display_name']
  }
}

@inject(storeMapper)
@observer
class DailyClassificationsChartContainer extends Component {
  render () {
    const { projectName, thisWeek } = this.props
    const counts = thisWeek.map(count => {
      const day = new Date(count.period)
      const locale = counterpart.getLocale()
      const longLabel = day.toLocaleDateString(locale, { weekday: 'long' })
      const alt = `${longLabel}: ${count.count}`
      const label = day.toLocaleDateString(locale, { weekday: 'narrow' })
      return Object.assign({}, count, { alt, label })
    })
    return (
      <DailyClassificationsChart
        counts={counts}
        projectName={projectName}
      />
    )
  }
}

DailyClassificationsChartContainer.propTypes = {
  projectName: string,
  thisWeek: array
}

DailyClassificationsChartContainer.defaultProps = {
}

export default DailyClassificationsChartContainer
