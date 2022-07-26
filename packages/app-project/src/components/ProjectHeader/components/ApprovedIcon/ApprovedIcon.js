import { Box } from 'grommet'
import { FormCheckmark } from 'grommet-icons'
import { bool } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledBox = styled(Box)`
  border-radius: 100%;
  flex-shrink: 0;
`

function ApprovedIcon ({ approved, isNarrow }) {
  const { t } = useTranslation('components')
  if (approved) {
    return (
      <StyledBox background='white'>
        <FormCheckmark
          aria-label={t('ProjectHeader.ApprovedIcon.title')}
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
