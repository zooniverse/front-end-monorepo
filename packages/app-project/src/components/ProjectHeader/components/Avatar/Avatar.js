import { bool, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'
import ApprovedIcon from './components/ApprovedIcon'
import { Box } from 'grommet'

const StyledAvatar = styled.img`
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

const Relative = styled(Box)`
  position: relative;
`

function Avatar({
  approved = false,
  avatarSrc,
  isNarrow = false,
  projectTitle
}) {
  const { t } = useTranslation('components')

  if (!avatarSrc) {
    return null
  }

  const alt = t('ProjectHeader.Avatar.alt', { project: projectTitle })
  const width = isNarrow ? '40px' : '80px'
  return (
    <Relative>
      <StyledAvatar alt={alt} width={width} isNarrow={isNarrow} src={avatarSrc} />
      {approved && <ApprovedIcon isNarrow={isNarrow} />}
    </Relative>
  )
}

Avatar.propTypes = {
  approved: bool,
  avatarSrc: string,
  isNarrow: bool,
  projectTitle: string
}

export default Avatar
