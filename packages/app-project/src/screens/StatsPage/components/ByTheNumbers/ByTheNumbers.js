import counterpart from 'counterpart'
import { Box, Text } from 'grommet'
import { number, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import ContentBox from '../../../../shared/components/ContentBox'
import Stat from '../../../../shared/components/Stat'
import AnimatedNumber from '../../../../shared/components/AnimatedNumber'


counterpart.registerTranslations('en', en)

function ByTheNumbers (props) {
  const {
    classifications,
    completedSubjects,
    launchDate,
    volunteers
  } = props

  return (
    <ContentBox title={counterpart('ByTheNumbers.title')}>
      <Box gap='xsmall'>
        <Stat
          value={<AnimatedNumber value={volunteers} />}
          label={counterpart('ByTheNumbers.volunteers')}
        />
        <Stat
          value={<AnimatedNumber value={classifications} />}
          label={counterpart('ByTheNumbers.classifications')}
        />
        <Stat
          value={<AnimatedNumber value={completedSubjects} />}
          label={counterpart('ByTheNumbers.completedSubjects')}
        />
        {launchDate && (
          <Stat
            value={launchDate}
            label={counterpart('ByTheNumbers.launchDate')}
          />
        )}
      </Box>
    </ContentBox>
  )
}

ByTheNumbers.propTypes = {
  classifications: number.isRequired,
  completedSubjects: number.isRequired,
  launchDate: string,
  volunteers: number.isRequired
}

ByTheNumbers.defaultProps = {
  classifications: 0,
  completedSubjects: 0,
  launchDate: null,
  volunteers: 0
}

export default ByTheNumbers
