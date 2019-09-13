import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import WidgetHeading from '../../../../../../shared/components/WidgetHeading'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function DailyClassificationsChart ({ counts, projectName }) {
  return (
    <>
      <WidgetHeading>
        {`${projectName} daily classification counts`}
      </WidgetHeading>
      {counts.map(count => <p>{count.label}, {count.count}, <q>{count.alt}</q></p>)}
    </>
  )
}

DailyClassificationsChart.propTypes = {
}

DailyClassificationsChart.defaultProps = {
}

export default DailyClassificationsChart
