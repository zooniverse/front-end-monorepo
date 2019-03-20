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

const StyledSVG = styled.svg`
  height: 24px;
  width: 24px;
`

function ApprovedIcon ({ approved }) {
  if (approved) {
    const title = counterpart('ApprovedIcon.title')
    return (
      <StyledBox
        aria-label={title}
        background='white'
        title={title}
      >
        <FormCheckmark color='brand' />
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
