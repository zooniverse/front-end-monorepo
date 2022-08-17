import { bool, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'
import ApprovedIcon from '../ApprovedIcon'
import { Box } from 'grommet'

const StyledAvatar = styled.img`
  ${props => css`border: solid ${props.isNarrow ? '1px' : '2px'} ${props.theme.global.colors.brand};`}
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

const Relative = styled(Box)`
  position: relative;
`

function Avatar(props) {
  const { t } = useTranslation('components')

  if (!props.src) {
    return null
  }

  const { isNarrow = false, projectTitle, ...rest } = props
  const alt = t('ProjectHeader.Avatar.alt', { project: projectTitle })
  const width = isNarrow ? '40px' : '80px'
  return (
    <Relative>
      <StyledAvatar alt={alt} width={width} isNarrow={isNarrow} {...rest} />
      <ApprovedIcon isNarrow={isNarrow} />
    </Relative>
  )
}

Avatar.propTypes = {
  isNarrow: bool,
  src: string
}

export default Avatar
