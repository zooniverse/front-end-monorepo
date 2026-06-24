import { Notification } from 'grommet'
import { ShareOption } from 'grommet-icons'
import { string } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

function ShareIconButton({
  shareUrl = null,
  ...props
}) {
  const [visible, setVisible] = useState(false)

  const { t } = useTranslation()

  async function writeClipboardText() {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function onOpen() {
    await writeClipboardText()
    setVisible(true)
  }
  
  function onClose() {
    setVisible(false)
  }

  return (
    <>
      <IconActionButton
        a11yTitle={t('ShareIconButton.share')}
        disabled={!shareUrl || !navigator.clipboard}
        icon={<ShareOption />}
        onClick={onOpen}
        {...props}
      />
      {visible && (
        <Notification
          message={t('ShareIconButton.copied')}
          onClose={onClose}
          time={4000}
          toast
        />
      )}
    </>
  )
}

ShareIconButton.propTypes = {
  shareUrl: string
}

export default ShareIconButton
