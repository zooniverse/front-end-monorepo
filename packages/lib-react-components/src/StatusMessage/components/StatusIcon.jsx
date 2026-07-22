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
import { useTranslation } from '../../translations/i18n'
import PropTypes from 'prop-types'

function StatusIcon ({
  type
}) {
  const errorId = useId()
  const warningId = useId()
  const { t } = useTranslation()

  switch (type) {
    case 'success':
      return (
        <svg aria-label={t('StatusMessage.icons.success')} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 16C9.05058 16 10.0909 15.7931 11.0615 15.391C12.0321 14.989 12.914 14.3997 13.6569 13.6569C14.3997 12.914 14.989 12.0321 15.391 11.0615C15.7931 10.0909 16 9.05058 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 -1.56548e-08 8 0C5.87827 3.16163e-08 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM7.79378 11.2356L12.2382 5.90222L10.8729 4.76444L7.05067 9.35022L5.07289 7.37156L3.816 8.62844L6.48267 11.2951L7.17067 11.9831L7.79378 11.2356Z" />
        </svg>
      )

    case 'error':
      return (
        <svg aria-label={t('StatusMessage.icons.error')} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath={`url(#${errorId})`}>
            <path d="M8 9.4V3.8M8 12.2V10.8M8 1C4.1339 1 1 4.1339 1 8C1 11.8661 4.1339 15 8 15C11.8661 15 15 11.8661 15 8C15 4.1339 11.8661 1 8 1Z" strokeWidth="1.5"/>
          </g>
          <defs>
            <clipPath id={errorId}>
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )

    case 'warning':
      return (
        <svg aria-label={t('StatusMessage.icons.warning')} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath={`url(#${warningId})`}>
            <path d="M8 5.81018V10.1902M8 10.9202V12.3802M8 1.43018L15.3 14.5702H0.700001L8 1.43018Z" strokeWidth="1.5" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id={warningId}>
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )
  }

  return null
}

StatusIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', '']),
}

export default StatusIcon