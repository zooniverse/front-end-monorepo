import { SpacedText } from '@zooniverse/react-components'
import { FormPrevious } from 'grommet-icons'
import { string } from 'prop-types'

import { HeaderButton } from '@components/shared'

function HeaderLink({
  href,
  label,
  ...rest
}) {
  return (
    <HeaderButton
      href={href}
      icon={<FormPrevious color='white' />}
      label={<SpacedText size='14px' weight={700}>{label}</SpacedText>}
      {...rest}
    />
  )
}

HeaderLink.propTypes = {
  href: string.isRequired,
  label: string.isRequired
}

export default HeaderLink
