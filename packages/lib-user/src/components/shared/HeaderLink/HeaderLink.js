import { Previous } from 'grommet-icons'
import { string } from 'prop-types'

import { HeaderButton } from '@components/shared'
import Link from 'next/link'

function HeaderLink({
  href,
  label,
  ...rest
}) {
  return (
    <HeaderButton
      forwardedAs={Link}
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
