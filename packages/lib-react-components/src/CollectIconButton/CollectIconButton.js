import { Bookmark } from 'grommet-icons'
import { useState } from 'react'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

function CollectIconButton({
  ...props
}) {
  const [showModal, setShowModal] = useState(false)

  const { t } = useTranslation()

  return (
    <IconActionButton
      a11yTitle={t('CollectIconButton.collect')}
      icon={<Bookmark />}
      onClick={() => setShowModal(true)}
      {...props}
    />
  )
}

export default CollectIconButton
