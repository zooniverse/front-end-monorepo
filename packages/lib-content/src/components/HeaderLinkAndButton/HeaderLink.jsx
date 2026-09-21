import { Previous } from 'grommet-icons'
import { string } from 'prop-types'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

import HeaderButton from './HeaderButton'
import getHrefWithLocale from '../../helpers/getHrefWithLocale'

function HeaderLink({ href, label, ...rest }) {
  const { i18n } = useTranslation()
  const locale = i18n.language

  const hrefWithLocale = getHrefWithLocale(href, locale)

  return (
    <HeaderButton
      forwardedAs={Link}
      href={hrefWithLocale}
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
