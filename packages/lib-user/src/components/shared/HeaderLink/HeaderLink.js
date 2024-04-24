import { Previous } from 'grommet-icons'
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
      icon={<Previous color='white' size='small' />}
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
