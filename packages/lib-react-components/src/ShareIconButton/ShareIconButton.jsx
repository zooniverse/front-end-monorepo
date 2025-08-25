import { Notification } from 'grommet'
import { ShareOption } from 'grommet-icons'
import { useState } from 'react'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

function ShareIconButton({
  ...props
}) {
  const [visible, setVisible] = useState(false)

  const { t } = useTranslation()

  async function writeClipboardText() {
    const url = window.location.href
    
    try {
      await navigator.clipboard.writeText(url)
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

export default ShareIconButton
