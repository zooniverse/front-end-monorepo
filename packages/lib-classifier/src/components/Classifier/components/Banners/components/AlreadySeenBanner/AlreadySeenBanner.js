import { bool, shape, string } from 'prop-types'
import React from 'react'
import { useTranslation } from '@translations/i18n'

import Banner from '../Banner'

export default function AlreadySeenBanner({ subject }) {
  const { t } = useTranslation('components')

  const show = !!subject &&
    subject.id &&
    subject.alreadySeen &&
    !subject.retired &&
    !subject.finished_workflow &&
    !subject.user_has_finished_workflow

  return (
    <Banner
      background='status-critical'
      bannerText={t('Banners.AlreadySeenBanner.bannerText')}
      show={show}
      tooltipText={t('Banners.AlreadySeenBanner.tooltipText', { returnObjects: true })}
    />
  )
}

AlreadySeenBanner.propTypes = {
  /** The current subject. */
  subject: shape({
    alreadySeen: bool,
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}
