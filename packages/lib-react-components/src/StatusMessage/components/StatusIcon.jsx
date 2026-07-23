/*
Status Icon

Displays one of three types of icons:
- type=status: checkmark (please use fill=green)
- type=error: exclamation mark in a circle (please use stroke=red)
- type=warning: warning (please use stroke=yellow)

Colour is provided by an external CSS fill or stroke value. The colours are not
not baked into the SVG, just in case the parent needs more control.

If no valid type is provided, nothing is rendered.
 */

import { useId } from 'react'
import {
  StatusGood as SuccessIcon,
  CircleAlert as ErrorIcon,
  Alert as WarningIcon,
} from 'grommet-icons'
import { useTranslation } from '../../translations/i18n'
import { string, oneOf } from 'prop-types'

function StatusIcon ({
  size = '16px',
  type,
}) {
  const errorId = useId()
  const warningId = useId()
  const { t } = useTranslation()

  switch (type) {
    case 'success':
      return (
        <SuccessIcon
          aria-label={t('StatusMessage.icons.success')}
          size={size}
        />
      )

    case 'error':
      return (
        <ErrorIcon
          aria-label={t('StatusMessage.icons.error')}
          size={size}
        />
      )

    case 'warning':
      return (
        <WarningIcon
          aria-label={t('StatusMessage.icons.warning')}
          size={size}
        />
      )
  }

  return null
}

StatusIcon.propTypes = {
  size: string,
  type: oneOf(['success', 'error', 'warning', '']),
}

export default StatusIcon