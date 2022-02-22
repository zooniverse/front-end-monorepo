import { bool, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledAvatar = styled.img`
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

function Avatar (props) {
  const { t } = useTranslation('components')

  if (!props.src) {
    return null
  }

  const { projectTitle, ...rest } = props
  const alt = t('ProjectHeader.Avatar.alt', { project: projectTitle })
  const width = props.isNarrow ? '40px' : '80px'
  return (
    <StyledAvatar alt={alt} width={width} {...rest} />
  )
}

Avatar.propTypes = {
  isNarrow: bool,
  src: string
}

Avatar.defaultProps = {
  isNarrow: false
}

export default Avatar
