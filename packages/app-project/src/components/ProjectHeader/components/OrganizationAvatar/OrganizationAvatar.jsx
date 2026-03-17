import { shape, string } from 'prop-types'
import { observer } from 'mobx-react'
import styled, { css } from 'styled-components'

const StyledAvatar = styled.img`
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

const FALLBACK_AVATAR_SRC = 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'

function OrganizationAvatar({
  organization,
  width='30px',
  ...rest
}) {
  if (!organization) {
    return null
  }

  // TODO: maybe add a better description for alt, e.g. "Organization Avatar for XYZ". See <Avatar> component. Requires translations, though.
  const alt = organization.display_name || ''
  const src = organization.avatar?.src || FALLBACK_AVATAR_SRC
  return (
    <StyledAvatar alt={alt} src={src} width={width} {...rest} />
  )
}

OrganizationAvatar.propTypes = {
  /** Organization resource */
  organization: shape({
    title: string,
    avatar: shape({
      src: string
    }),
  }),
  /** Avatar size in CSS units. */
  width: string,
}

export default observer(OrganizationAvatar)
