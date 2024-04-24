import { FormPrevious } from 'grommet-icons'
import { bool, string } from 'prop-types'

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
      label={label}
      {...rest}
    />
  )
}

HeaderLink.propTypes = {
  href: string.isRequired,
  label: string.isRequired
}

export default HeaderLink
