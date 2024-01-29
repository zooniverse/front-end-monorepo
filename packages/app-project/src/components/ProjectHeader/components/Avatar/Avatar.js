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
  width: 80px;

  @media (width < 48rem) {
    width: 40px;
  }
`

function useProjectAvatar() {
  const { store } = useContext(MobXProviderContext)
  return {
    src: store.project.avatar.src,
    projectTitle: store.project.display_name
  }
}

function Avatar({
  ...props
}) {
  const { t } = useTranslation('components')
  const { src, projectTitle } = useProjectAvatar()

  if (!src) {
    return null
  }

  const alt = t('ProjectHeader.Avatar.alt', { project: projectTitle })
  return (
    <StyledAvatar alt={alt} src={src} {...props} />
  )
}

export default observer(Avatar)
