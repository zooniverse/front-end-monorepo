import { Notification } from 'grommet'
import { node, string } from 'prop-types'
import { useState } from 'react'

import { HeaderButton } from '@components/shared'

function HeaderToast({
  label,
  message,
  textToCopy,
  ...rest
}) {
  const [visible, setVisible] = useState(false)

  async function writeClipboardText(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function onOpen() {
    await writeClipboardText(textToCopy)
    setVisible(true)
  }
  
  function onClose() {
    setVisible(false)
  }

  return (
    <>
      <HeaderButton
        label={label}
        onClick={onOpen}
        {...rest}
      />
      {visible && (
        <Notification
          message={message}
          onClose={onClose}
          time={4000}
          toast
        />
      )}
    </>
  )
}

HeaderToast.propTypes = {
  icon: node,
  label: string.isRequired,
  message: string.isRequired,
  textToCopy: string.isRequired
}

export default HeaderToast
