import counterpart from 'counterpart'
import { Box } from 'grommet'
import { FormCheckmark } from 'grommet-icons'
import { bool } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  border-radius: 100%;
`

function ApprovedIcon ({ approved, isNarrow }) {
  if (approved) {
    return (
      <StyledBox background='white'>
        <FormCheckmark
          aria-label={counterpart('ApprovedIcon.title')}
          color='brand'
          size={isNarrow ? '20px' : 'medium'}
        />
      </StyledBox>
    )
  }

  return null
}

ApprovedIcon.propTypes = {
  approved: bool,
  isNarrow: bool
}

ApprovedIcon.defaultProps = {
  approved: false
}
export default ApprovedIcon
