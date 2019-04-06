import counterpart from 'counterpart'
import { bool } from 'prop-types'
import React from 'react'
import { FormCheckmark } from 'grommet-icons'
import { Box } from 'grommet'
import styled from 'styled-components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledBox = styled(Box)`
  border-radius: 100%;
`

function ApprovedIcon ({ approved }) {
  if (approved) {
    return (
      <StyledBox background='white'>
        <FormCheckmark
          aria-label={counterpart('ApprovedIcon.title')}
          color='brand'
        />
      </StyledBox>
    )
  }

  return null
}

ApprovedIcon.propTypes = {
  approved: bool
}

ApprovedIcon.defaultProps = {
  approved: false
}
export default ApprovedIcon
