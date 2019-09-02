import { withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Grid, Heading } from 'grommet'
import { string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import ByTheNumbers from './components/ByTheNumbers'

counterpart.registerTranslations('en', en)

function StatsPage (props) {
  const { projectName, screenSize } = props
  const columns = screenSize === 'small'
    ? ['100%']
    : ['1/4', 'auto']

  return (
    <Grid gap='medium' margin='medium'>
      <Heading color={{ dark: 'white', light: 'black' }} level='2'>
        {counterpart('StatsPage.title', { projectName })}
      </Heading>
      <Grid
        fill='horizontal'
        gap='medium'
        columns={columns}
      >
        <ByTheNumbers />
      </Grid>
    </Grid>
  )
}

StatsPage.propTypes = {
  projectName: string,
  screenSize: string
}

export default withResponsiveContext(StatsPage)
