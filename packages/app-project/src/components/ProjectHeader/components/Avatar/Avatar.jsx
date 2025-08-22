import { string } from 'prop-types'
import { observer, MobXProviderContext} from 'mobx-react'
import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledAvatar = styled.img`
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

function useProjectAvatar() {
  const { store } = useContext(MobXProviderContext)
  return {
    src: store.project.avatar.src,
    projectTitle: store.project.display_name
  }
}

function Avatar({
  width='80px',
  ...rest
}) {
  const { t } = useTranslation('components')
  const { src, projectTitle } = useProjectAvatar()

  if (!src) {
    return null
  }

  const alt = t('ProjectHeader.Avatar.alt', { project: projectTitle })
  return (
    <StyledAvatar alt={alt} src={src} width={width} {...rest} />
  )
}

Avatar.propTypes = {
  /** Avatar size in CSS units. */
  width: string
}

export default observer(Avatar)
