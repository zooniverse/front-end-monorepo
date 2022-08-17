import { Box } from 'grommet'
import { FormCheckmark } from 'grommet-icons'
import { bool } from 'prop-types'
import { useTranslation } from 'next-i18next'
import styled, { css } from 'styled-components'

const StyledBox = styled(Box)`
  border-radius: 100%;
  flex-shrink: 0;
  position: absolute;
  ${props => css`top: ${props.isNarrow ? '-5px' : '-5px'};`}
  ${props => css`right: ${props.isNarrow ? '-5px' : '-5px'};`}
  ${props => css`border: solid ${props.isNarrow ? '1px' : '2px'} ${props.theme.global.colors.brand};`}
`

function ApprovedIcon ({ approved = false, isNarrow }) {
  const { t } = useTranslation('components')
  if (approved) {
    return (
      <StyledBox background='white' isNarrow={isNarrow}>
        <FormCheckmark
          aria-label={t('ProjectHeader.ApprovedIcon.title')}
          color='brand'
          size={isNarrow ? '15px' : 'medium'}
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

export default ApprovedIcon
