import counterpart from 'counterpart'
import { string } from 'prop-types'
import React from 'react'
import MetaToolsButton from '../MetaToolsButton'
import TalkIcon from './TalkIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function TalkLink (props) {
  const { href } = props
  return (
    <MetaToolsButton
      href={href}
      icon={<TalkIcon color='dark-5' size='1em' />}
      text={counterpart('TalkLink.label')}
    />
  )
}

TalkLink.propTypes = {
  href: string.isRequired
}

TalkLink.defaultProps = {
}
