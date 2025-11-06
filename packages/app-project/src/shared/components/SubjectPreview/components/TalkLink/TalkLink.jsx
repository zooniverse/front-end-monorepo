import { MetaToolsButton } from '@zooniverse/react-components'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import TalkIcon from './TalkIcon'

export default function TalkLink (props) {
  const { t } = useTranslation('components')
  const { href } = props
  return (
    <MetaToolsButton
      href={href}
      icon={<TalkIcon color='dark-5' size='15px' />}
      text={t('SubjectPreview.TalkLink.label')}
    />
  )
}

TalkLink.propTypes = {
  href: string.isRequired
}
